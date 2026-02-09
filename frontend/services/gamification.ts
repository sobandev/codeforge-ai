import { createClient } from "@/utils/supabase/client"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const gamificationService = {
    async getLeaderboard() {
        // Leaderboard is public, no auth header needed strictly, 
        // but good practice to have if we want to highlight "current user" later.
        // For now, let's make it public.

        const res = await fetch(`${API_URL}/api/v1/gamification/leaderboard`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })

        if (!res.ok) {
            throw new Error("Failed to fetch leaderboard")
        }

        return res.json()
    }
}
