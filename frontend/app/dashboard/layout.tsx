"use client"

import { redirect, useRouter, usePathname } from "next/navigation"
import { LayoutDashboard, BookOpen, User, Settings, LogOut, Trophy, Code2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { createClient } from "@/utils/supabase/client"
import { useEffect, useState } from "react"
import { MobileBottomNav } from "@/components/dashboard/mobile-bottom-nav"

const navItems = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "My Roadmap", href: "/dashboard/roadmap", icon: BookOpen },
    { name: "Leaderboard", href: "/dashboard/leaderboard", icon: Trophy },
    { name: "Challenges", href: "/dashboard/challenges", icon: Code2 },
    { name: "Profile", href: "/dashboard/profile", icon: User },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const router = useRouter()
    const pathname = usePathname()
    const supabase = createClient()
    const [user, setUser] = useState<any>(null)

    useEffect(() => {
        const getUser = async () => {
            const { data: { user }, error } = await supabase.auth.getUser()
            if (error || !user) {
                router.push('/login')
            } else {
                setUser(user)
            }
        }
        getUser()
    }, [router, supabase])

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        router.push('/')
    }

    if (!user) return null // Or a loading spinner

    return (
        <div className="flex h-screen overflow-hidden bg-neutral-50">
            {/* Sidebar - Solar Clarity Theme */}
            <aside className="hidden w-72 bg-white border-r border-neutral-200 md:flex md:flex-col shadow-sm z-50">
                <div className="flex h-20 items-center px-8 border-b border-neutral-100">
                    <Link href="/" className="flex items-center gap-2.5 font-bold text-2xl tracking-tight text-neutral-950">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-400 text-white">
                            <span className="font-bold">C</span>
                        </div>
                        CodeForge
                    </Link>
                </div>
                <div className="flex-1 overflow-y-auto py-8">
                    <nav className="grid gap-2 px-4 text-sm font-medium">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all ${isActive
                                        ? "bg-amber-50 text-amber-900 font-semibold shadow-sm ring-1 ring-amber-100"
                                        : "text-neutral-600 font-medium hover:bg-neutral-50 hover:text-neutral-950"
                                        }`}
                                >
                                    <item.icon className={`h-5 w-5 ${isActive ? "text-amber-600" : "text-neutral-500"}`} />
                                    {item.name}
                                </Link>
                            )
                        })}
                    </nav>
                </div>
                <div className="border-t border-neutral-100 p-6 space-y-4">
                    {/* User Info */}
                    <div className="flex items-center gap-4 p-3 rounded-xl bg-neutral-50 border border-neutral-100">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-200 text-neutral-500">
                            <User className="h-5 w-5" />
                        </div>
                        <div className="flex flex-col overflow-hidden">
                            <span className="font-semibold text-neutral-900 truncate">User</span>
                            <span className="text-xs text-neutral-500 truncate">{user?.email}</span>
                        </div>
                    </div>
                    <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50" onClick={handleSignOut}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign Out
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto pb-16 md:pb-0">
                <div className="container py-6 px-4 md:px-8">
                    {children}
                </div>
            </main>

            <MobileBottomNav />
        </div>
    )
}
