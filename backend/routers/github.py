from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import User, TopicProgress, Roadmap
from core.security import get_current_user
from services.github_service import analyze_github_user
from pydantic import BaseModel

router = APIRouter()

class GitHubConnectRequest(BaseModel):
    username: str

@router.post("/analyze")
async def connect_and_analyze_github(
    request: GitHubConnectRequest,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user)
):
    """
    Connects GitHub account and scans for skills.
    Updates User profile and auto-completes Roadmap topics.
    """
    # 1. Update Username
    user.github_username = request.username
    db.commit()
    
    # 2. Analyze
    analysis = await analyze_github_user(request.username)
    
    if "error" in analysis:
        raise HTTPException(status_code=404, detail=analysis["error"])
        
    detected_skills = [s.lower() for s in analysis["detected_skills"]]
    auto_completed_count = 0
    
    # 3. Auto-complete Topics
    # Find all active roadmaps for this user
    roadmaps = db.query(Roadmap).filter(Roadmap.user_id == user.id).all()
    
    for roadmap in roadmaps:
        content = roadmap.content
        if not content or "roadmap" not in content:
            continue
            
        for m_index, module in enumerate(content["roadmap"]):
            for t_index, topic in enumerate(module.get("topics", [])):
                # If topic name is in detected skills (fuzzy match)
                topic_lower = topic.lower()
                
                # Check if any detected skill is a substring of the topic or vice versa
                match = any(s in topic_lower or topic_lower in s for s in detected_skills)
                
                if match:
                    # Check if already completed
                    exists = db.query(TopicProgress).filter(
                        TopicProgress.user_id == user.id,
                        TopicProgress.roadmap_id == roadmap.id,
                        TopicProgress.module_index == m_index,
                        TopicProgress.topic_index == t_index
                    ).first()
                    
                    if not exists:
                        new_progress = TopicProgress(
                            user_id=user.id,
                            roadmap_id=roadmap.id,
                            module_index=m_index,
                            topic_index=t_index,
                            is_completed=True
                        )
                        db.add(new_progress)
                        auto_completed_count += 1

    # 4. Award XP for connecting (One time bonus)
    # We can handle this logic later, for now just commit progress
    db.commit()
    
    return {
        "status": "success",
        "analysis": analysis,
        "auto_completed_nodes": auto_completed_count
    }
