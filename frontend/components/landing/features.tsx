"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { BrainCircuit, Target, Code, BarChart3 } from "lucide-react"
import { motion } from "framer-motion"

const features = [
    {
        title: "Resume-Based Roadmaps",
        description: "Upload your PDF resume and let our AI analyze your skills to generate a custom learning path that fills your knowledge gaps.",
        icon: BrainCircuit,
    },
    {
        title: "AI Learning Studio",
        description: "Dive into personalized lessons generated on the fly. No generic tutorials—just the content you need, when you need it.",
        icon: Code,
    },
    {
        title: "Adaptive Quizzes",
        description: "Test your knowledge with AI-generated quizzes that scale difficulty based on your performance.",
        icon: Target,
    },
    {
        title: "Progress Analytics",
        description: "Track your growth with detailed dashboards. Earn badges for mastering skills like React, Python, and more.",
        icon: BarChart3,
    },
]

export function Features() {
    return (
        <section id="features" className="py-24 bg-neutral-50/50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                        Everything you need to master code
                    </h2>
                    <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                        CodeForge AI combines the best of personal tutoring with the scale of an online platform.
                    </p>
                </div>

                <div className="grid gap-4 md:grid-cols-4 md:grid-rows-2">
                    {/* Feature 1: Large Span */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="md:col-span-2 md:row-span-2 relative overflow-hidden rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm hover:shadow-md transition-shadow"
                    >
                        <div className="relative z-10">
                            <div className="h-12 w-12 rounded-xl bg-amber-100 flex items-center justify-center mb-6">
                                <BrainCircuit className="h-6 w-6 text-amber-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-neutral-900 mb-2">Resume-Based Roadmaps</h3>
                            <p className="text-neutral-500 leading-relaxed">
                                Upload your PDF resume and let our AI analyze your skills to generate a custom learning path that fills your knowledge gaps. No more learning what you already know.
                            </p>
                        </div>
                        <div className="absolute right-0 bottom-0 w-2/3 h-2/3 bg-gradient-to-tl from-amber-50 to-transparent rounded-tl-full opacity-50" />
                    </motion.div>

                    {/* Feature 2: Tall Span */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        viewport={{ once: true }}
                        className="md:col-span-1 md:row-span-2 relative overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-900 p-8 shadow-sm flex flex-col justify-between"
                    >
                        <div>
                            <div className="h-12 w-12 rounded-xl bg-neutral-800 flex items-center justify-center mb-6">
                                <Code className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">AI Studio</h3>
                            <p className="text-neutral-400 text-sm">
                                Personalized lessons generated on the fly.
                            </p>
                        </div>
                        <div className="mt-8 space-y-2">
                            <div className="h-2 w-full bg-neutral-800 rounded-full overflow-hidden">
                                <div className="h-full w-2/3 bg-blue-500 rounded-full"></div>
                            </div>
                            <div className="h-2 w-full bg-neutral-800 rounded-full overflow-hidden">
                                <div className="h-full w-1/2 bg-purple-500 rounded-full"></div>
                            </div>
                            <div className="h-2 w-full bg-neutral-800 rounded-full overflow-hidden">
                                <div className="h-full w-3/4 bg-green-500 rounded-full"></div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Feature 3: Small Span */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                        className="md:col-span-1 md:row-span-1 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
                    >
                        <Target className="h-8 w-8 text-red-500 mb-4" />
                        <h3 className="text-lg font-bold text-neutral-900">Adaptive Quizzes</h3>
                        <p className="text-sm text-neutral-500 mt-2">Difficulty scales with you.</p>
                    </motion.div>

                    {/* Feature 4: Small Span */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        viewport={{ once: true }}
                        className="md:col-span-1 md:row-span-1 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
                    >
                        <BarChart3 className="h-8 w-8 text-green-500 mb-4" />
                        <h3 className="text-lg font-bold text-neutral-900">Analytics</h3>
                        <p className="text-sm text-neutral-500 mt-2">Track real progress.</p>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
