import os
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import PydanticOutputParser
from pydantic import BaseModel, Field
from typing import List

# Define Pydantic models for output structure
class Resource(BaseModel):
    title: str = Field(description="Title of the resource")
    url: str = Field(description="URL to the resource")
    type: str = Field(description="Type of resource (e.g., Video, Article, Course, Book)")

class Project(BaseModel):
    title: str = Field(description="Title of the project")
    description: str = Field(description="Brief description of what to build")
    difficulty: str = Field(description="Difficulty: Beginner, Intermediate, or Advanced")

class RoadmapModule(BaseModel):
    title: str = Field(description="Title of the module")
    description: str = Field(description="Description of the module")
    topics: List[str] = Field(description="List of specific topics covered in this module")
    free_resources: List[Resource] = Field(description="List of 2-3 free learning resources (e.g. YouTube, Documentation)")
    paid_resources: List[Resource] = Field(description="List of 1-2 paid learning resources (e.g. Udemy, Coursera)")
    projects: List[Project] = Field(description="List of 1-2 hands-on projects to build to practice these skills")

class RoadmapStructure(BaseModel):
    roadmap: List[RoadmapModule] = Field(description="List of modules in the learning roadmap")

# Initialize parser (Global)
output_parser = PydanticOutputParser(pydantic_object=RoadmapStructure)
format_instructions = output_parser.get_format_instructions()

def get_llm(model_name="llama-3.3-70b-versatile"):
    api_key = os.getenv("GROQ_API_KEY")
    if not api_key:
        # print("Warning: GROQ_API_KEY not found in environment variables.")
        return None
    return ChatGroq(
        model=model_name,
        temperature=0.7,
        api_key=api_key
    )

# Initialize parser
output_parser = PydanticOutputParser(pydantic_object=RoadmapStructure)
format_instructions = output_parser.get_format_instructions()

def generate_roadmap(goal: str, current_skills: str = "", resume_text: str = ""):
    llm = get_llm()
    if not llm:
        return {"error": "GROQ_API_KEY not set. Please check your backend .env file."}

    template = """
    You are an expert coding mentor. Create a detailed learning roadmap for a user with the following goal: {goal}.
    
    Current skills/background: {current_skills}
    Resume Content (if provided): {resume_text}
    
    INSTRUCTIONS:
    1. Analyze the user's current skills and resume.
    2. If the resume shows proficiency in a topic, either skip it or mark it as "Review/Advanced".
    3. Focus the roadmap on filling the GAPS to reach the goal.
    4. The roadmap should be broken down into weekly or thematic modules.
    5. For each module, provide:
       - A title and brief description.
       - A list of specific topics/sub-skills.
       - at least 2 FREE resources. IMPORTANT: Prefer "Official Documentation" (e.g., React Docs, MDN, Python.org) or highly stable YouTube channels (e.g., Traversy Media, FreeCodeCamp). *DO NOT* use random blog posts or deep links that might change.
       - at least 1 PAID resource (Udemy/Coursera Course Landing Pages, O'Reilly Books).
       - 1-2 PRACTICAL PROJECTS: Suggest a specific application to build that uses these skills (e.g., "Build a To-Do List", "Create a Weather App").
    
    {format_instructions}
    """
    
    prompt = ChatPromptTemplate.from_template(template)
    
    messages = prompt.format_messages(
        goal=goal, 
        current_skills=current_skills,
        resume_text=resume_text,
        format_instructions=format_instructions
    )
    
    try:
        # print("DEBUG: Invoking LLM...")
        response = llm.invoke(messages)
        # print("DEBUG: LLM response received. Parsing...")
        parsed_output = output_parser.parse(response.content)
        # print("DEBUG: Parsing successful.")
        # Convert Pydantic model to dict for API response compatibility
        return parsed_output.model_dump()
    except Exception as e:
        # print(f"Error parsing AI response: {e}")
        # Return a partial response if available, or just the error
        return {"error": "Failed to generate roadmap", "details": str(e)}

# --- Quiz Generation ---

class QuizOption(BaseModel):
    text: str = Field(description="The option text")
    is_correct: bool = Field(description="Whether this option is correct")
    explanation: str = Field(description="Explanation for why this option is correct or incorrect")

