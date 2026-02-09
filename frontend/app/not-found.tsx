"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Map, ArrowLeft, Home } from "lucide-react"

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-neutral-50 p-4 font-sans text-neutral-900">
            <div className="relative w-full max-w-lg space-y-8 text-center">

                {/* Decorative Icon */}
                <div className="relative mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-amber-50 ring-8 ring-white shadow-xl">
                    <Map className="h-16 w-16 text-amber-500" />
                    <div className="absolute -bottom-2 -right-2 h-10 w-10 flex items-center justify-center rounded-full bg-red-500 text-white font-bold text-lg border-4 border-white">
                        ?
                    </div>
                </div>

                <div className="space-y-4">
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-neutral-950">
                        Page Not Found
                    </h1>
                    <p className="text-lg text-neutral-500 max-w-md mx-auto">
                        Oops! It seems you've wandered off the learning path. The page you're looking for doesn't exist or has been moved.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href="/dashboard">
                        <Button size="lg" className="w-full sm:w-auto h-12 px-8 text-base font-bold bg-amber-400 text-neutral-950 hover:bg-amber-500 hover:shadow-lg transition-all rounded-xl">
                            <ArrowLeft className="mr-2 h-5 w-5" />
                            Return to Dashboard
                        </Button>
                    </Link>
                    <Link href="/">
                        <Button variant="outline" size="lg" className="w-full sm:w-auto h-12 px-8 text-base font-medium border-2 border-neutral-200 bg-white hover:bg-neutral-50 hover:border-neutral-300 transition-all rounded-xl">
                            <Home className="mr-2 h-5 w-5" />
                            Go Home
                        </Button>
                    </Link>
                </div>

                <div className="pt-8 text-sm text-neutral-400">
                    Error Code: 404
                </div>
            </div>
        </div>
    )
}
