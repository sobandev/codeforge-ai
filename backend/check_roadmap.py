from sqlalchemy.orm import Session
from database import SessionLocal, engine
import models
import json

def check_latest_roadmap():
    db = SessionLocal()
    try:
        roadmap = db.query(models.Roadmap).order_by(models.Roadmap.id.desc()).first()
        if roadmap:
            print(f"Roadmap ID: {roadmap.id}")
            print(f"Title: {roadmap.title}")
            print(f"Content Type: {type(roadmap.content)}")
            print(f"Content: {json.dumps(roadmap.content, indent=2)}")
        else:
            print("No roadmaps found.")
    except Exception as e:
        print(f"Error: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    check_latest_roadmap()
