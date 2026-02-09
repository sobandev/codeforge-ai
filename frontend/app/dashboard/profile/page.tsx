"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/utils/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarDays, Map, Terminal, Trophy, BookOpen } from "lucide-react"
import Link from "next/link"

export default function ProfilePage() {
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [stats, setStats] = useState({
        items_created: 0,
        lessons_completed: 0,
        skills_mastered: 0,
        code_challenges: 0,
        recent_activity: [] as any[],
        badges: [] as string[]
    })

    useEffect(() => {
        const fetchData = async () => {
            const supabase = createClient()
            const { data: { user } } = await supabase.auth.getUser()

            if (user) {
                setUser(user)
                // Fetch stats
                try {
                    const token = (await supabase.auth.getSession()).data.session?.access_token
                    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
                    const res = await fetch(`${apiUrl}/api/v1/user/stats`, {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                    if (res.ok) {
                        const data = await res.json()
                        setStats(data)
                    }
                } catch (e) {
                    console.error("Failed to fetch stats", e)
                }
            }
            setLoading(false)
        }
        fetchData()
    }, [])

    if (loading) {
        return (
            <div className="flex items-center justify-center p-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
            </div>
        )
    }

    if (!user) {
        return <div className="p-8 text-center text-neutral-500">Please log in to view your profile.</div>
    }

    const displayStats = [
        { label: "Roadmaps Created", value: stats.items_created.toString(), icon: Map },
        { label: "Lessons Completed", value: stats.lessons_completed.toString(), icon: BookOpen },
        { label: "Skills Mastered", value: stats.skills_mastered.toString(), icon: Trophy },
        { label: "Code Challenges", value: stats.code_challenges.toString(), icon: Terminal },
    ]

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight text-neutral-950">My Profile</h1>
                <p className="text-neutral-500">Manage your account and view your learning progress.</p>
            </div>

            {/* User Info Card */}
            <div className="grid gap-6 md:grid-cols-2">
                <Card className="border-neutral-200 shadow-sm bg-white overflow-hidden">
                    <div className="h-32 bg-gradient-to-r from-amber-400 to-orange-400"></div>
                    <CardContent className="relative pt-0 px-6 pb-6">
                        <Avatar className="h-24 w-24 border-4 border-white absolute -top-12">
                            <AvatarImage src="" />
                            <AvatarFallback className="bg-neutral-100 text-neutral-500 text-2xl font-bold">
                                {user.email?.charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <div className="mt-14 space-y-1">
                            <h2 className="text-2xl font-bold text-neutral-900">User</h2>
                            <p className="text-neutral-500">{user.email}</p>
                            <div className="flex items-center gap-2 text-sm text-neutral-400 pt-2">
                                <CalendarDays className="h-4 w-4" />
                                <span>Joined February 2026</span>
                            </div>
                        </div>
                        <div className="mt-6 flex flex-wrap gap-2">
                            {stats.badges && stats.badges.length > 0 ? (
                                stats.badges.map((badge, i) => (
                                    <Badge key={i} variant="secondary" className="bg-amber-100 text-amber-800 hover:bg-amber-200">
                                        {badge}
                                    </Badge>
                                ))
                            ) : (
                                <Badge variant="secondary" className="bg-neutral-100 text-neutral-600">New Member</Badge>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Achievement Stats */}
                <div className="grid grid-cols-2 gap-4">
                    {displayStats.map((stat, index) => (
                        <Card key={index} className="border-neutral-200 shadow-sm hover:shadow-md transition-shadow">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-neutral-500">
                                    {stat.label}
                                </CardTitle>
                                <stat.icon className="h-4 w-4 text-amber-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-neutral-900">{stat.value}</div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Current Focus */}
            <Card className="border-neutral-200 shadow-sm">
                <CardHeader>
                    <CardTitle>Current Learning Focus</CardTitle>
                    <CardDescription>Your active roadmaps and recent activity.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {stats.recent_activity && stats.recent_activity.length > 0 ? (
                            stats.recent_activity.map((roadmap) => (
                                <div key={roadmap.id} className="flex items-center justify-between p-4 rounded-xl border border-neutral-100 bg-neutral-50">
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                                            <Map className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-neutral-900">{roadmap.title}</h4>
                                            <p className="text-sm text-neutral-500">
                                                {roadmap.progress}% Completed
                                                <span className="text-neutral-300 mx-2">•</span>
                                                {roadmap.completed_topics}/{roadmap.total_topics} Lessons
                                            </p>
                                        </div>
                                    </div>
                                    <Link href={`/dashboard/learn/${roadmap.id}`}>
                                        <Button variant="outline" className="border-neutral-200">Continue</Button>
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8 text-neutral-500">
                                <p>No active roadmaps yet.</p>
                                <Link href="/dashboard">
                                    <Button variant="link" className="text-amber-600">Create one now</Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

