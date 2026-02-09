import { Footer } from "@/components/landing/footer"
import Link from "next/link"
import { Code2, ArrowLeft } from "lucide-react"

export default function DocsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="bg-white border-b border-neutral-200 sticky top-0 z-50">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-neutral-900">
                            <div className="bg-amber-400 p-1.5 rounded-lg">
                                <Code2 className="h-4 w-4 text-neutral-900" />
                            </div>
                            CodeForge Docs
                        </Link>
                        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-600">
                            <Link href="/docs" className="text-amber-600">Guide</Link>
                        </nav>
                    </div>
                    <Link href="/login" className="text-sm font-medium text-neutral-600 hover:text-neutral-900">
                        Sign In
                    </Link>
                </div>
            </header>

            <div className="container mx-auto px-4 flex items-start pt-8 pb-20">

                {/* Sidebar */}
                <aside className="w-64 flex-shrink-0 hidden md:block sticky top-24 pr-8">
                    <div className="space-y-8">
                        <div>
                            <h5 className="font-bold text-neutral-900 mb-4 px-2">Getting Started</h5>
                            <ul className="space-y-1">
                                <li>
                                    <Link href="/docs" className="block px-2 py-1.5 text-sm font-medium text-neutral-600 hover:text-amber-600 hover:bg-amber-50 rounded-md">
                                        Introduction
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/docs/quick-start" className="block px-2 py-1.5 text-sm font-medium text-neutral-600 hover:text-amber-600 hover:bg-amber-50 rounded-md">
                                        Quick Start
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="font-bold text-neutral-900 mb-4 px-2">Core Concepts</h5>
                            <ul className="space-y-1">
                                <li>
                                    <Link href="/docs/resume-analysis" className="block px-2 py-1.5 text-sm font-medium text-neutral-600 hover:text-amber-600 hover:bg-amber-50 rounded-md">
                                        Resume Analysis
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/docs/roadmaps" className="block px-2 py-1.5 text-sm font-medium text-neutral-600 hover:text-amber-600 hover:bg-amber-50 rounded-md">
                                        Roadmaps
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/docs/quizzes" className="block px-2 py-1.5 text-sm font-medium text-neutral-600 hover:text-amber-600 hover:bg-amber-50 rounded-md">
                                        Quizzes
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 max-w-3xl min-h-[60vh]">
                    {children}
                </main>

            </div>
            <Footer />
        </div>
    )
}
