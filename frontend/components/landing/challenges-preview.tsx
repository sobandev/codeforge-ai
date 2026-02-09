"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Code2, ArrowRight, Zap, Terminal } from "lucide-react"
import Link from "next/link"

const PREVIEW_CHALLENGES = [
    {
        title: "Two Sum",
        difficulty: "Medium",
        xp: 100,
        description: "Given an array of integers, return indices of the two numbers such that they add up to a specific target.",
        code: "def twoSum(nums, target):\n  seen = {}\n  for i, num in enumerate(nums):\n    if target - num in seen:\n      return [seen[target - num], i]\n    seen[num] = i"
    },
    {
        title: "Reverse String",
        difficulty: "Easy",
        xp: 50,
        description: "Write a function that takes a string as input and returns the string reversed.",
        code: "def reverseString(s):\n  return s[::-1]"
    },
    {
        title: "Valid Parentheses",
        difficulty: "Hard",
        xp: 150,
        description: "Determine if the input string has valid matching parentheses order.",
        code: "def isValid(s):\n  stack = []\n  map = {')':'(', '}':'{', ']':'['}\n  for char in s:\n    if char in map:\n      if not stack or stack.pop() != map[char]:\n        return False\n    else:\n      stack.append(char)\n  return not stack"
    }
]

export function ChallengesPreview() {
    return (
        <section id="challenges" className="py-24 bg-neutral-950 text-white overflow-hidden relative">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-amber-500/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-500/30 rounded-full blur-3xl animate-pulse" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/50 px-4 py-1.5 text-sm font-semibold text-amber-500 mb-6"
                    >
                        <Terminal className="h-4 w-4" />
                        <span>Practice Mode</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
                    >
                        Master Skills with <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                            AI-Verified Challenges
                        </span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-neutral-400"
                    >
                        Don't just watch tutorials. Write code that gets graded by our AI engine instantly. Receive feedback, fix bugs, and earn XP.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {PREVIEW_CHALLENGES.map((challenge, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 + 0.3 }}
                            className="h-full"
                        >
                            <Card className="h-full flex flex-col bg-neutral-900 border-neutral-800 overflow-hidden hover:border-amber-500/50 transition-colors group">
                                <CardContent className="p-6 flex-1 flex flex-col">
                                    <div className="flex justify-between items-start mb-4">
                                        <Badge variant="outline" className={`
                                            border-neutral-700 
                                            ${challenge.difficulty === 'Easy' ? 'text-green-400' :
                                                challenge.difficulty === 'Medium' ? 'text-amber-400' : 'text-red-400'}
                                        `}>
                                            {challenge.difficulty}
                                        </Badge>
                                        <div className="flex items-center text-amber-500 text-xs font-bold">
                                            <Zap className="h-3 w-3 mr-1" />
                                            {challenge.xp} XP
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold mb-2 flex items-center gap-2 text-neutral-100">
                                        <Code2 className="h-5 w-5 text-neutral-500" />
                                        {challenge.title}
                                    </h3>

                                    <p className="text-neutral-400 text-sm mb-6 h-10 line-clamp-2">
                                        {challenge.description}
                                    </p>

                                    {/* Code Snippet */}
                                    <div className="bg-black rounded-lg p-3 font-mono text-xs text-neutral-300 mb-6 border border-neutral-800 group-hover:border-neutral-700 transition-colors h-32 overflow-hidden relative">
                                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 pointer-events-none" />
                                        <pre>
                                            <code>{challenge.code}</code>
                                        </pre>
                                    </div>

                                    <Button className="w-full bg-neutral-100 text-neutral-900 hover:bg-white font-bold mt-auto" asChild>
                                        <Link href="/login">
                                            Solve Challenge <ArrowRight className="ml-2 h-4 w-4" />
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
