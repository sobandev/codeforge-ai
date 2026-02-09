"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"

export function CTASection() {
    return (
        <section className="py-24 bg-neutral-950 relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3" />

            <div className="container mx-auto px-4 relative z-10 text-center">
                <div className="max-w-3xl mx-auto space-y-8">
                    <div className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/50 px-4 py-1.5 text-sm font-semibold text-amber-400 shadow-sm backdrop-blur-sm">
                        <Sparkles className="h-4 w-4" />
                        <span>Limited time launch offer</span>
                    </div>

                    <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                        Ready to accelerate your developer career?
                    </h2>

                    <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
                        Join thousands of developers who are learning smarter, not harder. Get your personalized roadmap today.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                        <Button size="lg" className="h-14 px-8 text-lg font-bold bg-amber-400 hover:bg-amber-500 text-neutral-950 rounded-xl transition-all hover:scale-105" asChild>
                            <Link href="/dashboard">
                                Get Started for Free
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
