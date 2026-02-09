"use client"

import { useEffect, useState } from "react"
import { gamificationService } from "@/services/gamification"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Trophy, Medal, Crown } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function LeaderboardPage() {
    const [leaderboard, setLeaderboard] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const data = await gamificationService.getLeaderboard()
                setLeaderboard(data)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        fetchLeaderboard()
    }, [])

    const getRankIcon = (rank: number) => {
        if (rank === 1) return <Crown className="h-6 w-6 text-yellow-500 fill-yellow-500" />
        if (rank === 2) return <Medal className="h-6 w-6 text-slate-400 fill-slate-400" />
        if (rank === 3) return <Medal className="h-6 w-6 text-amber-700 fill-amber-700" />
        return <span className="font-bold text-neutral-500 w-6 text-center">{rank}</span>
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-neutral-900 flex items-center justify-center gap-3">
                    <Trophy className="h-8 w-8 text-amber-500" />
                    Global Leaderboard
                </h1>
                <p className="text-neutral-500 mt-2">
                    Top developers on CodeForge this week.
                </p>
            </div>

            <Card className="border-neutral-200 shadow-sm overflow-hidden">
                <div className="bg-neutral-50 border-b border-neutral-200 p-4 grid grid-cols-12 text-sm font-medium text-neutral-500">
                    <div className="col-span-1 text-center">Rank</div>
                    <div className="col-span-6 md:col-span-7 pl-4">User</div>
                    <div className="col-span-3 text-right">XP</div>
                    <div className="col-span-2 md:col-span-1 text-center hidden md:block">Badges</div>
                </div>

                <div className="divide-y divide-neutral-100">
                    {loading ? (
                        [...Array(5)].map((_, i) => (
                            <div key={i} className="p-4 grid grid-cols-12 items-center animate-pulse">
                                <div className="col-span-1 flex justify-center"><div className="h-6 w-6 bg-neutral-200 rounded-full" /></div>
                                <div className="col-span-7 pl-4"><div className="h-4 w-32 bg-neutral-200 rounded" /></div>
                            </div>
                        ))
                    ) : leaderboard.length > 0 ? (
                        leaderboard.map((user) => (
                            <div key={user.rank} className={`p-4 grid grid-cols-12 items-center hover:bg-neutral-50/50 transition-colors ${user.rank <= 3 ? "bg-gradient-to-r from-amber-50/30 to-transparent" : ""}`}>
                                <div className="col-span-1 flex justify-center">
                                    {getRankIcon(user.rank)}
                                </div>
                                <div className="col-span-6 md:col-span-7 pl-4 flex items-center gap-3">
                                    <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold text-white
                                        ${user.rank === 1 ? "bg-yellow-500" :
                                            user.rank === 2 ? "bg-slate-400" :
                                                user.rank === 3 ? "bg-amber-700" : "bg-neutral-400"
                                        }
                                    `}>
                                        {user.username.charAt(0).toUpperCase()}
                                    </div>
                                    <span className={`font-semibold ${user.rank <= 3 ? "text-neutral-900" : "text-neutral-700"}`}>
                                        {user.username}
                                    </span>
                                </div>
                                <div className="col-span-3 text-right font-mono font-bold text-amber-600">
                                    {user.total_xp.toLocaleString()} XP
                                </div>
                                <div className="col-span-2 md:col-span-1 hidden md:flex justify-center gap-1">
                                    {user.badges.map((badge: string) => (
                                        <Badge key={badge} variant="outline" className="text-[10px] h-5 px-1.5 border-amber-200 text-amber-700 bg-amber-50">
                                            {badge}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-8 text-center text-neutral-500">
                            No active users yet. Be the first!
                        </div>
                    )}
                </div>
            </Card>
        </div>
    )
}
