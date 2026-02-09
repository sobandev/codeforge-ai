from pydantic import BaseModel, ConfigDict
from typing import List, Optional, Dict, Any
import datetime

class UserBase(BaseModel):
    email: str

class UserCreate(UserBase):
    password: str
    full_name: Optional[str] = None

class User(UserBase):
    id: int
    is_active: bool
    created_at: datetime.datetime

    model_config = ConfigDict(from_attributes=True)

class RoadmapBase(BaseModel):
    title: str
    description: Optional[str] = None
    content: Dict[str, Any]

class RoadmapCreate(RoadmapBase):
    pass

class Roadmap(RoadmapBase):
    id: int
    user_id: int
    created_at: datetime.datetime

    model_config = ConfigDict(from_attributes=True)

class QuizOption(BaseModel):
    text: str
    is_correct: bool
    explanation: Optional[str] = None

class QuizQuestion(BaseModel):
    question: str
    options: List[QuizOption]
    difficulty: str

class Quiz(BaseModel):
    topic: str
    questions: List[QuizQuestion]
