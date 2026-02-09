from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from supabase import create_client, Client
import os
import jwt
from sqlalchemy.orm import Session
from database import get_db
from models import User

# Initialize Supabase Client (for admin tasks if needed, but mostly for verification)
url: str = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
key: str = os.environ.get("NEXT_PUBLIC_SUPABASE_ANON_KEY")

# For JWT verification, we need the JWT Secret if we were doing manual local verification.
# However, Supabase-py client can also getUser from the token.
# Let's use the simplest approach: Pass the token to Supabase `get_user`.

security = HTTPBearer()

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security), db: Session = Depends(get_db)):
    token = credentials.credentials
    
    try:
        # Option 1: Verify via Supabase API (Slower but safest)
        supabase: Client = create_client(url, key)
        user_response = supabase.auth.get_user(token)
        
        if not user_response.user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid authentication credentials",
                headers={"WWW-Authenticate": "Bearer"},
            )
            
        supabase_user_id = user_response.user.id
        email = user_response.user.email
        
        # Sync with local DB
        db_user = db.query(User).filter(User.supabase_id == supabase_user_id).first()
        
        if not db_user:
            # Check if user exists by email (legacy/first login sync)
            db_user = db.query(User).filter(User.email == email).first()
            if db_user:
                # Link existing user
                db_user.supabase_id = supabase_user_id
            else:
                # Create new user
                db_user = User(
                    email=email,
                    supabase_id=supabase_user_id,
                    is_active=True
                )
                db.add(db_user)
            
            db.commit()
            db.refresh(db_user)
            
        return db_user

    except Exception as e:
        print(f"Auth Error: {e}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
