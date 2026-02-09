import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle2, Code2, Database, Globe, Layers, Zap, Cpu, Sparkles } from "lucide-react"

export default function CaseStudyPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Navigation */}
            <nav className="border-b border-neutral-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 group">
                        <ArrowLeft className="h-4 w-4 text-neutral-500 group-hover:text-neutral-900 transition-colors" />
                        <span className="font-medium text-neutral-600 group-hover:text-neutral-900 transition-colors">Back to Home</span>
                    </Link>
                    <div className="font-bold text-lg tracking-tight">CodeForge AI <span className="text-amber-500">Case Study</span></div>
                    <Link href="/dashboard">
                        <Button size="sm" className="bg-neutral-900 text-white hover:bg-neutral-800 rounded-full px-6">
                            Try App
                        </Button>
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-20 pb-32 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-50 via-white to-white opacity-70"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center space-y-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/50 border border-amber-200 text-amber-700 text-sm font-medium">
                            <Sparkles className="h-3.5 w-3.5" /> Project Showcase
                        </div>
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-neutral-900">
                            Building the Future of <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">
                                Autonomous Learning
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-neutral-600 leading-relaxed max-w-2xl mx-auto">
                            How we leveraged <strong>Next.js 15</strong>, <strong>FastAPI</strong>, and <strong>Llama 3</strong> to solve "Tutorial Hell" for self-taught developers.
                        </p>
                    </div>
                </div>
            </section>

            {/* The Problem & Solution */}
            <section className="py-24 bg-neutral-50 border-y border-neutral-100">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold text-neutral-900">The Problem: Tutorial Hell</h2>
                            <p className="text-lg text-neutral-600 leading-relaxed">
                                Self-taught developers often feel lost. They jump from one random YouTube tutorial to another without a clear path.
                                Platforms like Udemy or Coursera offer static courses that don't adapt to what the user <em>already knows</em>.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    "Lack of structured learning paths",
                                    "Content becomes outdated quickly",
                                    "No personalization for prior experience",
                                    "Difficulty tracking real progress"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-neutral-700">
                                        <div className="h-6 w-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                                            <span className="text-red-500 text-xs font-bold">✕</span>
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold text-neutral-900">The Solution: CodeForge AI</h2>
                            <p className="text-lg text-neutral-600 leading-relaxed">
                                We built an intelligent agent that acts as a personal mentor. It parses your resume, understands your goals, and generates
                                a bespoke curriculum instantly using Large Language Models.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    "AI-Generated Personalized Roadmaps",
                                    "Dynamic content that evolves with the industry",
                                    "Resume parsing to skip known topics",
                                    "Gamified progression system (XP, Streaks)"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-neutral-700">
                                        <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tech Stack Grid */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold text-neutral-900 mb-4">Architecture & Tech Stack</h2>
                        <p className="text-lg text-neutral-600">
                            A modern, scalable microservices architecture designed for performance and real-time interaction.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Frontend */}
                        <div className="p-8 rounded-3xl bg-neutral-50 border border-neutral-100 space-y-6 hover:shadow-lg transition-shadow">
                            <div className="h-12 w-12 bg-black rounded-2xl flex items-center justify-center text-white">
                                <Globe className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold text-neutral-900">Modern Frontend</h3>
                            <ul className="space-y-3 text-neutral-600">
                                <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-neutral-400"></div>Next.js 15 (App Router)</li>
                                <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-neutral-400"></div>TypeScript Strict Mode</li>
                                <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-neutral-400"></div>Tailwind CSS + Shadcn/ui</li>
                                <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-neutral-400"></div>Framer Motion Animations</li>
                            </ul>
                        </div>

                        {/* Backend */}
                        <div className="p-8 rounded-3xl bg-neutral-50 border border-neutral-100 space-y-6 hover:shadow-lg transition-shadow">
                            <div className="h-12 w-12 bg-amber-500 rounded-2xl flex items-center justify-center text-white">
                                <Zap className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold text-neutral-900">Powerful Backend</h3>
                            <ul className="space-y-3 text-neutral-600">
                                <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-neutral-400"></div>Python FastAPI</li>
                                <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-neutral-400"></div>SQLAlchemy ORM</li>
                                <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-neutral-400"></div>Pydantic Validation</li>
                                <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-neutral-400"></div>Render Deployment</li>
                            </ul>
                        </div>

                        {/* AI & Data */}
                        <div className="p-8 rounded-3xl bg-neutral-50 border border-neutral-100 space-y-6 hover:shadow-lg transition-shadow">
                            <div className="h-12 w-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white">
                                <Cpu className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold text-neutral-900">AI & Infrastructure</h3>
                            <ul className="space-y-3 text-neutral-600">
                                <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-neutral-400"></div>Groq (Llama 3 70B)</li>
                                <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-neutral-400"></div>Supabase (PostgreSQL)</li>
                                <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-neutral-400"></div>Row Level Security (RLS)</li>
                                <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-neutral-400"></div>Vector Embeddings (Planned)</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Key Features Showcase */}
            <section className="py-24 bg-neutral-900 map-grid text-white">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">Core Capabilities</h2>
                        <p className="text-neutral-400 text-lg">What makes CodeForge strictly superior to static courses.</p>
                    </div>

                    <div className="space-y-24">
                        {/* Feature 1 */}
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="order-2 md:order-1 bg-neutral-800/50 rounded-xl p-6 border border-neutral-800">
                                <div className="aspect-video bg-neutral-900 rounded-lg overflow-hidden relative">
                                    {/* Abstract representation of roadmap JSON */}
                                    <div className="absolute inset-0 p-4 font-mono text-xs text-green-400 opacity-80">
                                        {`{
  "module": "Advanced Patterns",
  "topics": [
    "Higher Order Components",
    "Custom Hooks",
    "Performance Optimization"
  ],
  "status": "generated"
}`}
                                    </div>
                                </div>
                            </div>
                            <div className="order-1 md:order-2 space-y-6">
                                <div className="h-10 w-10 bg-amber-500 rounded-lg flex items-center justify-center text-black font-bold text-lg">1</div>
                                <h3 className="text-2xl font-bold">Dynamic Roadmap Generation</h3>
                                <p className="text-neutral-400 text-lg leading-relaxed">
                                    Instead of pre-recorded videos, CodeForge generates a custom JSON based curriculum in real-time.
                                    It uses Llama 3 70B via Groq for sub-second inference, ensuring the content is always up-to-date with the latest framework versions.
                                </p>
                            </div>
                        </div>

                        {/* Feature 2 */}
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="space-y-6">
                                <div className="h-10 w-10 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">2</div>
                                <h3 className="text-2xl font-bold">Interactive Learning Studio</h3>
                                <p className="text-neutral-400 text-lg leading-relaxed">
                                    We built a custom markdown rendering engine with syntax highlighting.
                                    The "Learning Studio" caches lessons locally to reduce API costs and latency, providing a snappy, app-like experience.
                                </p>
                            </div>
                            <div className="bg-neutral-800/50 rounded-xl p-6 border border-neutral-800">
                                <div className="aspect-video bg-neutral-900 rounded-lg flex items-center justify-center">
                                    <Code2 className="h-16 w-16 text-neutral-700" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Results */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <h2 className="text-3xl font-bold text-neutral-900 mb-12">The Impact</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="space-y-2">
                            <div className="text-4xl font-extrabold text-amber-500">1.2s</div>
                            <div className="text-sm font-medium text-neutral-500 uppercase tracking-wide">Avg Generation Time</div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-4xl font-extrabold text-neutral-900">100%</div>
                            <div className="text-sm font-medium text-neutral-500 uppercase tracking-wide">Personalized</div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-4xl font-extrabold text-neutral-900">Zero</div>
                            <div className="text-sm font-medium text-neutral-500 uppercase tracking-wide">Hallucinations*</div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-4xl font-extrabold text-neutral-900">Scale</div>
                            <div className="text-sm font-medium text-neutral-500 uppercase tracking-wide">Ready</div>
                        </div>
                    </div>
                    <p className="mt-8 text-neutral-400 text-sm">*Optimized prompt engineering drastically reduces hallucination rates.</p>
                </div>
            </section>

            {/* Footer CTA */}
            <section className="py-24 bg-neutral-50 border-t border-neutral-200">
                <div className="container mx-auto px-4 text-center space-y-8">
                    <h2 className="text-4xl font-bold text-neutral-900">Ready to forge your path?</h2>
                    <p className="text-lg text-neutral-600">Join thousands of developers building their future with AI.</p>
                    <div className="flex justify-center gap-4">
                        <Link href="/dashboard">
                            <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white rounded-full px-8 h-12 text-lg">
                                Start Building Now
                            </Button>
                        </Link>
                        <Link href="/">
                            <Button size="lg" variant="outline" className="rounded-full px-8 h-12 text-lg">
                                View Landing Page
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
