"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Calendar, Rocket, Code, Users } from "lucide-react"

const roadmap = [
    {
        quarter: "Q3 2026",
        title: "AI Mock Interviews",
        description: "Practice technical interviews with our voice-enabled AI agent.",
        status: "In Progress",
        icon: Users,
    },
    {
        quarter: "Q4 2026",
        title: "IDE Extensions",
        description: "Get real-time feedback directly in VS Code and IntelliJ.",
        status: "Planned",
        icon: Code,
    },
    {
        quarter: "2027",
        title: "Team Workspaces",
        description: "Collaborate on learning paths with your engineering team.",
        status: "Researching",
        icon: Users,
    },
]

export function FuturePlans() {
    return (
        <section className="py-24 bg-neutral-950 text-white relative isolate overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                        Building the Future of EdTech
                    </h2>
                    <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
                        We&apos;re just getting started. Here&apos;s what&apos;s coming next to CodeForge.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="grid gap-8 md:grid-cols-3">
                        {roadmap.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="relative p-6 rounded-2xl border border-neutral-800 bg-neutral-900/50 backdrop-blur-sm shadow-xl"
                            >
                                <div className="absolute -top-3 left-6">
                                    <Badge variant="secondary" className="bg-amber-500/10 text-amber-400 border-amber-500/20 hover:bg-amber-500/20">
                                        {item.status}
                                    </Badge>
                                </div>
                                <div className="mt-4 mb-4 h-12 w-12 rounded-lg bg-neutral-800 flex items-center justify-center">
                                    <item.icon className="h-6 w-6 text-neutral-300" />
                                </div>
                                <div className="text-sm font-semibold text-amber-500 mb-2">{item.quarter}</div>
                                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                                <p className="text-neutral-400 text-sm leading-relaxed">
                                    {item.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
