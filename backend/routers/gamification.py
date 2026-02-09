from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import User
from pydantic import BaseModel
from typing import List

router = APIRouter()

class LeaderboardEntry(BaseModel):
    username: str
    avatar_url: str = "" # Placeholder for now, or use gravatar logic later
    total_xp: int
    rank: int
    badges: List[str] = []

@router.get("/leaderboard", response_model=List[LeaderboardEntry])
async def get_leaderboard(db: Session = Depends(get_db)):
    """
    Returns the top 10 users by XP.
    """
    # Fetch top 10 users ordered by total_xp desc
    top_users = db.query(User).order_by(User.total_xp.desc()).limit(10).all()
    
    leaderboard = []
    for index, user in enumerate(top_users):
        # Determine badges (mock logic or derived from simple rules for now)
        badges = []
        if user.total_xp > 1000:
            badges.append("Pro")
        if user.github_username:
             badges.append("Coder")
             
        # Use email or full_name (if available) as username
        display_name = user.full_name or user.email.split("@")[0]
        if user.github_username:
             display_name = user.github_username

        leaderboard.append(LeaderboardEntry(
            username=display_name,
            total_xp=user.total_xp,
            rank=index + 1,
            badges=badges
        ))
        
    return leaderboard
