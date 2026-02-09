from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

load_dotenv()

from database import engine, Base
from routers import roadmap, learning, user, github, gamification, challenges
import models

from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from core.limiter import limiter

# Create database tables
# models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="CodeForge AI API", version="0.1.0")

# Set up Rate Limiter
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://codeforgeai-alpha.vercel.app",
        "https://codeforge-lszoi1yek-cyber-sage.vercel.app", # Previous deployment
        "https://codeforge-mc0z0m3wl-cyber-sage.vercel.app", # Latest deployment
        "https://codeforge-ai.onrender.com"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(roadmap.router, prefix="/api/v1/roadmap", tags=["roadmap"])
app.include_router(learning.router, prefix="/api/v1/learning", tags=["learning"])
app.include_router(user.router, prefix="/api/v1/user", tags=["user"])
app.include_router(github.router, prefix="/api/v1/github", tags=["github"])
app.include_router(gamification.router, prefix="/api/v1/gamification", tags=["gamification"])
app.include_router(challenges.router, prefix="/api/v1/challenges", tags=["challenges"])

@app.get("/")
async def root():
    return {"message": "Welcome to CodeForge AI API"}
