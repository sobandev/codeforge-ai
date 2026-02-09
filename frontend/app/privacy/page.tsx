import { Footer } from "@/components/landing/footer"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="bg-neutral-50 border-b border-neutral-200 py-12">
                <div className="container mx-auto px-4">
                    <Link href="/" className="inline-flex items-center text-sm text-neutral-500 hover:text-neutral-900 mb-6 transition-colors">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Home
                    </Link>
                    <h1 className="text-4xl font-bold text-neutral-900 mb-4">Privacy Policy</h1>
                    <p className="text-neutral-600">Last updated: February 8, 2026</p>
                </div>
            </header>

            {/* Content */}
            <main className="container mx-auto px-4 py-12 max-w-4xl">
                <div className="prose prose-neutral max-w-none">
                    <p className="lead text-xl text-neutral-600 mb-8">
                        At CodeForge AI, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclosure, and safeguard your information when you visit our website and use our application.
                    </p>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-neutral-900 mb-4">1. Information We Collect</h2>
                        <p className="mb-4 text-neutral-600">
                            We collect information that you provide directly to us when you register for an account, create or modify your profile, upload a resume, or communicate with us. This information may include:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-neutral-600">
                            <li><strong>Personal Data:</strong> Name, email address, and profile information.</li>
                            <li><strong>Usage Data:</strong> Information about how you use our platform, including learning progress and quiz scores.</li>
                            <li><strong>Uploaded Content:</strong> Resumes and other documents you upload for analysis.</li>
                        </ul>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-neutral-900 mb-4">2. How We Use Your Information</h2>
                        <p className="mb-4 text-neutral-600">
                            We use the information we collect to:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-neutral-600">
                            <li>Provide, maintain, and improve our services.</li>
                            <li>Personalize your learning experience and generate custom roadmaps.</li>
                            <li>Process transactions and send related information.</li>
                            <li>Monitor and analyze trends, usage, and activities in connection with our services.</li>
                        </ul>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-neutral-900 mb-4">3. Data Security</h2>
                        <p className="text-neutral-600">
                            We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or method of electronic storage is 100% secure.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-neutral-900 mb-4">4. Authentication Services</h2>
                        <p className="text-neutral-600">
                            We use Supabase for authentication and database services. When you sign in using third-party providers like Google or GitHub, we receive basic profile information to create your account. We do not have access to your passwords for these third-party accounts.
                        </p>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    )
}
