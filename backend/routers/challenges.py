from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import User
from core.security import get_current_user
from pydantic import BaseModel
from typing import List, Optional
import os
import httpx

# We'll use Groq for fast code verification if available, or fallback to the same service as roadmap gen
GROQ_API_KEY = os.environ.get("GROQ_API_KEY")
GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"

router = APIRouter()

# --- MVP Data Store ---
CHALLENGES = [
    {
        "id": "1",
        "title": "Reverse a String",
        "difficulty": "Easy",
        "description": "Write a function `reverseString(s)` that takes a string and returns it reversed.",
        "starter_code": "def reverseString(s):\n    # Your code here\n    pass",
        "language": "python",
        "xp": 50,
        "test_criteria": "Input: 'hello' -> Output: 'olleh'. Input: 'Racecar' -> Output: 'racecaR'."
    },
    {
        "id": "2",
        "title": "Two Sum",
        "difficulty": "Medium",
        "description": "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.",
        "starter_code": "def twoSum(nums, target):\n    # Your code here\n    pass",
        "language": "python",
        "xp": 100,
        "test_criteria": "Input: nums = [2,7,11,15], target = 9 -> Output: [0,1]. Efficiency matters (O(n) preferred)."
    },
    {
        "id": "3",
        "title": "Palindrome Number",
        "difficulty": "Easy",
        "description": "Given an integer `x`, return true if `x` is a palindrome, and false otherwise.",
        "starter_code": "def isPalindrome(x):\n    # Your code here\n    pass",
        "language": "python",
        "xp": 50,
        "test_criteria": "Input: 121 -> True. Input: -121 -> False. Input: 10 -> False."
    },
    {
        "id": "4",
        "title": "FizzBuzz",
        "difficulty": "Easy",
        "description": "Given an integer n, return a string array answer (1-indexed) where: answer[i] == 'FizzBuzz' if i is divisible by 3 and 5. answer[i] == 'Fizz' if i is divisible by 3. answer[i] == 'Buzz' if i is divisible by 5. answer[i] == i (as a string) if none of the above conditions are true.",
        "starter_code": "def fizzBuzz(n):\n    # Your code here\n    pass",
        "language": "python",
        "xp": 40,
        "test_criteria": "Input: 3 -> ['1','2','Fizz']. Input: 5 -> ['1','2','Fizz','4','Buzz'].Input: 15 -> ... 'FizzBuzz'."
    },
    {
        "id": "5",
        "title": "Valid Parentheses",
        "difficulty": "Medium",
        "description": "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. Open brackets must be closed by the same type of brackets. Open brackets must be closed in the correct order.",
        "starter_code": "def isValid(s):\n    # Your code here\n    pass",
        "language": "python",
        "xp": 90,
        "test_criteria": "Input: '()' -> True. Input: '()[]{}' -> True. Input: '(]' -> False."
    },
    {
        "id": "6",
        "title": "Climbing Stairs",
        "difficulty": "Easy",
        "description": "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
        "starter_code": "def climbStairs(n):\n    # Your code here\n    pass",
        "language": "python",
        "xp": 60,
        "test_criteria": "Input: 2 -> 2. Input: 3 -> 3. Input: 5 -> 8."
    },
    {
        "id": "7",
        "title": "Merge Intervals",
        "difficulty": "Medium",
        "description": "Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.",
        "starter_code": "def merge(intervals):\n    # Your code here\n    pass",
        "language": "python",
        "xp": 110,
        "test_criteria": "Input: [[1,3],[2,6],[8,10],[15,18]] -> [[1,6],[8,10],[15,18]]. Input: [[1,4],[4,5]] -> [[1,5]]."
    },
    {
        "id": "8",
        "title": "Longest Substring Without Repeats",
        "difficulty": "Hard",
        "description": "Given a string s, find the length of the longest substring without repeating characters.",
        "starter_code": "def lengthOfLongestSubstring(s):\n    # Your code here\n    pass",
        "language": "python",
        "xp": 150,
        "test_criteria": "Input: 'abcabcbb' -> 3. Input: 'bbbbb' -> 1. Input: 'pwwkew' -> 3."
    }
]

class ChallengeSubmission(BaseModel):
    code: str
    challenge_id: str
    language: str

class VerificationResult(BaseModel):
    is_correct: bool
    feedback: str
    xp_awarded: int

@router.get("/", response_model=List[dict])
async def get_challenges():
    """Returns the list of available challenges."""
    return CHALLENGES

@router.get("/{challenge_id}")
async def get_challenge_detail(challenge_id: str):
    """Returns details for a specific challenge."""
    challenge = next((c for c in CHALLENGES if c["id"] == challenge_id), None)
    if not challenge:
        raise HTTPException(status_code=404, detail="Challenge not found")
    return challenge

@router.post("/verify", response_model=VerificationResult)
async def verify_solution(
    submission: ChallengeSubmission,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user)
):
    """
    Verifies the submitted code using AI.
    If correct, awards XP to the user.
    """
    challenge = next((c for c in CHALLENGES if c["id"] == submission.challenge_id), None)
    if not challenge:
        raise HTTPException(status_code=404, detail="Challenge not found")

    # Call AI for verification
    # Construct a prompt for the LLM
    prompt = f"""
    You are a Senior Code Reviewer and Auto-Grader.
    
    Task: Verify if the following code correctly solves the problem.
    
    Problem: {challenge['title']}
    Description: {challenge['description']}
    Test Criteria: {challenge['test_criteria']}
    
    User Submitted Code ({submission.language}):
    ```
    {submission.code}
    ```
    
    Instructions:
    1. Check for correctness based on Test Criteria.
    2. Check for logic errors.
    3. Ignore minor styling issues unless they break the code.
    
    Return ONLY a JSON object in this format, no markdown, no other text:
    {{
        "correct": boolean,
        "feedback": "string (concise explanation or hints if wrong, praise if correct)"
    }}
    """
    
    system_message = "You are a precise code verification engine. Output valid JSON only."
    
    try:
        if not GROQ_API_KEY:
            # Fallback mock for dev without key
            is_correct = "pass" not in submission.code and len(submission.code) > 20
            return {
                "is_correct": is_correct,
                "feedback": "AI key missing. Mock verification: " + ("Success!" if is_correct else "Code looks incomplete."),
                "xp_awarded": challenge["xp"] if is_correct else 0
            }

        async with httpx.AsyncClient() as client:
            response = await client.post(
                GROQ_API_URL,
                headers={"Authorization": f"Bearer {GROQ_API_KEY}"},
                json={
                    "model": "llama-3.3-70b-versatile",
                    "messages": [
                        {"role": "system", "content": system_message},
                        {"role": "user", "content": prompt}
                    ],
                    "temperature": 0.1,
                    "response_format": {"type": "json_object"}
                },
                timeout=30.0
            )
            
            if response.status_code != 200:
                raise HTTPException(status_code=500, detail="AI Verification Service unavailable")
                
            result = response.json()
            ai_content = result["choices"][0]["message"]["content"]
            
            # Parse JSON response
            import json
            evaluation = json.loads(ai_content)
            
            is_correct = evaluation.get("correct", False)
            feedback = evaluation.get("feedback", "No feedback provided.")
            
            xp_awarded = 0
            if is_correct:
                xp_awarded = challenge["xp"]
                # Award XP to user
                # Ensure user.total_xp is initialized
                if user.total_xp is None:
                    user.total_xp = 0
                user.total_xp += xp_awarded
                db.commit()
            
            return {
                "is_correct": is_correct,
                "feedback": feedback,
                "xp_awarded": xp_awarded
            }

    except Exception as e:
        print(f"Verification Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))
