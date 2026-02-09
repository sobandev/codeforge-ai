"use client"

import { motion } from "framer-motion"
import { Upload, BrainCircuit, Rocket } from "lucide-react"

const steps = [
    {
        title: "Upload Your Resume",
        description: "Drop your PDF resume. Our AI analyzes your experience to find skill gaps.",
        icon: Upload,
    },
    {
        title: "Get Your Roadmap",
        description: "Receive a custom curriculum tailored exactly to what you need to learn next.",
        icon: BrainCircuit,
    },
    {
        title: "Start Mastering",
        description: "Follow the path, take quizzes, and track your progress to career success.",
        icon: Rocket,
    },
]

export function HowItWorks() {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-neutral-100/50 rounded-full blur-3xl -z-10" />

            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-neutral-950 sm:text-4xl mb-4">
                        How CodeForge Works
                    </h2>
                    <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                        From static resume to dynamic career growth in three simple steps.
                    </p>
                </div>

                <div className="relative grid gap-8 md:grid-cols-3">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-[2.5rem] left-0 w-full h-0.5 bg-neutral-100 -z-10 transform scale-x-90" />

                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className="relative flex flex-col items-center text-center p-6 bg-white rounded-2xl border border-neutral-100 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-amber-50 ring-8 ring-white mb-6 shadow-sm">
                                <step.icon className="h-10 w-10 text-amber-500" />
                            </div>
                            <h3 className="text-xl font-bold text-neutral-900 mb-2">{step.title}</h3>
                            <p className="text-neutral-500 leading-relaxed">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
