from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import User, Roadmap, TopicProgress, Lesson
from core.security import get_current_user
from pydantic import BaseModel
from typing import Optional

router = APIRouter()

from typing import List

class RoadmapProgress(BaseModel):
    id: int
    title: str
    progress: int # Percentage 0-100
    total_topics: int
    completed_topics: int

class UserStats(BaseModel):
    items_created: int
    lessons_completed: int
    skills_mastered: int
    code_challenges: int
    streak_days: int
    total_xp: int
    recent_activity: List[RoadmapProgress]
    badges: List[str]

@router.get("/stats", response_model=UserStats)
async def get_user_stats(
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user)
):
    # Get all roadmaps for the user
    roadmaps = db.query(Roadmap).filter(Roadmap.user_id == user.id).order_by(Roadmap.created_at.desc()).all()
    
    roadmap_count = len(roadmaps)
    total_completed_lessons = 0
    recent_activity = []
    badges = []

    # Calculate progress for each roadmap
    for roadmap in roadmaps:
        # Calculate total topics from JSON content
        total_topics = 0
        try:
            # roadmap.content is stored as a JSON dict
            content = roadmap.content
            if content and "roadmap" in content:
                for module in content["roadmap"]:
                    total_topics += len(module.get("topics", []))
        except Exception:
            total_topics = 0

        # Calculate completed topics from TopicProgress
        completed_count = db.query(TopicProgress).filter(
            TopicProgress.user_id == user.id,
            TopicProgress.roadmap_id == roadmap.id,
            TopicProgress.is_completed == True
        ).count()
        
        total_completed_lessons += completed_count
        
        progress = 0
        if total_topics > 0:
            progress = int((completed_count / total_topics) * 100)

        # Add to recent activity (limit to top 3 later if needed, but for now return all or top 5)
        # We'll just return the top 3 in the main list
        if len(recent_activity) < 5:
            recent_activity.append(RoadmapProgress(
                id=roadmap.id,
                title=roadmap.title,
                progress=progress,
                total_topics=total_topics,
                completed_topics=completed_count
            ))
            
        # Derive badges from titles
        if "react" in roadmap.title.lower() and "React Developer" not in badges:
            badges.append("React Developer")
        if "python" in roadmap.title.lower() and "Python Enthusiast" not in badges:
            badges.append("Python Enthusiast")
        if "javascript" in roadmap.title.lower() and "JS Wizard" not in badges:
            badges.append("JS Wizard")

    # Add Pro Member badge if not present (mock logic)
    if "Pro Member" not in badges:
         badges.insert(0, "Pro Member")

    # Placeholder Logic for "Skills Mastered"
    skills_mastered = total_completed_lessons # 1 lesson = 1 skill for now
    
    # Calculate XP
    total_xp = total_completed_lessons * 150 # 150 XP per lesson

    # Calculate Streak (Placeholder)
    # in a real app, query distinct dates from TopicProgress where is_completed=True
    streak_days = 1 if total_completed_lessons > 0 else 0

    return {
        "items_created": roadmap_count,
        "lessons_completed": total_completed_lessons,
        "skills_mastered": skills_mastered,
        "code_challenges": 0,
        "streak_days": streak_days,
        "total_xp": total_xp,
        "recent_activity": recent_activity,
        "badges": badges
    }
