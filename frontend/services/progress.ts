import { createClient } from "@/utils/supabase/client"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

export const progressService = {
    async updateProgress(roadmapId: number, moduleIndex: number, topicIndex: number, isCompleted: boolean) {
        const supabase = createClient()
        const { data: { session } } = await supabase.auth.getSession()
        const token = session?.access_token

        if (!token) throw new Error("Not authenticated")

        const res = await fetch(`${API_URL}/api/v1/learning/progress`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                roadmap_id: roadmapId,
                module_index: moduleIndex,
                topic_index: topicIndex,
                is_completed: isCompleted
            })
        })

        if (!res.ok) {
            throw new Error("Failed to update progress")
        }

        return res.json()
    },

    async getRoadmapProgress(roadmapId: number) {
        const supabase = createClient()
        const { data: { session } } = await supabase.auth.getSession()
        const token = session?.access_token

        if (!token) throw new Error("Not authenticated")

        const res = await fetch(`${API_URL}/api/v1/learning/progress/${roadmapId}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })

        if (!res.ok) {
            throw new Error("Failed to fetch progress")
        }

        return res.json()
    },

    async getUserStats() {
        const supabase = createClient()
        const { data: { session } } = await supabase.auth.getSession()
        const token = session?.access_token

        if (!token) throw new Error("Not authenticated")

        const res = await fetch(`${API_URL}/api/v1/user/stats`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })

        if (!res.ok) {
            throw new Error("Failed to fetch user stats")
        }

        return res.json()
    }
}
