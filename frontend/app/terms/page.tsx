import { Footer } from "@/components/landing/footer"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function TermsOfService() {
    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="bg-neutral-50 border-b border-neutral-200 py-12">
                <div className="container mx-auto px-4">
                    <Link href="/" className="inline-flex items-center text-sm text-neutral-500 hover:text-neutral-900 mb-6 transition-colors">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Home
                    </Link>
                    <h1 className="text-4xl font-bold text-neutral-900 mb-4">Terms of Service</h1>
                    <p className="text-neutral-600">Last updated: February 8, 2026</p>
                </div>
            </header>

            {/* Content */}
            <main className="container mx-auto px-4 py-12 max-w-4xl">
                <div className="prose prose-neutral max-w-none">
                    <p className="lead text-xl text-neutral-600 mb-8">
                        Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the CodeForge AI website and application operated by CodeForge AI ("us", "we", or "our").
                    </p>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-neutral-900 mb-4">1. Acceptance of Terms</h2>
                        <p className="text-neutral-600">
                            By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-neutral-900 mb-4">2. Use License</h2>
                        <p className="mb-4 text-neutral-600">
                            Permission is granted to temporarily download one copy of the materials (information or software) on CodeForge AI's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-neutral-600">
                            <li>modify or copy the materials;</li>
                            <li>use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
                            <li>attempt to decompile or reverse engineer any software contained on CodeForge AI's website;</li>
                            <li>remove any copyright or other proprietary notations from the materials; or</li>
                            <li>transfer the materials to another person or "mirror" the materials on any other server.</li>
                        </ul>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-neutral-900 mb-4">3. User Accounts</h2>
                        <p className="text-neutral-600">
                            When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-neutral-900 mb-4">4. Intellectual Property</h2>
                        <p className="text-neutral-600">
                            The Service and its original content (excluding Content provided by users), features, and functionality are and will remain the exclusive property of CodeForge AI and its licensors.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-neutral-900 mb-4">5. Disclaimer</h2>
                        <p className="text-neutral-600">
                            Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, whether express or implied.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-neutral-900 mb-4">6. Changes</h2>
                        <p className="text-neutral-600">
                            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. What constitutes a material change will be determined at our sole discretion.
                        </p>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    )
}
