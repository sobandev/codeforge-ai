import Link from "next/link"
import { GitBranch, CheckCircle2, CircleDashed } from "lucide-react"

export default function Roadmaps() {
    return (
        <div className="prose prose-neutral max-w-none">
            <div className="flex items-center gap-2 text-sm text-neutral-500 mb-8">
                <Link href="/" className="hover:text-neutral-900">Home</Link>
                <span>/</span>
                <Link href="/docs" className="hover:text-neutral-900">Documentation</Link>
                <span>/</span>
                <span className="text-neutral-900">Roadmaps</span>
            </div>

            <h1 className="text-4xl font-bold text-neutral-900 mb-6">Interactive Roadmaps</h1>

            <p className="lead text-xl text-neutral-600 mb-8">
                Your roadmap is a living document. It adapts as you learn and grow.
            </p>

            <section className="mb-12">
                <h2 className="flex items-center gap-3 text-2xl font-bold text-neutral-900">
                    <GitBranch className="h-6 w-6 text-amber-500" />
                    Node Structure
                </h2>
                <p>The roadmap is visualized as a directed graph. Each node represents a specific skill or concept.</p>

                <div className="grid md:grid-cols-3 gap-6 not-prose my-8">
                    <div className="p-4 border border-neutral-200 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                            <span className="font-bold">Completed</span>
                        </div>
                        <p className="text-sm text-neutral-600">Skills you already mastered (detected from resume).</p>
                    </div>
                    <div className="p-4 border border-amber-200 bg-amber-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                            <CircleDashed className="h-5 w-5 text-amber-600 animate-pulse" />
                            <span className="font-bold text-amber-900">In Progress</span>
                        </div>
                        <p className="text-sm text-amber-800">The skill you are currently focused on.</p>
                    </div>
                    <div className="p-4 border border-neutral-200 rounded-lg opacity-60">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="h-4 w-4 rounded-full border-2 border-neutral-400" />
                            <span className="font-bold">Locked</span>
                        </div>
                        <p className="text-sm text-neutral-600">Prerequisites needed before unlocking.</p>
                    </div>
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">Tracking Progress</h2>
                <ol className="list-decimal pl-6 space-y-4">
                    <li><strong>Click a Node:</strong> Opens the details panel with resources and quizzes.</li>
                    <li><strong>Study:</strong> Read the provided tutorials or documentation.</li>
                    <li><strong>Take Quiz:</strong> Pass the quiz to mark the node as "Complete".</li>
                    <li><strong>Unlock Next:</strong> The next node in the tree will unlock automatically.</li>
                </ol>
            </section>
        </div>
    )
}
