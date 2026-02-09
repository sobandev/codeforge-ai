import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Flame, Target, CircleDashed } from "lucide-react"

interface ProgressStats {
    completedLessons: number
    streakDays: number
    activeRoadmaps: number
    totalXP: number
}

export function ProgressTracker({ stats }: { stats: ProgressStats }) {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-neutral-200 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-neutral-600">
                        Skills Mastered
                    </CardTitle>
                    <Trophy className="h-4 w-4 text-amber-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-neutral-900">{stats.completedLessons}</div>
                    <p className="text-xs text-neutral-500">
                        +2 this week
                    </p>
                </CardContent>
            </Card>

            <Card className="border-neutral-200 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-neutral-600">
                        Day Streak
                    </CardTitle>
                    <Flame className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-neutral-900">{stats.streakDays}</div>
                    <p className="text-xs text-neutral-500">
                        Keep it up!
                    </p>
                </CardContent>
            </Card>

            <Card className="border-neutral-200 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-neutral-600">
                        Total XP
                    </CardTitle>
                    <Target className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-neutral-900">{stats.totalXP}</div>
                    <p className="text-xs text-neutral-500">
                        Lvl 5 Developer
                    </p>
                </CardContent>
            </Card>

            <Card className="border-neutral-200 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-neutral-600">
                        Active Goals
                    </CardTitle>
                    <CircleDashed className="h-4 w-4 text-green-500 animate-spin-slow" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-neutral-900">{stats.activeRoadmaps}</div>
                    <p className="text-xs text-neutral-500">
                        Roadmaps in progress
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}
