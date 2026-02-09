from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.orm import Session
from database import get_db
from models import User, Roadmap
from schemas import RoadmapCreate, Roadmap as RoadmapSchema
from services.ai_service import generate_roadmap
from typing import Optional
from pydantic import BaseModel
from core.limiter import limiter

router = APIRouter()

from fastapi import UploadFile, File, Form
import pypdf
import io

from core.security import get_current_user

@router.post("/generate", response_model=RoadmapSchema)
@limiter.limit("2/minute") # Stricter limit for full roadmap generation
async def create_roadmap(
    request: Request,
    goal: str = Form(...),
    current_skills: Optional[str] = Form(""),
    file: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user)
):
    # User is now authenticated via Supabase and synced to local DB
    
    resume_text = ""
    MAX_FILE_SIZE = 5 * 1024 * 1024 # 5MB
    
    if file:
        if file.content_type != "application/pdf":
             raise HTTPException(status_code=400, detail="Invalid file type. Only PDF allowed.")
        
        # Check file size (approximate using seek/tell if possible, or read chunks)
        # For simplicity in FastAPI, we can check headers or read and check len
        # file.size is not always available, so we read content.
        
        try:
            content = await file.read()
            if len(content) > MAX_FILE_SIZE:
                 raise HTTPException(status_code=413, detail="File too large. Max size is 5MB.")
            
            pdf_file = io.BytesIO(content)
            reader = pypdf.PdfReader(pdf_file)
            for page in reader.pages:
                resume_text += page.extract_text() + "\n"
                
            # Basic sanity check on extracted text length
            if len(resume_text) > 50000: # Limit resume text to avoid token overflow
                resume_text = resume_text[:50000]
                
        except HTTPException as he:
            raise he
        except Exception as e:
            # print(f"Error reading PDF: {e}")
            raise HTTPException(status_code=400, detail="Failed to read PDF file.")

    # Call AI Service
    print(f"DEBUG: calling generate_roadmap for user {user.id} with goal: {goal}")
    ai_result = generate_roadmap(goal, current_skills, resume_text)
    print("DEBUG: generate_roadmap returned")
    
    if "error" in ai_result:
        error_msg = ai_result.get("error", "Failed to generate roadmap")
        details = ai_result.get("details", "")
        # print(f"DEBUG: Error in ai_result: {error_msg}")
        raise HTTPException(status_code=500, detail=f"{error_msg}: {details}")

    # Save to DB
    # print("DEBUG: Saving roadmap to DB")
    db_roadmap = Roadmap(
        title=f"Roadmap to {goal}",
        description=f"Generated roadmap for {goal}",
        user_id=user.id,
        content=ai_result
    )
    db.add(db_roadmap)
    db.commit()
    db.refresh(db_roadmap)
    # print(f"DEBUG: Roadmap saved with ID: {db_roadmap.id}")
    
    return db_roadmap

@router.get("/{roadmap_id}", response_model=RoadmapSchema)
def read_roadmap(
    roadmap_id: int, 
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user)
):
    roadmap = db.query(Roadmap).filter(Roadmap.id == roadmap_id).first()
    if roadmap is None:
        raise HTTPException(status_code=404, detail="Roadmap not found")
    
    # Security Check: Ensure the user owns this roadmap
    if roadmap.user_id != user.id:
        raise HTTPException(status_code=403, detail="Not authorized to access this roadmap")
        
    return roadmap

from typing import List

@router.get("/", response_model=List[RoadmapSchema])
def get_user_roadmaps(db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    return db.query(Roadmap).filter(Roadmap.user_id == user.id).all()
