import Link from "next/link"
import { FileText, LayoutDashboard, Zap } from "lucide-react"

export default function Documentation() {
    return (
        <div className="prose prose-neutral max-w-none">
            <div className="flex items-center gap-2 text-sm text-neutral-500 mb-8">
                <Link href="/" className="hover:text-neutral-900">Home</Link>
                <span>/</span>
                <span>Documentation</span>
                <span>/</span>
                <span className="text-neutral-900">Introduction</span>
            </div>

            <h1 className="text-4xl font-bold text-neutral-900 mb-6">Introduction to CodeForge AI</h1>

            <p className="lead text-xl text-neutral-600 mb-8">
                CodeForge AI is your intelligent career architect. It helps developers bridge the gap between their current skills and their dream job requirements through hyper-personalized learning paths.
            </p>

            <div className="bg-amber-50 border border-amber-100 rounded-xl p-6 mb-10">
                <h3 className="text-lg font-bold text-neutral-900 mb-2 flex items-center gap-2">
                    <Zap className="h-5 w-5 text-amber-500" />
                    Why CodeForge?
                </h3>
                <p className="text-neutral-700">
                    Most tutorials are one-size-fits-all. CodeForge builds a curriculum specific to <strong>YOU</strong>, based on what you already know (from your resume) and what you want to achieve.
                </p>
            </div>

            <h2>How It Works</h2>
            <div className="grid sm:grid-cols-2 gap-6 not-prose mb-12">
                <div className="p-6 rounded-xl border border-neutral-200 hover:border-amber-300 transition-colors">
                    <FileText className="h-8 w-8 text-neutral-900 mb-4" />
                    <h3 className="font-bold text-lg mb-2">1. Upload Resume</h3>
                    <p className="text-neutral-600 text-sm">We parse your PDF to understand your current tech stack and experience level.</p>
                </div>
                <div className="p-6 rounded-xl border border-neutral-200 hover:border-amber-300 transition-colors">
                    <LayoutDashboard className="h-8 w-8 text-neutral-900 mb-4" />
                    <h3 className="font-bold text-lg mb-2">2. Generate Roadmap</h3>
                    <p className="text-neutral-600 text-sm">Our AI identifies skill gaps and builds a week-by-week learning plan.</p>
                </div>
            </div>

            <h2>Getting Started</h2>
            <p>
                Ready to dive in? Follow our <Link href="/docs/quick-start" className="font-medium text-amber-600 hover:underline">Quick Start Guide</Link> to analyze your first resume in under 2 minutes.
            </p>
        </div>
    )
}
