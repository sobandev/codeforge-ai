"use client"

import { useState, ChangeEvent } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Sparkles } from "lucide-react"
import { RoadmapDisplay } from "./roadmap-display"
import { createClient } from "@/utils/supabase/client"

export function RoadmapGenerator() {
    const [goal, setGoal] = useState("")
    const [file, setFile] = useState<File | null>(null)
    const [loading, setLoading] = useState(false)
    const [roadmapData, setRoadmapData] = useState(null)

    const handleGenerate = async () => {
        if (!goal) return
        setLoading(true)
        setRoadmapData(null)

        try {
            const formData = new FormData()
            formData.append("goal", goal)
            formData.append("current_skills", "Beginner") // Still hardcoded for now, or extracted from resume
            if (file) {
                formData.append("file", file)
            }

            const supabase = createClient()
            const { data: { session } } = await supabase.auth.getSession()
            const token = session?.access_token

            if (!token) {
                throw new Error("Not authenticated")
            }

            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
            const response = await fetch(`${apiUrl}/api/v1/roadmap/generate`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData,
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.detail || "Failed to generate roadmap")
            }

            const data = await response.json()
            console.log("DEBUG: API Response Data:", data)
            setRoadmapData(data)
        } catch (error: any) {
            console.error("Error generating roadmap", error)
            alert(`Error: ${error.message}`)
        } finally {
            setLoading(false)
        }
    }

    return (
        <section className="relative w-full max-w-4xl mx-auto space-y-12 py-8">
            {/* Solar Card */}
            <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl">
                {/* Decorative Top Border */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-300 via-amber-500 to-amber-300"></div>

                <div className="relative p-8 md:p-12 space-y-8">
                    <div className="text-center space-y-3">
                        <div className="inline-flex items-center justify-center p-3 rounded-full bg-amber-100 mb-4 text-amber-600">
                            <Sparkles className="h-6 w-6" />
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-neutral-950">
                            Design Your Curriculum
                        </h2>
                        <p className="text-neutral-500 text-lg max-w-lg mx-auto">
                            Tell AI your dream role, adding your resume to skip what you already know.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="goal" className="text-sm font-semibold ml-1 text-neutral-700">Learning Goal</Label>
                            <Textarea
                                id="goal"
                                placeholder="I want to become a Senior React Developer focusing on performance..."
                                value={goal}
                                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setGoal(e.target.value)}
                                className="min-h-[120px] bg-white border-2 border-neutral-200 focus-visible:border-neutral-900 focus-visible:ring-0 text-lg p-4 rounded-xl resize-none transition-all placeholder:text-neutral-400"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="resume" className="text-sm font-semibold ml-1 text-neutral-700">
                                Upload Resume <span className="text-neutral-400 font-normal">(Optional, PDF)</span>
                            </Label>
                            <div className="relative group">
                                <input
                                    id="resume"
                                    type="file"
                                    accept=".pdf"
                                    className="hidden"
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        if (e.target.files && e.target.files[0]) {
                                            setFile(e.target.files[0])
                                        }
                                    }}
                                />
                                <label
                                    htmlFor="resume"
                                    className="flex items-center w-full h-14 px-2 bg-neutral-50 border-2 border-neutral-200 rounded-xl cursor-pointer hover:bg-white hover:border-neutral-400 transition-all"
                                >
                                    <div className="bg-neutral-900 text-white font-bold px-4 py-2 rounded-lg text-sm mr-4 shadow-sm">
                                        Choose File
                                    </div>
                                    <span className={file ? "text-neutral-900 font-medium" : "text-neutral-400"}>
                                        {file ? file.name : "No file chosen"}
                                    </span>
                                </label>
                            </div>
                        </div>

                        <Button
                            onClick={handleGenerate}
                            disabled={!goal || loading}
                            className="w-full h-14 text-lg font-bold rounded-xl bg-amber-400 hover:bg-amber-500 text-neutral-950 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    Constructing Roadmap...
                                </>
                            ) : (
                                "Generate Personalized Roadmap"
                            )}
                        </Button>
                    </div>
                </div>
            </div>

            {roadmapData && <RoadmapDisplay data={roadmapData} />}
        </section>
    )
}
