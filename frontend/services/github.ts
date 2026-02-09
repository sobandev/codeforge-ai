import { createClient } from "@/utils/supabase/client"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

export const githubService = {
    async analyzeProfile(username: string) {
        const supabase = createClient()
        const { data: { session } } = await supabase.auth.getSession()
        const token = session?.access_token

        if (!token) throw new Error("Not authenticated")

        const res = await fetch(`${API_URL}/api/v1/github/analyze`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ username })
        })

        if (!res.ok) {
            const error = await res.json()
            throw new Error(error.detail || "Failed to analyze GitHub profile")
        }

        return res.json()
    }
}
