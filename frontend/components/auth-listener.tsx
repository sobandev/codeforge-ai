"use client"

import { useEffect } from "react"
import { useAppDispatch } from "@/lib/hooks"
import { setUser, logout } from "@/lib/features/auth/authSlice"
import { clearRoadmaps } from "@/lib/features/roadmap/roadmapSlice"
import { createClient } from "@/utils/supabase/client"

export function AuthListener() {
    const dispatch = useAppDispatch()

    useEffect(() => {
        const supabase = createClient()

        // Check initial session
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            if (session) {
                dispatch(setUser({ user: session.user, token: session.access_token }))
            } else {
                dispatch(logout())
                dispatch(clearRoadmaps())
            }
        }
        checkSession()

        // Listen for changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || event === 'INITIAL_SESSION') {
                if (session) {
                    dispatch(setUser({ user: session.user, token: session.access_token }))
                }
            } else if (event === 'SIGNED_OUT') {
                dispatch(logout())
                dispatch(clearRoadmaps())
            }
        })

        return () => {
            subscription.unsubscribe()
        }
    }, [dispatch])

    return null
}
