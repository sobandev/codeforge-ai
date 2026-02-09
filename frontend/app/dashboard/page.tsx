"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/utils/supabase/client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, Plus } from "lucide-react"
import { ProgressTracker } from "@/components/dashboard/progress-tracker"
import { ConnectGithub } from "@/components/dashboard/connect-github"
import { progressService } from "@/services/progress"

export default function DashboardPage() {
    const supabase = createClient()
    const [roadmaps, setRoadmaps] = useState<any[]>([])
    const [stats, setStats] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState<any>(null)

    useEffect(() => {
        const fetchData = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            setUser(user)

            if (user) {
                const { data: { session } } = await supabase.auth.getSession()
                const token = session?.access_token

                try {
                    // Fetch Roadmaps
                    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/roadmap/`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                    if (res.ok) {
                        const data = await res.json()
                        setRoadmaps(data)
                    }

                    // Fetch Stats
                    const statsData = await progressService.getUserStats()
                    setStats(statsData)

                } catch (error) {
                    console.error("Failed to fetch dashboard data", error)
                }
            }
            setLoading(false)
        }
        fetchData()
    }, [])

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-neutral-900">Dashboard</h1>
                    <p className="text-neutral-500 mt-1">
                        Welcome back! Here's your learning progress.
                    </p>
                </div>
                <Link href="/dashboard/roadmap">
                    <Button className="bg-amber-500 hover:bg-amber-600 text-white rounded-full px-6">
                        <Plus className="mr-2 h-4 w-4" />
                        New Roadmap
                    </Button>
                </Link>
            </div>

            <ProgressTracker
                stats={{
                    completedLessons: stats?.skills_mastered || 0,
                    streakDays: stats?.streak_days || 0,
                    activeRoadmaps: roadmaps.length,
                    totalXP: stats?.total_xp || 0,
                    weeklyProgress: stats?.weekly_completed || 0,
                    levelTitle: stats?.level_title,
                    streakMessage: stats?.message_streak
                }}
            />

            <div className="grid gap-8 md:grid-cols-3">
                <div className="md:col-span-2 space-y-4">
                    <h2 className="text-xl font-semibold text-neutral-900">Your Roadmaps</h2>
                    {/* Roadmaps List (Existing Code) */}
                    {loading ? (
                        <div className="grid gap-4 md:grid-cols-2">
                            {[1, 2].map((i) => (
                                <div key={i} className="h-40 rounded-xl bg-neutral-100 animate-pulse" />
                            ))}
                        </div>
                    ) : roadmaps.length > 0 ? (
                        <div className="grid gap-4 md:grid-cols-2">
                            {roadmaps.map((roadmap) => (
                                <Link href={`/dashboard/learn/${roadmap.id}`} key={roadmap.id}>
                                    <Card className="h-full hover:shadow-md transition-shadow cursor-pointer border-neutral-200 group">
                                        <CardHeader>
                                            <CardTitle className="text-lg group-hover:text-amber-600 transition-colors">
                                                {roadmap.title.replace("Roadmap to ", "")}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm text-neutral-500 line-clamp-2 mb-4">
                                                {roadmap.description}
                                            </p>
                                            <div className="flex items-center text-sm font-medium text-amber-600">
                                                Continue Learning <ArrowRight className="ml-1 h-4 w-4" />
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <Card className="border-dashed border-2 border-neutral-200 bg-neutral-50">
                            <CardContent className="flex flex-col items-center justify-center h-60 text-center">
                                <BookOpen className="h-10 w-10 text-neutral-300 mb-4" />
                                <h3 className="text-lg font-medium text-neutral-900">No roadmaps yet</h3>
                                <p className="text-sm text-neutral-500 max-w-sm mt-1 mb-6">
                                    Create your first AI-generated learning path to get started.
                                </p>
                                <Link href="/dashboard/roadmap">
                                    <Button variant="outline">Create Roadmap</Button>
                                </Link>
                            </CardContent>
                        </Card>
                    )}
                </div>

                <div className="space-y-6">
                    <ConnectGithub />
                    {/* Placeholder for Leaderboard Widget later */}
                </div>
            </div>
        </div>
    )
}
