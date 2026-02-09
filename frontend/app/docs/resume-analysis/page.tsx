import Link from "next/link"
import { Eye, ShieldCheck, FileWarning } from "lucide-react"

export default function ResumeAnalysis() {
    return (
        <div className="prose prose-neutral max-w-none">
            <div className="flex items-center gap-2 text-sm text-neutral-500 mb-8">
                <Link href="/" className="hover:text-neutral-900">Home</Link>
                <span>/</span>
                <Link href="/docs" className="hover:text-neutral-900">Documentation</Link>
                <span>/</span>
                <span className="text-neutral-900">Resume Analysis</span>
            </div>

            <h1 className="text-4xl font-bold text-neutral-900 mb-6">Resume Analysis Engine</h1>

            <p className="lead text-xl text-neutral-600 mb-8">
                CodeForge uses advanced Natural Language Processing (NLP) to understand your professional profile deeply. Here's how it works.
            </p>

            <section className="mb-12">
                <h2 className="flex items-center gap-3 text-2xl font-bold text-neutral-900">
                    <Eye className="h-6 w-6 text-amber-500" />
                    What We Look For
                </h2>
                <p>Our parser extracts key information from your uploaded PDF:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Skills & Technologies:</strong> Languages (Python, JS), Frameworks (React, Django), Tools (Docker, AWS).</li>
                    <li><strong>Experience Level:</strong> Years of experience derived from your work history.</li>
                    <li><strong>Project Complexity:</strong> Keywords indicating deeper knowledge (e.g., "Architecture", "Scaling", "Optimization").</li>
                </ul>
            </section>

            <section className="mb-12">
                <h2 className="flex items-center gap-3 text-2xl font-bold text-neutral-900">
                    <FileWarning className="h-6 w-6 text-amber-500" />
                    Best Practices for Uploads
                </h2>
                <p>To ensure the most accurate roadmap generation:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Use Standard Formats:</strong> PDF files are preferred.</li>
                    <li><strong>Keywords Matter:</strong> Be specific. Instead of "Web Dev", say "React, Next.js, Tailwind".</li>
                    <li><strong>Avoid Graphics:</strong> Text embedded in images cannot be read by our parser.</li>
                </ul>
            </section>

            <section className="mb-12">
                <h2 className="flex items-center gap-3 text-2xl font-bold text-neutral-900">
                    <ShieldCheck className="h-6 w-6 text-amber-500" />
                    Privacy & Data
                </h2>
                <p>
                    We value your privacy. Your resume is <strong>processed in memory</strong> to generate the roadmap and then stored securely.
                </p>
                <div className="bg-green-50 border border-green-100 p-4 rounded-lg text-green-800 text-sm">
                    We do NOT sell your data to recruiters. It is used strictly to personalize your learning experience.
                </div>
            </section>
        </div>
    )
}
