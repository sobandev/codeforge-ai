import { Footer } from "@/components/landing/footer"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function CookiePolicy() {
    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="bg-neutral-50 border-b border-neutral-200 py-12">
                <div className="container mx-auto px-4">
                    <Link href="/" className="inline-flex items-center text-sm text-neutral-500 hover:text-neutral-900 mb-6 transition-colors">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Home
                    </Link>
                    <h1 className="text-4xl font-bold text-neutral-900 mb-4">Cookie Policy</h1>
                    <p className="text-neutral-600">Last updated: February 8, 2026</p>
                </div>
            </header>

            {/* Content */}
            <main className="container mx-auto px-4 py-12 max-w-4xl">
                <div className="prose prose-neutral max-w-none">
                    <p className="lead text-xl text-neutral-600 mb-8">
                        CodeForge AI uses cookies to improve your experience on our site. This policy explains what cookies are, how we use them, and how you can control them.
                    </p>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-neutral-900 mb-4">What Are Cookies?</h2>
                        <p className="text-neutral-600">
                            Cookies are small text files that are placed on your computer or mobile device by websites that you visit. They are widely used in order to make websites work, or work more efficiently, as well as to provide information to the owners of the site.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-neutral-900 mb-4">How We Use Cookies</h2>
                        <p className="mb-4 text-neutral-600">
                            We use cookies for the following purposes:
                        </p>
                        <div className="space-y-6">
                            <div>
                                <h3 className="font-bold text-neutral-900 mb-2">Essential Cookies</h3>
                                <p className="text-neutral-600">
                                    These cookies are necessary for the website to function and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences, logging in, or filling in forms.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-bold text-neutral-900 mb-2">Performance Cookies</h3>
                                <p className="text-neutral-600">
                                    These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-bold text-neutral-900 mb-2">Functional Cookies</h3>
                                <p className="text-neutral-600">
                                    These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-neutral-900 mb-4">Managing Cookies</h2>
                        <p className="text-neutral-600">
                            Most web browsers allow some control of most cookies through the browser settings. To find out more about cookies, including how to see what cookies have been set, visit <a href="https://www.aboutcookies.org" className="text-amber-600 hover:underline">www.aboutcookies.org</a> or <a href="https://www.allaboutcookies.org" className="text-amber-600 hover:underline">www.allaboutcookies.org</a>.
                        </p>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    )
}
