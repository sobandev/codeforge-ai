import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Circle, GraduationCap, BookOpen, Code2 } from "lucide-react"
import Link from "next/link"
import { QuizModal } from "./quiz-modal"
import { cn } from "@/lib/utils"

interface Resource {
    title: string
    url: string
    type: string
}

interface Project {
    title: string
    description: string
    difficulty: "Beginner" | "Intermediate" | "Advanced"
}

type RoadmapModule = {
    title: string;
    description: string;
    topics: string[];
    free_resources?: Resource[];
    paid_resources?: Resource[];
    projects?: Project[];
};

type RoadmapContent = {
    roadmap: RoadmapModule[];
};

type RoadmapData = {
    id: number;
    title: string;
    description: string;
    content: RoadmapContent;
};

export function RoadmapDisplay({ data }: { data: RoadmapData }) {
    console.log("DEBUG: RoadmapDisplay received data:", data)
    const [selectedTopic, setSelectedTopic] = useState<string | null>(null)
    const [isQuizOpen, setIsQuizOpen] = useState(false)

    if (!data) {
        console.error("DEBUG: Data is null/undefined")
        return <div>Error: No data received</div>
    }
    if (!data.content) {
        console.error("DEBUG: data.content is missing")
        return <div>Error: Roadmap content missing</div>
    }
    if (!data.content.roadmap) {
        console.error("DEBUG: data.content.roadmap is missing", data.content)
        return <div>Error: Roadmap array missing in content</div>
    }

    const handleTakeQuiz = (topic: string) => {
        setSelectedTopic(topic)
        setIsQuizOpen(true)
    }

    return (
        <div className="space-y-12 mt-16">
            <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold tracking-tight md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-primary via-violet-400 to-purple-600">
                    {data.title}
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    {data.description}
                </p>
                <div className="pt-4">
                    <Link href={`/dashboard/learn/${data.id}`}>
                        <Button size="lg" className="rounded-full px-8 font-bold text-lg bg-neutral-900 hover:bg-neutral-800 text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                            <BookOpen className="mr-2 h-5 w-5 text-amber-400" />
                            Enter Learning Studio
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="relative border-l-2 border-primary/20 ml-4 md:ml-8 space-y-12 pb-12">
                {data.content.roadmap.map((module, index) => (
                    <div key={index} className="relative pl-8 md:pl-16">
                        {/* Timeline dot */}
                        <div className="absolute left-[-9px] top-0 h-4 w-4 rounded-full bg-primary ring-4 ring-background shadow-[0_0_15px_rgba(124,58,237,0.5)]" />

                        <Card className="group relative overflow-hidden border-white/10 bg-white/5 backdrop-blur-md transition-all hover:bg-white/10 hover:shadow-2xl hover:shadow-primary/10">
                            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

                            <CardHeader>
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                                    <div className="space-y-1">
                                        <Badge variant="outline" className="border-primary/50 text-primary bg-primary/5 mb-2">
                                            Week {index + 1}
                                        </Badge>
                                        <CardTitle className="text-2xl font-bold text-foreground">
                                            {module.title}
                                        </CardTitle>
                                    </div>
                                </div>
                                <CardDescription className="text-base leading-relaxed text-neutral-700 font-medium">
                                    {module.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <ul className="grid gap-3 sm:grid-cols-2 mt-2">
                                    {module.topics.map((topic, tIndex) => (
                                        <li key={tIndex} className="flex items-start gap-2.5 text-sm text-neutral-800 font-medium group/item hover:text-neutral-950 transition-colors">
                                            <Circle className="h-2 w-2 mt-1.5 text-amber-500 fill-amber-500" />
                                            <span className="leading-snug">{topic}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Projects Section */}
                                {module.projects && module.projects.length > 0 && (
                                    <div className="pt-4 border-t border-neutral-100">
                                        <h4 className="text-sm font-bold text-neutral-900 mb-3 flex items-center gap-2">
                                            <span className="p-1 rounded bg-rose-100 text-rose-600">
                                                <Code2 className="h-4 w-4" />
                                            </span>
                                            Job-Ready Projects
                                        </h4>
                                        <div className="grid gap-3">
                                            {module.projects.map((project, i) => (
                                                <div key={i} className="group relative p-4 rounded-xl border border-neutral-200 bg-neutral-50 hover:border-amber-200 hover:shadow-sm transition-all">
                                                    <div className="flex justify-between items-start mb-1">
                                                        <h5 className="font-bold text-neutral-800 group-hover:text-amber-700 transition-colors">
                                                            {project.title}
                                                        </h5>
                                                        <Badge variant="outline" className={cn(
                                                            "text-[10px] px-2 py-0 h-5",
                                                            project.difficulty === "Advanced" ? "bg-red-50 text-red-700 border-red-200" :
                                                                project.difficulty === "Intermediate" ? "bg-amber-50 text-amber-700 border-amber-200" :
                                                                    "bg-green-50 text-green-700 border-green-200"
                                                        )}>
                                                            {project.difficulty}
                                                        </Badge>
                                                    </div>
                                                    <p className="text-sm text-neutral-600 line-clamp-2">
                                                        {project.description}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Projects Section */}

                                {/* Resources Section */}
                                {(module.free_resources || module.paid_resources) && (
                                    <div className="pt-4 border-t border-neutral-100 space-y-3">
                                        <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Recommended Resources</h4>
                                        <div className="grid gap-4 sm:grid-cols-2">
                                            {/* Free Resources */}
                                            {module.free_resources && module.free_resources.length > 0 && (
                                                <div className="space-y-2">
                                                    <span className="text-xs font-semibold text-green-600 flex items-center gap-1">
                                                        Free
                                                    </span>
                                                    <div className="flex flex-col gap-2">
                                                        {module.free_resources.map((res, i) => (
                                                            <a href={res.url} target="_blank" rel="noopener noreferrer" key={i} className="flex items-center gap-2 text-sm text-neutral-600 hover:text-amber-600 transition-colors group/link p-2 rounded-lg hover:bg-neutral-50 border border-transparent hover:border-neutral-100">
                                                                <div className="p-1 px-2 rounded-md bg-neutral-100 text-[10px] font-bold text-neutral-500 group-hover/link:bg-white group-hover/link:text-amber-500 transition-colors">
                                                                    {res.type}
                                                                </div>
                                                                <span className="truncate flex-1 font-medium">{res.title}</span>
                                                            </a>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Paid Resources */}
                                            {module.paid_resources && module.paid_resources.length > 0 && (
                                                <div className="space-y-2">
                                                    <span className="text-xs font-semibold text-purple-600 flex items-center gap-1">
                                                        Paid
                                                    </span>
                                                    <div className="flex flex-col gap-2">
                                                        {module.paid_resources.map((res, i) => (
                                                            <a href={res.url} target="_blank" rel="noopener noreferrer" key={i} className="flex items-center gap-2 text-sm text-neutral-600 hover:text-amber-600 transition-colors group/link p-2 rounded-lg hover:bg-neutral-50 border border-transparent hover:border-neutral-100">
                                                                <div className="p-1 px-2 rounded-md bg-neutral-100 text-[10px] font-bold text-neutral-500 group-hover/link:bg-white group-hover/link:text-amber-500 transition-colors">
                                                                    {res.type}
                                                                </div>
                                                                <span className="truncate flex-1 font-medium">{res.title}</span>
                                                            </a>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                            <CardFooter className="pt-2">
                                <Button
                                    variant="ghost"
                                    className="w-full sm:w-auto text-neutral-900 hover:text-amber-800 hover:bg-amber-100 transition-colors group/btn font-bold bg-amber-50/50"
                                    onClick={() => handleTakeQuiz(module.title)}
                                >
                                    <GraduationCap className="mr-2 h-4 w-4" />
                                    Test Knowledge
                                    <span className="opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all font-bold ml-1 text-amber-600">→</span>
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                ))}
            </div>

            {selectedTopic && (
                <QuizModal
                    isOpen={isQuizOpen}
                    onClose={() => setIsQuizOpen(false)}
                    topic={selectedTopic}
                />
            )}
        </div>
    )
}
