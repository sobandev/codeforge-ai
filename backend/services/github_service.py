import httpx
from collections import Counter

GITHUB_API_URL = "https://api.github.com"

async def analyze_github_user(username: str):
    """
    Analyzes a GitHub user's public repositories to determine skills.
    Returns a set of detected skills/languages.
    """
    detected_skills = set()
    
    async with httpx.AsyncClient() as client:
        # 1. Fetch Repos
        resp = await client.get(f"{GITHUB_API_URL}/users/{username}/repos?sort=updated&per_page=10")
        
        if resp.status_code != 200:
            return {"error": "User not found or API limit reached"}
            
        repos = resp.json()
        
        languages = Counter()
        
        # 2. Analyze top 10 repos
        for repo in repos:
            # Primary Language
            if repo.get("language"):
                languages[repo["language"]] += 1
                detected_skills.add(repo["language"])
                
            # Check topics (if user added them)
            topics = repo.get("topics", [])
            for topic in topics:
                detected_skills.add(topic.lower())
                
            # Deep Scan: Check for specific framework files (simplified)
            # In a real app, we'd fetch the file tree
            repo_name = repo["name"]
            
            # Simple heuristic based on name/description
            desc = (repo.get("description") or "").lower()
            if "react" in desc or "nextjs" in desc:
                detected_skills.add("React")
            if "django" in desc or "fastapi" in desc:
                detected_skills.add("Python Frameworks")
            if "docker" in desc:
                detected_skills.add("Docker")

    return {
        "username": username,
        "repo_count": len(repos),
        "detected_skills": list(detected_skills),
        "top_languages": languages.most_common(3)
    }
