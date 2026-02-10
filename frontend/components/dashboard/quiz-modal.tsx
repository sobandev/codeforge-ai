"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { CheckCircle2, XCircle, ChevronRight, RotateCcw, Loader2 } from "lucide-react"

type QuizOption = {
    text: string
    is_correct: boolean
    explanation: string
}

type QuizQuestion = {
    question: string
    options: QuizOption[]
    difficulty: string
}

type QuizData = {
    topic: string
    questions: QuizQuestion[]
}

interface QuizModalProps {
    isOpen: boolean
    onClose: () => void
    topic: string
}

export function QuizModal({ isOpen, onClose, topic }: QuizModalProps) {
    const [quizData, setQuizData] = useState<QuizData | null>(null)
    const [loading, setLoading] = useState(false)
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [selectedOption, setSelectedOption] = useState<number | null>(null)
    const [showExplanation, setShowExplanation] = useState(false)
    const [score, setScore] = useState(0)
    const [quizCompleted, setQuizCompleted] = useState(false)

    // Fetch quiz when modal opens
    const fetchQuiz = async () => {
        setLoading(true)
        setQuizCompleted(false)
        setCurrentQuestionIndex(0)
        setScore(0)
        setSelectedOption(null)
        setShowExplanation(false)
        setQuizData(null)

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
            const response = await fetch(`${apiUrl}/api/v1/learning/quiz?topic=${encodeURIComponent(topic)}`)
            if (!response.ok) throw new Error("Failed to load quiz")
            const data = await response.json()
            setQuizData(data)
        } catch (error) {
            console.error("Error fetching quiz:", error)
        } finally {
            setLoading(false)
        }
    }

    // Effect to load quiz when modal opens
    // Note: We use a button to trigger the fetch in the UI so we don't spam the API on re-renders,
    // or we can call it in useEffect if isOpen changes to true. 
    // For this MVP, let's load it immediately when the modal opens if data is missing.
    // Simplifying: The user clicks the button in the parent component, which sets isOpen. 
    // We can use a simple useEffect here.

    // Better UX: Show a "Start Quiz" button inside the modal first? 
    // Or just start loading. Let's start loading.
    if (isOpen && !quizData && !loading && !quizCompleted) {
        // Trigger fetch only once
        // This is tricky with React strict mode double-invoking. 
        // Safer to just call fetchQuiz() inside a useEffect or have the parent fetch it.
        // Let's use a useEffect with a flag or just simplistic logic.
        // Actually, let's simply rely on a useEffect with dependency on [isOpen].
    }

    // Changing approach: use a useEffect that triggers when isOpen becomes true
    // and topic has changed or data is null.

    const handleAnswer = () => {
        if (selectedOption === null || !quizData) return

        const isCorrect = quizData.questions[currentQuestionIndex].options[selectedOption].is_correct
        if (isCorrect) {
            setScore(prev => prev + 1)
        }
        setShowExplanation(true)
    }

    const handleNext = () => {
        if (!quizData) return

        if (currentQuestionIndex < quizData.questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1)
            setSelectedOption(null)
            setShowExplanation(false)
        } else {
            setQuizCompleted(true)
        }
    }

    const restartQuiz = () => {
        fetchQuiz()
    }

    // We'll separate the fetch trigger to a useEffect
    // import { useEffect } from "react"
    // ...
    // useEffect(() => {
    //  if (isOpen) fetchQuiz()
    // }, [isOpen, topic])

    // Adding useEffect manually in the file content below.

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-xl bg-white border-neutral-200 shadow-2xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-neutral-950 flex items-center gap-2">
                        {quizCompleted ? <div className="p-2 bg-amber-100 rounded-full text-amber-600"><CheckCircle2 className="h-5 w-5" /></div> : <div className="p-2 bg-neutral-100 rounded-full text-neutral-600"><RotateCcw className="h-5 w-5" /></div>}
                        {quizCompleted ? "Quiz Results" : `Quiz: ${topic}`}
                    </DialogTitle>
                    {!quizCompleted && !loading && quizData && (
                        <DialogDescription className="text-neutral-500 text-base">
                            Question <span className="font-semibold text-neutral-900">{currentQuestionIndex + 1}</span> of {quizData.questions.length}
                        </DialogDescription>
                    )}
                </DialogHeader>

                <div className="py-6">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center p-12 space-y-6 focus:outline-none" tabIndex={0}>
                            <Loader2 className="h-10 w-10 animate-spin text-amber-400" />
                            <p className="text-neutral-500 font-medium">Consulting the AI Oracle...</p>
                        </div>
                    ) : !quizData ? (
                        <div className="flex flex-col items-center justify-center p-8 space-y-4">
                            <p className="text-neutral-500">Ready to test your knowledge?</p>
                            <Button onClick={fetchQuiz} className="bg-amber-400 text-neutral-900 hover:bg-amber-500 font-bold">Start Quiz</Button>
                        </div>
                    ) : quizCompleted ? (
                        <div className="text-center space-y-6 py-4">
                            <div className="relative inline-flex items-center justify-center">
                                <span className={`text-6xl font-black ${score === quizData.questions.length ? "text-amber-500" : "text-neutral-900"}`}>
                                    {Math.round((score / quizData.questions.length) * 100)}%
                                </span>
                            </div>
                            <div className="flex justify-center gap-8 text-sm font-medium">
                                <div className="text-center">
                                    <div className="text-neutral-500 uppercase tracking-wider text-xs">Correct</div>
                                    <div className="text-2xl font-bold text-green-600">{score}</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-neutral-500 uppercase tracking-wider text-xs">Total</div>
                                    <div className="text-2xl font-bold text-neutral-900">{quizData.questions.length}</div>
                                </div>
                            </div>

                            <p className="text-neutral-600 max-w-xs mx-auto">
                                {score === quizData.questions.length ? "Perfect score! You've mastered this topic." :
                                    score > quizData.questions.length / 2 ? "Good job! Keep practicing to reach 100%." :
                                        "Review the material and try again to improve."}
                            </p>

                            <Button onClick={restartQuiz} variant="outline" className="mt-4 border-2 border-neutral-200 font-bold hover:bg-neutral-50 hover:text-neutral-900">
                                <RotateCcw className="mr-2 h-4 w-4" /> Try Again
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            <p className="font-medium text-xl leading-relaxed text-neutral-900">
                                {quizData.questions[currentQuestionIndex].question}
                            </p>

                            <RadioGroup value={selectedOption?.toString()} onValueChange={(val) => !showExplanation && setSelectedOption(parseInt(val))} className="space-y-3">
                                {quizData.questions[currentQuestionIndex].options.map((option, index) => (
                                    <div key={index}
                                        onClick={() => !showExplanation && setSelectedOption(index)}
                                        className={`flex items-start space-x-3 rounded-xl border-2 p-4 cursor-pointer transition-all ${selectedOption === index
                                            ? "border-amber-400 bg-amber-50 shadow-sm"
                                            : "border-neutral-100 hover:border-neutral-200 hover:bg-neutral-50"
                                            } ${showExplanation && option.is_correct ? "!border-green-500 !bg-green-50" : ""
                                            } ${showExplanation && selectedOption === index && !option.is_correct ? "!border-red-500 !bg-red-50" : ""
                                            }`}>
                                        <div className={`mt-0.5 h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${selectedOption === index ? "border-amber-500" : "border-neutral-300"
                                            } ${showExplanation && option.is_correct ? "!border-green-600" : ""
                                            } ${showExplanation && selectedOption === index && !option.is_correct ? "!border-red-600" : ""}`}>
                                            {selectedOption === index && <div className={`h-2.5 w-2.5 rounded-full ${showExplanation && option.is_correct ? "bg-green-600" :
                                                showExplanation && !option.is_correct ? "bg-red-600" : "bg-amber-500"
                                                }`} />}
                                        </div>

                                        <div className="grid gap-2 leading-none w-full">
                                            <Label htmlFor={`option-${index}`} className="cursor-pointer font-medium text-base text-neutral-800 leading-snug">
                                                {option.text}
                                            </Label>
                                            {showExplanation && (option.is_correct || selectedOption === index) && (
                                                <p className={`text-sm mt-1 font-medium ${option.is_correct ? "text-green-700" : "text-red-700"}`}>
                                                    {option.explanation}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>
                    )}
                </div>

                <DialogFooter className="sm:justify-between sm:items-center">
                    {!loading && !quizCompleted && quizData && (
                        <>
                            {/* Progress Bar Mockup */}
                            <div className="hidden sm:flex h-2 w-32 bg-neutral-100 rounded-full overflow-hidden">
                                <div className="h-full bg-amber-400 transition-all duration-300" style={{ width: `${((currentQuestionIndex) / quizData.questions.length) * 100}%` }}></div>
                            </div>

                            {!showExplanation ? (
                                <Button onClick={handleAnswer} disabled={selectedOption === null} className="w-full sm:w-auto bg-neutral-900 text-white hover:bg-neutral-800 font-bold px-8">
                                    Check Answer
                                </Button>
                            ) : (
                                <Button onClick={handleNext} className="w-full sm:w-auto bg-amber-400 text-neutral-900 hover:bg-amber-500 font-bold px-8">
                                    {currentQuestionIndex < quizData.questions.length - 1 ? (
                                        <>Next Question <ChevronRight className="ml-2 h-4 w-4" /></>
                                    ) : (
                                        "Finish Quiz"
                                    )}
                                </Button>
                            )}
                        </>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
