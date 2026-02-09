import { createClient } from "@/utils/supabase/client"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const challengesService = {
    async getChallenges() {
        const supabase = createClient()
        const { data: { session } } = await supabase.auth.getSession()
        const token = session?.access_token

        const res = await fetch(`${API_URL}/api/v1/challenges/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if (!res.ok) throw new Error("Failed to fetch challenges")
        return res.json()
    },

    async getChallengeById(id: string) {
        const supabase = createClient()
        const { data: { session } } = await supabase.auth.getSession()
        const token = session?.access_token

        const res = await fetch(`${API_URL}/api/v1/challenges/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if (!res.ok) throw new Error("Failed to fetch challenge")
        return res.json()
    },

    async verifySolution(challengeId: string, code: string, language: string) {
        const supabase = createClient()
        const { data: { session } } = await supabase.auth.getSession()
        const token = session?.access_token

        const res = await fetch(`${API_URL}/api/v1/challenges/verify`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                challenge_id: challengeId,
                code,
                language
            })
        })
        if (!res.ok) throw new Error("Verification failed")
        return res.json()
    }
}
