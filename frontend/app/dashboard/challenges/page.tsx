"use client"

import { useEffect, useState } from "react"
import { challengesService } from "@/services/challenges"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Code2, Zap } from "lucide-react"
import Link from "next/link"

export default function ChallengesPage() {
    const [challenges, setChallenges] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchChallenges = async () => {
            try {
                const data = await challengesService.getChallenges()
                setChallenges(data)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        fetchChallenges()
    }, [])

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-neutral-900">Coding Challenges</h1>
                <p className="text-neutral-500 mt-1">
                    Practice your skills with AI-verified coding problems.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {loading ? (
                    [...Array(3)].map((_, i) => (
                        <div key={i} className="h-48 rounded-xl bg-neutral-100 animate-pulse" />
                    ))
                ) : (
                    challenges.map((challenge) => (
                        <Card key={challenge.id} className="flex flex-col hover:shadow-md transition-all border-neutral-200">
                            <CardHeader>
                                <div className="flex justify-between items-start mb-2">
                                    <Badge variant="outline" className={`
                                        ${challenge.difficulty === "Easy" ? "text-green-600 bg-green-50 border-green-200" :
                                            challenge.difficulty === "Medium" ? "text-amber-600 bg-amber-50 border-amber-200" :
                                                "text-red-600 bg-red-50 border-red-200"}
                                    `}>
                                        {challenge.difficulty}
                                    </Badge>
                                    <div className="flex items-center text-xs font-semibold text-amber-600">
                                        <Zap className="h-3 w-3 mr-1" />
                                        {challenge.xp} XP
                                    </div>
                                </div>
                                <CardTitle className="flex items-center gap-2">
                                    <Code2 className="h-5 w-5 text-neutral-400" />
                                    {challenge.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="flex-1 flex flex-col justify-between">
                                <p className="text-sm text-neutral-500 line-clamp-2 mb-6">
                                    {challenge.description}
                                </p>
                                <Link href={`/dashboard/challenges/${challenge.id}`} className="w-full">
                                    <Button className="w-full bg-neutral-900 hover:bg-neutral-800 text-white">
                                        Solve Challenge <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    )
}
