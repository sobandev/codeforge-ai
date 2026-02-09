import Link from "next/link"
import { Trophy, BrainCircuit, Star } from "lucide-react"

export default function Quizzes() {
    return (
        <div className="prose prose-neutral max-w-none">
            <div className="flex items-center gap-2 text-sm text-neutral-500 mb-8">
                <Link href="/" className="hover:text-neutral-900">Home</Link>
                <span>/</span>
                <Link href="/docs" className="hover:text-neutral-900">Documentation</Link>
                <span>/</span>
                <span className="text-neutral-900">Quizzes</span>
            </div>

            <h1 className="text-4xl font-bold text-neutral-900 mb-6">Skill Verification Quizzes</h1>

            <p className="lead text-xl text-neutral-600 mb-8">
                CodeForge doesn't just list resources; it verifies your knowledge.
            </p>

            <section className="mb-12">
                <h2 className="flex items-center gap-3 text-2xl font-bold text-neutral-900">
                    <BrainCircuit className="h-6 w-6 text-amber-500" />
                    AI-Generated Questions
                </h2>
                <p>
                    Quizzes are not static. Our AI generates questions on the fly based on the specific topic and your skill level.
                    This ensures you can't just memorize answers—you must understand the concept.
                </p>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">Scoring & Passing</h2>
                <ul className="space-y-4 not-prose">
                    <li className="flex items-start gap-4">
                        <div className="bg-neutral-100 p-2 rounded-lg">
                            <Star className="h-5 w-5 text-neutral-500" />
                        </div>
                        <div>
                            <strong className="block text-neutral-900">Passing Score</strong>
                            <p className="text-neutral-600 text-sm">You generally need 80% to pass a node quiz.</p>
                        </div>
                    </li>
                    <li className="flex items-start gap-4">
                        <div className="bg-neutral-100 p-2 rounded-lg">
                            <Trophy className="h-5 w-5 text-amber-500" />
                        </div>
                        <div>
                            <strong className="block text-neutral-900">Badges</strong>
                            <p className="text-neutral-600 text-sm">Completing major milestones (e.g., "Intermediate React") earns you badges for your profile.</p>
                        </div>
                    </li>
                </ul>
            </section>
        </div>
    )
}
