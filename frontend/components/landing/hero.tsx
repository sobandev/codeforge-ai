"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, CheckCircle2, Zap, Trophy, Code2, Search } from "lucide-react"

export function Hero() {
    return (
        <section className="relative pt-20 pb-32 md:pt-32 md:pb-48 overflow-hidden bg-background">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* Left Column: Content */}
                    <div className="max-w-2xl relative z-10">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-sm font-semibold text-amber-800 shadow-sm mb-6"
                        >
                            <Zap className="h-4 w-4 fill-amber-500 text-amber-500" />
                            <span>AI-Powered Career Architect</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-4xl font-extrabold tracking-tight text-neutral-950 sm:text-6xl md:text-7xl mb-6 leading-[1.1]"
                        >
                            Your Career, <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">
                                Architected by AI.
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-lg text-neutral-600 mb-8 leading-relaxed max-w-lg"
                        >
                            Stop following generic tutorials. Upload your resume and get a custom roadmap that adapts to your pace, filling your specific skill gaps.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="flex flex-col gap-4 max-w-md"
                        >
                            <form action="/login" method="GET" className="relative flex items-center">
                                <Search className="absolute left-4 h-5 w-5 text-neutral-400" />
                                <input
                                    name="roadmap"
                                    type="text"
                                    placeholder="I want to become a..."
                                    className="h-14 w-full rounded-full border-2 border-neutral-200 bg-white pl-12 pr-36 text-lg outline-none focus:border-neutral-900 focus:ring-0 transition-all shadow-sm"
                                    required
                                />
                                <Button
                                    type="submit"
                                    size="lg"
                                    className="absolute right-1.5 top-1.5 h-11 px-6 rounded-full bg-neutral-900 text-white hover:bg-neutral-800 font-bold"
                                >
                                    Generate
                                </Button>
                            </form>
                            <div className="flex flex-wrap gap-2 text-sm text-neutral-500 pl-4">
                                <span>Try:</span>
                                <Link href="/login?roadmap=Full%20Stack%20Dev" className="hover:text-amber-600 underline decoration-dotted">Full Stack</Link>
                                <Link href="/login?roadmap=Python%20AI" className="hover:text-amber-600 underline decoration-dotted">Python AI</Link>
                                <Link href="/login?roadmap=Blockchain" className="hover:text-amber-600 underline decoration-dotted">Blockchain</Link>
                            </div>

                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="mt-8 flex items-center gap-4 text-sm text-neutral-500"
                        >
                            <div className="flex -space-x-2">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="h-8 w-8 rounded-full border-2 border-white bg-neutral-100 flex items-center justify-center text-xs font-bold text-neutral-400">
                                        {i === 4 ? '+' : ''}
                                    </div>
                                ))}
                            </div>
                            <p>Joined by 2,000+ developers this week</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className="mt-8 flex flex-col sm:flex-row gap-4"
                        >
                            <Button size="lg" className="h-14 px-8 text-lg font-bold bg-neutral-950 text-white hover:bg-neutral-800 rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5" asChild>
                                <Link href="/login">
                                    Get Started
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                            <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-semibold border-2 border-neutral-200 text-neutral-900 hover:border-neutral-900 rounded-full transition-all" asChild>
                                <Link href="#challenges">
                                    Explore Challenges
                                </Link>
                            </Button>
                        </motion.div>
                    </div>

                    {/* Right Column: Visual Composition */}
                    <div className="relative hidden lg:block h-[600px] w-full perspective-1000">
                        {/* Background Blob */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-amber-200/30 to-blue-200/30 rounded-full blur-3xl opacity-50 animate-pulse" />

                        {/* Floating Element 1: Code Snippet (Back Layer) */}
                        <motion.div
                            initial={{ opacity: 0, x: 20, y: -20, rotate: 6 }}
                            animate={{ opacity: 1, x: 0, y: 0, rotate: 6 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="absolute top-0 right-10 w-[300px] bg-neutral-900 rounded-xl shadow-2xl p-4 border border-neutral-800 z-0 opacity-90"
                        >
                            <div className="flex gap-1.5 mb-3">
                                <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
                                <div className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
                                <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
                            </div>
                            <div className="space-y-2 font-mono text-[10px] text-neutral-400">
                                <div className="flex"><span className="text-purple-400 mr-2">def</span> <span className="text-blue-400">analyze_gap</span>(user):</div>
                                <div className="pl-4 text-neutral-500"># AI Analysis Layer</div>
                                <div className="pl-4"><span className="text-purple-400">return</span> user.skills.diff(market)</div>
                            </div>
                        </motion.div>

                        {/* Main Element: Roadmap Card (Middle Layer) */}
                        <motion.div
                            initial={{ opacity: 0, y: 40, rotate: -3 }}
                            animate={{ opacity: 1, y: 0, rotate: -3 }}
                            transition={{ duration: 0.8, type: "spring" }}
                            className="absolute top-16 left-8 w-[420px] bg-white/80 backdrop-blur-xl border border-white/60 rounded-3xl shadow-2xl p-6 z-10"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-xl bg-amber-100 flex items-center justify-center">
                                        <Code2 className="h-5 w-5 text-amber-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-neutral-900">Full Stack Path</h3>
                                        <p className="text-xs text-neutral-500">Custom generated for you</p>
                                    </div>
                                </div>
                                <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded-full">Active</span>
                            </div>

                            {/* Node Visual */}
                            <div className="relative space-y-4 pl-4 border-l-2 border-neutral-100 ml-4 py-2">
                                <div className="relative">
                                    <div className="absolute -left-[21px] top-1 h-3 w-3 rounded-full bg-green-500 ring-4 ring-white" />
                                    <div className="bg-neutral-50 p-3 rounded-lg border border-neutral-100">
                                        <div className="text-xs font-bold text-neutral-700">React Fundamentals</div>
                                        <div className="text-[10px] text-neutral-400">Completed 2 days ago</div>
                                    </div>
                                </div>
                                <div className="relative">
                                    <div className="absolute -left-[21px] top-1 h-3 w-3 rounded-full bg-amber-500 ring-4 ring-white animate-pulse" />
                                    <div className="bg-amber-50 p-3 rounded-lg border border-amber-100 shadow-sm">
                                        <div className="flex justify-between">
                                            <div className="text-xs font-bold text-amber-900">Next.js Server Actions</div>
                                            <span className="text-[10px] font-bold bg-amber-200 text-amber-800 px-1.5 rounded">Current</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-amber-200/50 rounded-full mt-2 overflow-hidden">
                                            <div className="h-full w-3/4 bg-amber-500 rounded-full" />
                                        </div>
                                    </div>
                                </div>
                                <div className="relative opacity-50">
                                    <div className="absolute -left-[21px] top-1 h-3 w-3 rounded-full bg-neutral-200 ring-4 ring-white" />
                                    <div className="bg-neutral-50 p-3 rounded-lg border border-neutral-100">
                                        <div className="text-xs font-bold text-neutral-700">PostgreSQL Optimization</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Floating Element 3: Success Badge (Front Layer) */}
                        <motion.div
                            initial={{ opacity: 0, x: 40, y: 20 }}
                            animate={{ opacity: 1, x: 0, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
                            className="absolute bottom-28 right-0 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-2xl p-4 z-20 border border-neutral-100 flex items-center gap-4 max-w-[260px]"
                        >
                            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-yellow-100 to-amber-100 flex items-center justify-center p-2">
                                <Trophy className="h-6 w-6 text-amber-600" />
                            </div>
                            <div>
                                <p className="font-bold text-neutral-900 text-sm">Top 5% Learner</p>
                                <p className="text-xs text-neutral-500">Badge Earned</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}
