"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, BookOpen, Trophy, Code2, User, Settings } from "lucide-react"

const navItems = [
    { name: "Home", href: "/dashboard", icon: LayoutDashboard },
    { name: "My Roadmap", href: "/dashboard/roadmap", icon: BookOpen },
    { name: "Challenges", href: "/dashboard/challenges", icon: Code2 },
    { name: "Leaderboard", href: "/dashboard/leaderboard", icon: Trophy },
    { name: "Profile", href: "/dashboard/profile", icon: User },
]

export function MobileBottomNav() {
    const pathname = usePathname()

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-neutral-200 flex items-center justify-around z-50 px-2 pb-safe">
            {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${isActive ? "text-amber-600" : "text-neutral-500 hover:text-neutral-900"
                            }`}
                    >
                        <item.icon className={`h-5 w-5 ${isActive ? "fill-amber-100" : ""}`} />
                        <span className="text-[10px] font-medium truncate max-w-[64px]">{item.name}</span>
                    </Link>
                )
            })}
        </div>
    )
}
