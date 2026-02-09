"use client"

import { useState, useEffect, useRef } from "react"
import { useParams } from "next/navigation" // Correct import for App Router
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CheckCircle2, Circle, ChevronRight, BookOpen, Menu, Loader2 } from "lucide-react"
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"
import { cn } from "@/lib/utils"
import { createClient } from "@/utils/supabase/client"

export default function LearningStudio() {
    const params = useParams()
    const roadmapId = params.roadmapId

    const [roadmap, setRoadmap] = useState<any>(null)
    const [activeModuleIndex, setActiveModuleIndex] = useState(0)
    const [activeTopicIndex, setActiveTopicIndex] = useState(0)
    const [lessonContent, setLessonContent] = useState<any>(null)
    const [loading, setLoading] = useState(false)
    const [sidebarOpen, setSidebarOpen] = useState(true)

    // Lesson Cache
    const lessonCache = useRef<Map<string, any>>(new Map())

    // Progress State
    const [completedTopics, setCompletedTopics] = useState<Set<string>>(new Set())

    // Fetch Roadmap and Progress on Mount
    useEffect(() => {
        if (roadmapId) {
            // Fetch Roadmap
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
            fetch(`${apiUrl}/api/v1/roadmap/${roadmapId}`)
                .then(res => res.json())
                .then(data => setRoadmap(data))
                .catch(err => console.error("Failed to fetch roadmap:", err))

            // Fetch Progress
            fetchProgress()
        }
    }, [roadmapId])

    const fetchProgress = async () => {
        const supabase = createClient()
        const { data: { session } } = await supabase.auth.getSession()
        const token = session?.access_token

        if (!token) return

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
            const res = await fetch(`${apiUrl}/api/v1/learning/progress/${roadmapId}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            const data = await res.json()
            // data is array of TopicProgress objects
            const completed = new Set<string>()
            data.forEach((p: any) => {
                if (p.is_completed) {
                    completed.add(`${p.module_index}-${p.topic_index}`)
                }
            })
            setCompletedTopics(completed)
        } catch (error) {
            console.error("Failed to fetch progress", error)
        }
    }

    const handleComplete = async () => {
        const supabase = createClient()
        const { data: { session } } = await supabase.auth.getSession()
        const token = session?.access_token

        if (!token) return

        const topicKey = `${activeModuleIndex}-${activeTopicIndex}`
        const isCompleted = completedTopics.has(topicKey)
        const newStatus = !isCompleted // Toggle

        // Optimistic Update
        const newSet = new Set(completedTopics)
        if (newStatus) newSet.add(topicKey)
        else newSet.delete(topicKey)
        setCompletedTopics(newSet)

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
            await fetch(`${apiUrl}/api/v1/learning/progress`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    roadmap_id: parseInt(roadmapId as string),
                    module_index: activeModuleIndex,
                    topic_index: activeTopicIndex,
                    is_completed: newStatus
                })
            })
        } catch (error) {
            console.error("Failed to update progress", error)
            // Revert on error
            setCompletedTopics(completedTopics)
        }
    }

    const handleNext = () => {
        if (!roadmap) return

        const currentModule = roadmap.content.roadmap[activeModuleIndex]

        // Check if there are more topics in this module
        if (activeTopicIndex < currentModule.topics.length - 1) {
            handleTopicSelect(activeModuleIndex, activeTopicIndex + 1)
        }
        // Move to next module
        else if (activeModuleIndex < roadmap.content.roadmap.length - 1) {
            handleTopicSelect(activeModuleIndex + 1, 0)
        }
    }

    const currentModule = roadmap?.content?.roadmap[activeModuleIndex]
    const currentTopic = currentModule?.topics[activeTopicIndex]

    // Fetch Lesson when topic changes
    useEffect(() => {
        if (currentTopic && roadmap) {
            fetchLesson(currentTopic, currentModule.title)
        }
    }, [currentTopic, roadmap])

    const fetchLesson = async (topic: string, moduleTitle: string) => {
        const cacheKey = `${moduleTitle}-${topic}`

        // 1. Check Cache
        if (lessonCache.current.has(cacheKey)) {
            // console.log(`Cache hit for: ${cacheKey}`)
            setLessonContent(lessonCache.current.get(cacheKey))
            return
        }

        setLoading(true)
        setLessonContent(null)
        try {
            const supabase = createClient()
            const { data: { session } } = await supabase.auth.getSession()
            const token = session?.access_token

            if (!token) {
                console.error("No auth token found")
                return
            }

            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
            const res = await fetch(`${apiUrl}/api/v1/learning/lesson`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ topic, context: `${roadmap.title} - ${moduleTitle}` })
            })
            const data = await res.json()

            // 2. Save to Cache
            lessonCache.current.set(cacheKey, data)
            setLessonContent(data)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const handleTopicSelect = (mIndex: number, tIndex: number) => {
        setActiveModuleIndex(mIndex)
        setActiveTopicIndex(tIndex)
        // On mobile, close sidebar after selection
        if (window.innerWidth < 768) setSidebarOpen(false)
    }

    if (!roadmap) {
        return (
            <div className="flex h-screen items-center justify-center bg-white">
                <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
            </div>
        )
    }

    return (
        <div className="flex h-screen bg-white overflow-hidden">
            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-50 w-80 bg-neutral-50 border-r border-neutral-200 transform transition-transform duration-300 md:relative md:translate-x-0",
                    !sidebarOpen && "-translate-x-full md:hidden"
                )}
            >
                <div className="flex items-center justify-between p-4 border-b border-neutral-200 h-16">
                    <h2 className="font-bold text-neutral-900 truncate" title={roadmap.title}>{roadmap.title}</h2>
                    <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)} className="md:hidden">
                        <ChevronRight className="h-5 w-5 rotate-180" />
                    </Button>
                </div>
                <ScrollArea className="h-[calc(100vh-4rem)]">
                    <div className="p-4 space-y-6">
                        {roadmap.content.roadmap.map((module: any, mIndex: number) => (
                            <div key={mIndex} className="space-y-2">
                                <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-wider px-2">
                                    Module {mIndex + 1}: {module.title}
                                </h3>
                                <div className="space-y-1">
                                    {module.topics.map((topic: string, tIndex: number) => {
                                        const isActive = mIndex === activeModuleIndex && tIndex === activeTopicIndex
                                        return (
                                            <button
                                                key={tIndex}
                                                onClick={() => handleTopicSelect(mIndex, tIndex)}
                                                className={cn(
                                                    "w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors text-left",
                                                    isActive
                                                        ? "bg-amber-100 text-amber-900"
                                                        : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                                                )}
                                            >
                                                {completedTopics.has(`${mIndex}-${tIndex}`) ? (
                                                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                                                ) : isActive ? (
                                                    <div className="h-2 w-2 rounded-full bg-amber-500" />
                                                ) : (
                                                    <div className="h-2 w-2 rounded-full bg-neutral-300" />
                                                )}
                                                {topic}
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0">
                {/* Header */}
                <header className="flex items-center gap-4 h-16 px-6 border-b border-neutral-100 bg-white sticky top-0 z-40">
                    <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)} className="md:hidden -ml-2">
                        <Menu className="h-5 w-5" />
                    </Button>
                    <div className="flex-1">
                        <h1 className="text-lg font-bold text-neutral-900 truncate">
                            {currentModule?.title} <span className="text-neutral-400 mx-2">/</span> {currentTopic}
                        </h1>
                    </div>
                </header>

                {/* Lesson Area */}
                <ScrollArea className="flex-1 p-6 md:p-12">
                    <div className="max-w-3xl mx-auto pb-20">
                        {loading ? (
                            <div className="flex flex-col items-center justify-center h-64 space-y-4">
                                <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
                                <p className="text-neutral-500 animate-pulse">Generating your lesson...</p>
                            </div>
                        ) : lessonContent ? (
                            <div className="prose prose-neutral prose-lg max-w-none">
                                <h1 className="text-4xl font-extrabold tracking-tight text-neutral-950 mb-4">{lessonContent.title}</h1>

                                <div className="flex items-center gap-4 text-sm text-neutral-500 mb-8 pb-8 border-b border-neutral-100">
                                    <span className="flex items-center gap-1">
                                        <BookOpen className="h-4 w-4" /> {lessonContent.estimated_time} read
                                    </span>
                                </div>

                                <ReactMarkdown
                                    components={{
                                        code({ node, inline, className, children, ...props }: any) {
                                            const match = /language-(\w+)/.exec(className || '')
                                            return !inline && match ? (
                                                <div className="rounded-xl overflow-hidden my-6 border border-neutral-200 bg-[#282c34] shadow-sm">
                                                    <SyntaxHighlighter
                                                        style={oneDark}
                                                        language={match[1]}
                                                        PreTag="div"
                                                        customStyle={{ margin: 0, borderRadius: 0 }}
                                                        {...props}
                                                    >
                                                        {String(children).replace(/\n$/, '')}
                                                    </SyntaxHighlighter>
                                                </div>
                                            ) : (
                                                <code className="bg-neutral-100 text-amber-600 px-1.5 py-0.5 rounded font-mono text-sm font-bold" {...props}>
                                                    {children}
                                                </code>
                                            )
                                        }
                                    }}
                                >
                                    {lessonContent.content_markdown}
                                </ReactMarkdown>

                                <div className="mt-16 pt-8 border-t border-neutral-200 flex flex-col md:flex-row gap-4 items-center">
                                    <Button
                                        size="lg"
                                        onClick={handleComplete}
                                        className={cn(
                                            "w-full md:w-auto rounded-xl text-lg font-bold px-8 transition-all",
                                            completedTopics.has(`${activeModuleIndex}-${activeTopicIndex}`)
                                                ? "bg-green-100 text-green-700 hover:bg-green-200"
                                                : "bg-neutral-900 text-white hover:bg-neutral-800"
                                        )}
                                    >
                                        {completedTopics.has(`${activeModuleIndex}-${activeTopicIndex}`) ? (
                                            <>
                                                <CheckCircle2 className="mr-2 h-5 w-5" />
                                                Completed
                                            </>
                                        ) : (
                                            "Mark as Complete"
                                        )}
                                    </Button>

                                    {completedTopics.has(`${activeModuleIndex}-${activeTopicIndex}`) && (
                                        <Button
                                            size="lg"
                                            onClick={handleNext}
                                            className="w-full md:w-auto bg-amber-400 hover:bg-amber-500 text-neutral-950 rounded-xl text-lg font-bold px-8 shadow-md hover:shadow-lg transition-all"
                                        >
                                            Next Lesson <ChevronRight className="ml-2 h-5 w-5" />
                                        </Button>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="text-center text-neutral-500">
                                Failed to load lesson.
                            </div>
                        )}
                    </div>
                </ScrollArea>
            </main>
        </div>
    )
}
