from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, JSON, DateTime, Text
from sqlalchemy.orm import relationship
from database import Base
import datetime

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    supabase_id = Column(String, unique=True, index=True, nullable=True) # Maps to Supabase Auth.users.id
    email = Column(String, unique=True, index=True)
    full_name = Column(String, nullable=True)
    hashed_password = Column(String, nullable=True) # Optional for OAuth users
    is_active = Column(Boolean, default=True)
    github_username = Column(String, nullable=True)
    total_xp = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    
    # Relationships
    roadmaps = relationship("Roadmap", back_populates="user")

class Roadmap(Base):
    __tablename__ = "roadmaps"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(Text, nullable=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    content = Column(JSON) # Stores the huge JSON structure of the roadmap
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    
    user = relationship("User", back_populates="roadmaps")

class TopicProgress(Base):
    __tablename__ = "topic_progress"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    roadmap_id = Column(Integer, ForeignKey("roadmaps.id"))
    module_index = Column(Integer)
    topic_index = Column(Integer)
    is_completed = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class Lesson(Base):
    __tablename__ = "lessons"

    id = Column(Integer, primary_key=True, index=True)
    topic = Column(String, index=True)
    context = Column(String, nullable=True) 
    title = Column(String)
    content_markdown = Column(Text)
    estimated_time = Column(String)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class UserChallenge(Base):
    __tablename__ = "user_challenges"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    challenge_id = Column(String, index=True)
    language = Column(String)
    code = Column(Text)
    completed_at = Column(DateTime, default=datetime.datetime.utcnow)
    xp_awarded = Column(Integer)
