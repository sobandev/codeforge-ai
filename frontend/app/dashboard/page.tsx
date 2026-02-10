"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, Plus, Sparkles } from "lucide-react"
import { ProgressTracker } from "@/components/dashboard/progress-tracker"
import { ConnectGithub } from "@/components/dashboard/connect-github"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { fetchUserSession } from "@/lib/features/auth/authSlice"
import { fetchRoadmaps, fetchUserStats } from "@/lib/features/roadmap/roadmapSlice"
import { progressService } from "@/services/progress"

export default function DashboardPage() {
    const dispatch = useAppDispatch()
    const { user, loading: authLoading } = useAppSelector((state) => state.auth)
    const { list: roadmaps, loading: roadmapLoading, stats } = useAppSelector((state) => state.roadmap)

    // Combined loading state
    const loading = authLoading || roadmapLoading

    // Cold Start Logic
    const [showColdStartMessage, setShowColdStartMessage] = useState(false)

    useEffect(() => {
        // Cold Start Timer
        const timer = setTimeout(() => {
            setShowColdStartMessage(true)
        }, 3000)

        const init = async () => {
            // 1. Fetch Session (Auth Slice)
            const sessionAction = await dispatch(fetchUserSession())

            // 2. If Session exists, fetch Roadmaps & Stats (Roadmap Slice)
            if (fetchUserSession.fulfilled.match(sessionAction) && sessionAction.payload) {
                const token = sessionAction.payload.token
                // We could dispatch these in parallel
                dispatch(fetchRoadmaps(token))
                dispatch(fetchUserStats())
            }
        }
        init()

        return () => clearTimeout(timer)
    }, [dispatch])

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

                    {/* Cold Start Message */}
                    {loading && showColdStartMessage && (
                        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-center gap-3 text-amber-800 animate-in fade-in slide-in-from-top-2">
                            <div className="h-4 w-4 border-2 border-amber-600 border-t-transparent rounded-full animate-spin" />
                            <div>
                                <p className="font-semibold text-sm">Waking up the server...</p>
                                <p className="text-xs opacity-90">First request after inactivity can take up to 60s.</p>
                            </div>
                        </div>
                    )}

                    {/* Roadmaps List */}
                    {loading ? (
                        <div className="grid gap-4 md:grid-cols-2">
                            {[1, 2].map((i) => (
                                <div key={i} className="h-40 rounded-xl bg-neutral-100 animate-pulse" />
                            ))}
                        </div>
                    ) : roadmaps.length > 0 ? (
                        <div className="grid gap-4 md:grid-cols-2">
                            {roadmaps.map((roadmap: any) => (
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
                        <Card className="border-2 border-neutral-100 bg-white shadow-sm hover:shadow-md transition-all">
                            <CardContent className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                                <div className="h-16 w-16 bg-amber-100 rounded-full flex items-center justify-center mb-2">
                                    <Sparkles className="h-8 w-8 text-amber-500" />
                                </div>
                                <h3 className="text-xl font-bold text-neutral-900">Your Journey Starts Here</h3>
                                <p className="text-neutral-500 max-w-sm">
                                    You haven't created any roadmaps yet. Let AI design a custom curriculum just for you.
                                </p>
                                <Link href="/dashboard/roadmap">
                                    <Button className="mt-4 bg-amber-400 text-neutral-950 font-bold hover:bg-amber-500 rounded-full px-8 h-12">
                                        <Plus className="mr-2 h-5 w-5" /> Create First Roadmap
                                    </Button>
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
