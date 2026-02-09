"use client"

import { useEffect, useState, use } from "react"
import { challengesService } from "@/services/challenges"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Loader2, Play, CheckCircle2, AlertTriangle, ChevronLeft } from "lucide-react"
import Link from "next/link"
import Editor from "@monaco-editor/react"
import Confetti from "react-confetti"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"

export default function ChallengeEditorPage({ params }: { params: Promise<{ id: string }> }) {
    const [challengeId, setChallengeId] = useState<string | null>(null)
    const [challenge, setChallenge] = useState<any>(null)
    const [code, setCode] = useState("")
    const [verifying, setVerifying] = useState(false)
    const [result, setResult] = useState<any>(null)
    const [showConfetti, setShowConfetti] = useState(false)

    // Unwrap params
    useEffect(() => {
        params.then(unwrapped => setChallengeId(unwrapped.id))
    }, [params])

    useEffect(() => {
        if (!challengeId) return
        const fetchChallenge = async () => {
            try {
                const data = await challengesService.getChallengeById(challengeId)
                setChallenge(data)
                setCode(data.starter_code)
            } catch (error) {
                console.error(error)
            }
        }
        fetchChallenge()
    }, [challengeId])

    const handleRun = async () => {
        if (!challengeId) return
        setVerifying(true)
        setResult(null)

        try {
            const res = await challengesService.verifySolution(challengeId, code, "python")
            setResult(res)
            if (res.is_correct) {
                setShowConfetti(true)
                setTimeout(() => setShowConfetti(false), 5000)
            }
        } catch (error) {
            console.error(error)
            setResult({ is_correct: false, feedback: "Error connecting to verification service." })
        } finally {
            setVerifying(false)
        }
    }

    if (!challenge) {
        return <div className="flex h-screen items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-neutral-400" /></div>
    }

    return (
        <div className="h-[calc(100vh-4rem)] flex flex-col md:flex-row gap-6">
            {showConfetti && <Confetti numberOfPieces={200} recycle={false} />}

            {/* Left Panel: Problem Description */}
            <div className="w-full md:w-1/3 space-y-6 overflow-y-auto">
                <Link href="/dashboard/challenges" className="flex items-center text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Back to Challenges
                </Link>

                <div>
                    <h1 className="text-2xl font-bold text-neutral-900">{challenge.title}</h1>
                    <div className="flex items-center gap-2 mt-2">
                        <span className="px-2 py-1 bg-neutral-100 text-neutral-600 text-xs rounded-md border border-neutral-200">
                            {challenge.difficulty}
                        </span>
                        <span className="text-sm text-amber-600 font-medium">
                            +{challenge.xp} XP
                        </span>
                    </div>
                </div>

                <div className="prose prose-neutral max-w-none">
                    <p className="text-neutral-600 leading-relaxed">
                        {challenge.description}
                    </p>
                    <div className="bg-neutral-100 p-4 rounded-lg border border-neutral-200 font-mono text-sm mt-4">
                        <h4 className="font-bold text-neutral-900 mb-2">Test Criteria:</h4>
                        {challenge.test_criteria}
                    </div>
                </div>

                {/* Results Section */}
                {result && (
                    <div className={`p-4 rounded-lg border ${result.is_correct ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"} animate-in fade-in slide-in-from-bottom-2`}>
                        <div className="flex items-start gap-3">
                            {result.is_correct ? (
                                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                            ) : (
                                <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                            )}
                            <div>
                                <h4 className={`font-bold ${result.is_correct ? "text-green-800" : "text-red-800"}`}>
                                    {result.is_correct ? "Solution Accepted!" : "Incorrect Solution"}
                                </h4>
                                <p className={`mt-1 text-sm ${result.is_correct ? "text-green-700" : "text-red-700"}`}>
                                    {result.feedback}
                                </p>
                                {result.is_correct && result.xp_awarded > 0 && (
                                    <div className="mt-2 inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs font-bold rounded">
                                        +{result.xp_awarded} XP Awarded
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Right Panel: Editor */}
            <div className="w-full md:w-2/3 flex flex-col h-full rounded-xl border border-neutral-200 overflow-hidden shadow-sm bg-white">
                <div className="bg-neutral-50 px-4 py-3 border-b border-neutral-200 flex justify-between items-center">
                    <span className="text-sm font-medium text-neutral-600">solutions.py</span>
                    <Button
                        size="sm"
                        onClick={handleRun}
                        disabled={verifying}
                        className="bg-green-600 hover:bg-green-700 text-white"
                    >
                        {verifying ? (
                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        ) : (
                            <Play className="h-4 w-4 mr-2" />
                        )}
                        Run & Verify
                    </Button>
                </div>
                <div className="flex-1">
                    <Editor
                        height="100%"
                        defaultLanguage="python"
                        value={code}
                        onChange={(value) => setCode(value || "")}
                        theme="light"
                        options={{
                            minimap: { enabled: false },
                            fontSize: 14,
                            lineNumbers: "on",
                            automaticLayout: true,
                            padding: { top: 16 }
                        }}
                    />
                </div>
            </div>
        </div>
    )
}
