"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Github, LayoutGrid, Terminal } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
    const router = useRouter()
    const supabase = createClient()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [mode, setMode] = useState<'signin' | 'signup'>('signin')

    const handleEmailAuth = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        if (mode === 'signup') {
            const { error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    emailRedirectTo: `${location.origin}/auth/callback`,
                },
            })
            if (error) {
                setError(error.message)
                setLoading(false)
            } else {
                setError("Check your email for the confirmation link!")
                setLoading(false)
            }
        } else {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            })
            if (error) {
                setError(error.message)
                setLoading(false)
            } else {
                router.push('/dashboard')
                router.refresh()
            }
        }
    }

    const handleOAuthLogin = async (provider: 'github' | 'google') => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider,
            options: {
                redirectTo: `${location.origin}/auth/callback`,
            },
        })

        if (error) {
            setError(error.message)
        }
    }

    return (
        <div className="flex min-h-screen w-full">
            {/* Left Side - Branding (Hidden on mobile) */}
            <div className="hidden lg:flex w-1/2 bg-neutral-950 relative items-center justify-center overflow-hidden">
                {/* Abstract Background Shapes */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/10 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 blur-[100px] rounded-full -translate-x-1/3 translate-y-1/3" />

                <div className="relative z-10 max-w-lg px-12">
                    <div className="mb-8 p-3 bg-amber-400 w-fit rounded-2xl shadow-lg shadow-amber-400/20">
                        <Terminal className="h-8 w-8 text-neutral-950" />
                    </div>
                    <h1 className="text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
                        Forge your path <br />
                        <span className="text-amber-400">in code.</span>
                    </h1>
                    <p className="text-lg text-neutral-400 leading-relaxed mb-8">
                        Generate personalized learning roadmaps, track your progress, and master new skills with the power of AI.
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                            <div className="text-2xl font-bold text-white mb-1">AI-Powered</div>
                            <div className="text-sm text-neutral-400">Custom curriculums</div>
                        </div>
                        <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                            <div className="text-2xl font-bold text-white mb-1">Interactive</div>
                            <div className="text-sm text-neutral-400">Track real progress</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Auth Form */}
            <div className="flex-1 flex items-center justify-center p-8 bg-white">
                <div className="w-full max-w-sm space-y-8">
                    <div className="text-center space-y-2">
                        <h2 className="text-3xl font-bold tracking-tight text-neutral-900">
                            {mode === 'signin' ? 'Welcome back' : 'Create an account'}
                        </h2>
                        <p className="text-neutral-500">
                            {mode === 'signin'
                                ? 'Enter your details to access your dashboard'
                                : 'Start your coding journey with us today'}
                        </p>
                    </div>

                    <form onSubmit={handleEmailAuth} className="space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="h-11 bg-neutral-50 border-neutral-200 focus:border-neutral-900 focus:ring-0 rounded-lg"
                                />
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password">Password</Label>
                                    {mode === 'signin' && (
                                        <Link
                                            href="#"
                                            className="text-xs font-medium text-amber-600 hover:text-amber-700"
                                            onClick={(e) => { e.preventDefault(); alert("Reset password not implemented in MVP"); }}
                                        >
                                            Forgot password?
                                        </Link>
                                    )}
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="h-11 bg-neutral-50 border-neutral-200 focus:border-neutral-900 focus:ring-0 rounded-lg"
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="p-3 bg-red-50 border border-red-100 rounded-lg text-sm text-red-600">
                                {error}
                            </div>
                        )}

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full h-11 bg-neutral-900 hover:bg-neutral-800 text-white font-bold rounded-lg shadow-sm transition-all hover:scale-[1.01]"
                        >
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {mode === 'signin' ? 'Sign In' : 'Create Account'}
                        </Button>
                    </form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-neutral-200" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-2 text-neutral-400 font-medium">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <Button
                            variant="outline"
                            onClick={() => handleOAuthLogin('github')}
                            className="h-11 border-neutral-200 hover:bg-neutral-50 hover:text-neutral-900 rounded-lg"
                        >
                            <Github className="mr-2 h-4 w-4" />
                            GitHub
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => handleOAuthLogin('google')}
                            className="h-11 border-neutral-200 hover:bg-neutral-50 hover:text-neutral-900 rounded-lg"
                        >
                            <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                                <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                            </svg>
                            Google
                        </Button>
                    </div>

                    <div className="text-center text-sm text-neutral-500">
                        {mode === 'signin' ? "Don't have an account? " : "Already have an account? "}
                        <button
                            onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
                            className="font-bold text-neutral-900 hover:underline"
                        >
                            {mode === 'signin' ? 'Sign up' : 'Sign in'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
