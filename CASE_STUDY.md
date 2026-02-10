# Case Study: CodeForge AI

> **Escaping "Tutorial Hell" with Autonomous Learning Agents, Next.js 15, and Llama 3.**

![Project Banner](https://via.placeholder.com/1200x630/171717/F59E0B?text=CodeForge+AI+Showcase)

## 1. The Problem: "Tutorial Hell"

Self-taught developers often face a critical bottleneck known as "Tutorial Hell."

*   **Fragmentation:** Learning resources are scattered across YouTube, documentation, and paid courses.
*   **Lack of Structure:** Beginners don't know *what* to learn next.
*   **Static Content:** Video tutorials become outdated within months.
*   **Zero Personalization:** A senior Python dev wanting to learn React shouldn't start with "What is a variable?".

I built **CodeForge AI** to solve this. It acts as an **autonomous coding mentor** that generates personalized, up-to-date curricula based on your specific goals and existing skills.

---

## 2. The Solution: Autonomous Curriculum Generation

**CodeForge AI** isn't just a wrapper around ChatGPT. It's a full-stack platform that:
1.  **Analyzes** your resume and learning goals.
2.  **Architects** a bespoke learning roadmap (JSON structure) using Llama 3 on Groq.
3.  **Delivers** interactive, markdown-based lessons generated in real-time.
4.  **Tracks** granular progress, streaks, and XP to keep you motivated.

---

## 3. Architecture & Tech Stack

I chose a hybrid architecture to balance **interactive UI performance** (Next.js) with **robust data processing** (Python).

### **Frontend: The Interactive Layer**
*   **Next.js 15 (App Router):** For server-side rendering and SEO.
*   **TypeScript:** Strict typing for reliability.
*   **Tailwind CSS + Shadcn/ui:** For a premium, accessible design system.
*   **Framer Motion:** For smooth, app-like transitions.
*   **Lucide React:** Consistent iconography.

### **Backend: The Intelligence Layer**
*   **Python + FastAPI:** Chosen for its native support for AI libraries and high performance (async).
*   **SQLAlchemy + Pydantic:** For strict data validation and ORM.
*   **Supabase (PostgreSQL):** Relational data storage with Row Level Security (RLS).
*   **Authentication:** JWT-based auth via Supabase.

### **AI Engine: The Core**
*   **Groq LPU Inference Engine:**
    *   **Model:** `Llama-3-70b-versatile` (Complex logic/Roadmaps)
    *   **Model:** `Llama-3-8b-instant` (Simple tasks/Quizzes)
    *   **Why Groq?** Sub-second inference speed is critical for UX. Waiting 30s for a roadmap is unacceptable; Groq delivers it in <2s.

---

## 4. Design System: "Solar Clarity"

The UI is built on a custom design system emphasizing clarity, warmth, and focus.

### **Typography**
*   **Headings / Body:** `Outfit` (Variable) - A geometric sans-serif that feels modern and approachable.
*   **Code / Technical:** `Geist Mono` - A precision-engineered monospace font for readability in code blocks.

### **Color Palette**
*   **Primary (Brand):** `Amber 400` (`#fbbf24`) - Represents energy, illumination, and the "spark" of learning.
*   **Background:** `White` / `Zinc 50` - Clean, distraction-free canvas.
*   **Foreground:** `Zinc 950` (`#09090b`) - High-contrast text for maximum readability.
*   **Accents:** Subtle glassmorphism effects (`backdrop-blur-md`) to add depth without clutter.

---

## 4. Key Technical Challenges & Solutions

### Challenge 1: Hallucinations & Broken Links
**Problem:** The AI would occasionally invent resource links or suggest deprecated libraries.
**Solution:**
*   **Prompt Engineering:** Enforced "Strict Mode" in system prompts, prioritising official documentation (MDN, React Docs).
*   **Frontend Fallback:** Implemented a "Smart Search" button next to every resource. If a link fails, the user can instantly search Google for the exact qualified term (e.g., "React useEffect hook documentation").

### Challenge 2: Real-time Latency
**Problem:** Generating a full 8-week curriculum with lessons took 45+ seconds on standard APIs.
**Solution:**
*   **Tiered Models:** Used 70B models for high-level planning and 8B models for granular content generation.
*   **Optimistic UI:** The frontend displays the skeleton structure immediately while background workers hydrate the content.

### Challenge 3: Security & Data Integrity
**Problem:** Ensuring users could only modify their *own* progress.
**Solution:**
*   **Row Level Security (RLS):** Enabled on Supabase to enforce ownership at the database level.
*   **Backend Middleware:** Custom dependency injection in FastAPI `get_current_user` to verify JWTs on every protected route.

---

## 5. Future Roadmap

*   **Code Execution Sandbox:** Integrating a Docker-based runner to execute Python/JS code directly in the browser.
*   **Community Roadmaps:** Allow users to share and fork successful learning paths.
*   **VS Code Extension:** Bring the curriculum directly into the editor.

---

## 6. Run Locally

```bash
# Clone the repository
git clone https://github.com/yourusername/codeforge-ai.git

# Frontend
cd frontend
npm install
npm run dev

# Backend
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
uvicorn main:app --reload
```

---

_Built with ❤️ by [Your Name]_
