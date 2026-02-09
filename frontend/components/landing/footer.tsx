import Link from "next/link"
import { Code2, Github, Twitter, Linkedin } from "lucide-react"

export function Footer() {
    return (
        <footer className="bg-neutral-50 border-t border-neutral-200 pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                    {/* Brand Column */}
                    <div className="col-span-2 md:col-span-1 space-y-4">
                        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-neutral-900">
                            <div className="bg-amber-400 p-1.5 rounded-lg">
                                <Code2 className="h-5 w-5 text-neutral-900" />
                            </div>
                            CodeForge
                        </Link>
                        <p className="text-sm text-neutral-500 leading-relaxed">
                            The intelligent way to master coding. AI-powered roadmaps tailored to your career goals.
                        </p>
                        <div className="flex gap-4">
                            <Link href="#" className="text-neutral-400 hover:text-neutral-900 transition-colors">
                                <Github className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-neutral-400 hover:text-neutral-900 transition-colors">
                                <Twitter className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-neutral-400 hover:text-neutral-900 transition-colors">
                                <Linkedin className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>

                    {/* Product */}
                    <div>
                        <h4 className="font-semibold text-neutral-900 mb-4">Product</h4>
                        <ul className="space-y-2 text-sm text-neutral-600">
                            <li><Link href="#features" className="hover:text-amber-600">Features</Link></li>
                            <li><Link href="#" className="hover:text-amber-600">Pricing</Link></li>
                            <li><Link href="#" className="hover:text-amber-600">Changelog</Link></li>
                            <li><Link href="#" className="hover:text-amber-600">Roadmap</Link></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="font-semibold text-neutral-900 mb-4">Resources</h4>
                        <ul className="space-y-2 text-sm text-neutral-600">
                            <li><Link href="/docs" className="hover:text-amber-600">Documentation</Link></li>
                            <li><Link href="#" className="hover:text-amber-600">Community</Link></li>
                            <li><Link href="#" className="hover:text-amber-600">Blog</Link></li>
                            <li><Link href="#" className="hover:text-amber-600">Help Center</Link></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="font-semibold text-neutral-900 mb-4">Legal</h4>
                        <ul className="space-y-2 text-sm text-neutral-600">
                            <li><Link href="/privacy" className="hover:text-amber-600">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-amber-600">Terms of Service</Link></li>
                            <li><Link href="/cookie-policy" className="hover:text-amber-600">Cookie Policy</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-neutral-200 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-neutral-500">
                    <p>&copy; {new Date().getFullYear()} CodeForge AI. All rights reserved.</p>
                    <div className="flex items-center gap-6">
                        <span>Made with ❤️ by CodeForge Team</span>
                    </div>
                </div>
            </div>
        </footer >
    )
}
