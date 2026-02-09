import Link from "next/link"
import { ArrowLeft, UserPlus, FileUp, Sparkles } from "lucide-react"

export default function QuickStart() {
    return (
        <div className="prose prose-neutral max-w-none">
            <div className="flex items-center gap-2 text-sm text-neutral-500 mb-8">
                <Link href="/" className="hover:text-neutral-900">Home</Link>
                <span>/</span>
                <Link href="/docs" className="hover:text-neutral-900">Documentation</Link>
                <span>/</span>
                <span className="text-neutral-900">Quick Start</span>
            </div>

            <h1 className="text-4xl font-bold text-neutral-900 mb-6">Quick Start Guide</h1>

            <p className="lead text-xl text-neutral-600 mb-12">
                Get your first custom roadmap generated in less than 5 minutes. Follow these simple steps.
            </p>

            <div className="space-y-12">
                {/* Step 1 */}
                <div className="relative">
                    <div className="absolute -left-12 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-neutral-900 text-white font-bold text-sm hidden md:flex">1</div>
                    <h3 className="text-2xl font-bold text-neutral-900 mb-4 flex items-center gap-3">
                        <UserPlus className="h-6 w-6 text-amber-500" />
                        Create an Account
                    </h3>
                    <p className="text-neutral-600 mb-4">
                        Head over to the <Link href="/signup" className="text-amber-600 font-medium hover:underline">Sign Up page</Link>. You can create an account using your email or continue with GitHub/Google.
                    </p>
                    <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200 text-sm text-neutral-500">
                        <strong>Tip:</strong> Using GitHub will allow us to eventually analyze your repositories too (Coming Soon).
                    </div>
                </div>

                {/* Step 2 */}
                <div className="relative">
                    <div className="absolute -left-12 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-neutral-900 text-white font-bold text-sm hidden md:flex">2</div>
                    <h3 className="text-2xl font-bold text-neutral-900 mb-4 flex items-center gap-3">
                        <FileUp className="h-6 w-6 text-amber-500" />
                        Upload Your Resume
                    </h3>
                    <p className="text-neutral-600 mb-4">
                        Once logged in, you'll be prompted to upload your resume. We accept <strong>PDF</strong> formats. Ensure your resume text is selectable (not an image scan) for the best results.
                    </p>
                </div>

                {/* Step 3 */}
                <div className="relative">
                    <div className="absolute -left-12 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-neutral-900 text-white font-bold text-sm hidden md:flex">3</div>
                    <h3 className="text-2xl font-bold text-neutral-900 mb-4 flex items-center gap-3">
                        <Sparkles className="h-6 w-6 text-amber-500" />
                        Generate Roadmap
                    </h3>
                    <p className="text-neutral-600 mb-4">
                        Click "Generate" and watch the magic happen. CodeForge will analyze your skills against market standards and build a visual graph of what you need to learn next.
                    </p>
                </div>
            </div>

            <div className="mt-12 p-6 bg-blue-50 border border-blue-100 rounded-xl">
                <h4 className="text-blue-900 font-bold mb-2">What's Next?</h4>
                <p className="text-blue-800 mb-4">
                    Once your roadmap is ready, click on any node to start learning!
                </p>
                <Link href="/docs/roadmaps" className="text-blue-600 font-semibold hover:underline">
                    Learn about Roadmaps &rarr;
                </Link>
            </div>
        </div>
    )
}
