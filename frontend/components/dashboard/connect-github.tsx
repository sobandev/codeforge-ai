import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Github, Loader2, CheckCircle2, AlertCircle } from "lucide-react"
import { githubService } from "@/services/github"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function ConnectGithub() {
    const [username, setUsername] = useState("")
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState<any>(null)
    const [error, setError] = useState<string | null>(null)

    const handleAnalyze = async () => {
        if (!username) return

        setLoading(true)
        setError(null)
        setResult(null)

        try {
            const data = await githubService.analyzeProfile(username)
            setResult(data)
        } catch (err: any) {
            console.error(err)
            setError(err.message || "Failed to analyze profile")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Card className="border-neutral-200 shadow-sm">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Github className="h-5 w-5" />
                    Connect GitHub
                </CardTitle>
                <CardDescription>
                    We'll scan your public repos to verify your skills and auto-complete roadmap nodes.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {!result ? (
                    <div className="flex gap-2">
                        <Input
                            placeholder="GitHub Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <Button
                            onClick={handleAnalyze}
                            disabled={loading || !username}
                            className="bg-neutral-900 hover:bg-neutral-800"
                        >
                            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Scan"}
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                        <Alert className="bg-green-50 border-green-200">
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                            <AlertTitle className="text-green-800 font-bold">Analysis Complete</AlertTitle>
                            <AlertDescription className="text-green-700">
                                Found {result.analysis.repo_count} repositories.
                            </AlertDescription>
                        </Alert>

                        <div className="space-y-2">
                            <h4 className="text-sm font-semibold text-neutral-900">Verified Skills:</h4>
                            <div className="flex flex-wrap gap-2">
                                {result.analysis.detected_skills.map((skill: string) => (
                                    <span key={skill} className="px-2 py-1 bg-neutral-100 text-neutral-700 rounded-md text-xs font-medium border border-neutral-200">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {result.auto_completed_nodes > 0 && (
                            <div className="p-3 bg-amber-50 border border-amber-100 rounded-lg text-amber-800 text-sm">
                                <strong>🎉 Success!</strong> We auto-completed {result.auto_completed_nodes} roadmap topics based on your code.
                            </div>
                        )}

                        <Button variant="outline" className="w-full" onClick={() => setResult(null)}>
                            Scan Another
                        </Button>
                    </div>
                )}

                {error && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
            </CardContent>
        </Card>
    )
}
