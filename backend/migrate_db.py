from database import engine
from sqlalchemy import text

def migrate():
    with engine.connect() as conn:
        print("Checking for missing columns...")
        
        # Add github_username
        try:
            conn.execute(text("ALTER TABLE users ADD COLUMN github_username VARCHAR"))
            print("Added github_username column")
        except Exception as e:
            print("github_username column might already exist or error:", e)

        # Add total_xp
        try:
            conn.execute(text("ALTER TABLE users ADD COLUMN total_xp INTEGER DEFAULT 0"))
            print("Added total_xp column")
        except Exception as e:
            print("total_xp column might already exist or error:", e)
            
        conn.commit()
        print("Migration complete.")

if __name__ == "__main__":
    migrate()