class QuizQuestion(BaseModel):
    question: str = Field(description="The question text")
    options: List[QuizOption] = Field(description="Multiple choice options (usually 4)")
    difficulty: str = Field(description="Difficulty level: Beginner, Intermediate, or Advanced")

class Quiz(BaseModel):
    topic: str = Field(description="The topic of the quiz")
    questions: List[QuizQuestion] = Field(description="List of questions in the quiz")

quiz_parser = PydanticOutputParser(pydantic_object=Quiz)
quiz_format_instructions = quiz_parser.get_format_instructions()

def generate_quiz(topic: str, difficulty: str = "Beginner"):
    # Use faster model for quizzes
    llm = get_llm(model_name="llama-3.1-8b-instant")
    if not llm:
        return {"error": "GROQ_API_KEY not set."}

    template = """
    You are an expert coding mentor. Create a short multiple-choice quiz for the user to test their knowledge on: {topic}.
    
    Difficulty Level: {difficulty}
    
    INSTRUCTIONS:
    1. Generate 3-5 high-quality questions.
    2. Provide 4 options for each question (1 correct, 3 distractors).
    3. Include a brief explanation for each option (or at least the correct one).
    
    {format_instructions}
    """
    
    prompt = ChatPromptTemplate.from_template(template)
    
    messages = prompt.format_messages(
        topic=topic,
        difficulty=difficulty,
        format_instructions=quiz_format_instructions
    )
    
    try:
        response = llm.invoke(messages)
        parsed_output = quiz_parser.parse(response.content)
        return parsed_output.model_dump()
    except Exception as e:
        # print(f"Error parsing Quiz AI response: {e}")
        return {"error": "Failed to generate quiz", "details": str(e)}

# --- Lesson Generation ---

class LessonContent(BaseModel):
    title: str = Field(description="Title of the lesson")
    content_markdown: str = Field(description="Detailed lesson content in Markdown format")
    estimated_time: str = Field(description="Estimated reading/practice time (e.g. '15 mins')")

lesson_parser = PydanticOutputParser(pydantic_object=LessonContent)
lesson_format_instructions = lesson_parser.get_format_instructions()

def generate_lesson(topic: str, context: str = ""):
    # Use faster model for lessons
    llm = get_llm(model_name="llama-3.1-8b-instant")
    if not llm:
        return {"error": "GROQ_API_KEY not set."}

    template = """
    You are an expert coding instructor. Create a comprehensive, deep-dive lesson for the topic: {topic}.
    
    Context (Parent Module/Roadmap): {context}
    
    INSTRUCTIONS:
    1. **Structure**: 
       - **Introduction**: Briefly explain what {topic} is and why it matters.
       - **Core Concept**: Deep explanation of how it works. Use analogies if helpful.
       - **Code Implementation**: Provide realistic, copy-pasteable code snippets (Python, JS, etc.) with comments explaining each part.
       - **Common Pitfalls**: What mistakes do beginners often make?
       - **Best Practices**: Professional tips for using this in production.
       - **Challenge**: A small mini-task for the learner to try.
       - **Job-Ready Project Idea**: Suggest a small feature or tool they can build RIGHT NOW using this specific topic to add to their portfolio.
    
    2. **Tone**: Encouraging, professional, and clear.
    3. **Formatting**: Return ONLY the Markdown content. Do not wrap it in JSON. Use headers, bold text, and code blocks.
    """
    
    prompt = ChatPromptTemplate.from_template(template)
    
    messages = prompt.format_messages(topic=topic, context=context)
    
    try:
        # print(f"DEBUG: Generating lesson for topic: {topic}")
        response = llm.invoke(messages)
        content = response.content
        
        # Simple cleanup if the model chats
        if "Here is the lesson" in content:
             content = content.split("Here is the lesson")[-1].strip()
        
        return {
            "title": f"Lesson: {topic}",
            "content_markdown": content,
            "estimated_time": "15 mins" # Estimate
        }
    except Exception as e:
        # print(f"Error generating lesson: {e}")
        return {
            "title": f"Lesson: {topic}", 
            "content_markdown": f"Failed to generate lesson content. Error: {str(e)}",
            "estimated_time": "0 mins"
        }
