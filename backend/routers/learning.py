from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.orm import Session
from database import get_db
import models, schemas
from services import ai_service
from pydantic import BaseModel
from core.limiter import limiter
from core.security import get_current_user
from models import User

router = APIRouter()

class LessonRequest(BaseModel):
    topic: str
    context: str = ""

class ProgressUpdate(BaseModel):
    roadmap_id: int
    module_index: int
    topic_index: int
    is_completed: bool

@router.post("/lesson")
@limiter.limit("20/minute")
async def get_lesson(
    request: Request, 
    lesson_request: LessonRequest, 
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user) # Optional: Lessons could be public, but let's secure for now
):
    """
    Generates an AI lesson for a specific topic, checking the DB first.
    """
    # 1. Check if lesson exists in DB
    existing_lesson = db.query(models.Lesson).filter(
        models.Lesson.topic == lesson_request.topic,
        models.Lesson.context == lesson_request.context
    ).first()

    if existing_lesson:
        return {
            "title": existing_lesson.title,
            "content_markdown": existing_lesson.content_markdown,
            "estimated_time": existing_lesson.estimated_time
        }

    # 2. If not, generate it
    result = ai_service.generate_lesson(lesson_request.topic, lesson_request.context)
    
    if "error" in result:
        raise HTTPException(status_code=500, detail=result["error"])

    # 3. Save to DB
    new_lesson = models.Lesson(
        topic=lesson_request.topic,
        context=lesson_request.context,
        title=result.get("title", f"Lesson: {lesson_request.topic}"),
        content_markdown=result.get("content_markdown", ""),
        estimated_time=result.get("estimated_time", "10 mins")
    )
    db.add(new_lesson)
    db.commit()
    db.refresh(new_lesson)

    return result

@router.post("/progress")
async def update_progress(
    update: ProgressUpdate, 
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user)
):
    """
    Updates the progress for a specific topic in a roadmap.
    """
    # Use authenticated user ID
    user_id = user.id
    
    # Security Check: Ensure roadmap belongs to user
    roadmap = db.query(models.Roadmap).filter(models.Roadmap.id == update.roadmap_id).first()
    if not roadmap:
        raise HTTPException(status_code=404, detail="Roadmap not found")
    if roadmap.user_id != user_id:
        raise HTTPException(status_code=403, detail="Not authorized to update progress for this roadmap")

    progress = db.query(models.TopicProgress).filter(
        models.TopicProgress.user_id == user_id,
        models.TopicProgress.roadmap_id == update.roadmap_id,
        models.TopicProgress.module_index == update.module_index,
        models.TopicProgress.topic_index == update.topic_index
    ).first()

    if progress:
        progress.is_completed = update.is_completed
    else:
        progress = models.TopicProgress(
            user_id=user_id,
            roadmap_id=update.roadmap_id,
            module_index=update.module_index,
            topic_index=update.topic_index,
            is_completed=update.is_completed
        )
        db.add(progress)
    
    db.commit()
    return {"status": "success", "is_completed": update.is_completed}

@router.get("/progress/{roadmap_id}")
async def get_roadmap_progress(
    roadmap_id: int, 
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user)
):
    """
    Get all progress for a specific roadmap.
    """
    user_id = user.id
    
    # Security Check: Ensure roadmap belongs to user
    roadmap = db.query(models.Roadmap).filter(models.Roadmap.id == roadmap_id).first()
    if not roadmap:
         raise HTTPException(status_code=404, detail="Roadmap not found")
    if roadmap.user_id != user_id:
        raise HTTPException(status_code=403, detail="Not authorized to view progress for this roadmap")

    progress_records = db.query(models.TopicProgress).filter(
        models.TopicProgress.user_id == user_id,
        models.TopicProgress.roadmap_id == roadmap_id
    ).all()
    
    return progress_records
