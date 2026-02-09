"use client"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
    {
        question: "How is this different from generic tutorials?",
        answer: "CodeForge builds a curriculum specific to YOU. Instead of watching a 40-hour React course where you already know 50% of the material, we pinpoint your gaps and give you lessons only on what you need to learn.",
    },
    {
        question: "Do I need a paid subscription?",
        answer: "You can create one roadmap and access basic lessons for free. Our Pro plan unlocks unlimited roadmaps, an AI tutor for real-time help, and advanced analytics.",
    },
    {
        question: "What technologies do you support?",
        answer: "We support all major modern web technologies including React, Next.js, Vue, Python (FastAPI/Django), Node.js, and database systems like SQL and MongoDB.",
    },
    {
        question: "Can I download my roadmap?",
        answer: "Yes! You can export your roadmap as a PDF or share a public link with recruiters to show off your learning path.",
    },
]

export function FAQSection() {
    return (
        <section className="py-24 bg-neutral-50">
            <div className="container mx-auto px-4 max-w-3xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-neutral-950 sm:text-4xl mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-lg text-neutral-600">
                        Everything you need to know about CodeForge AI.
                    </p>
                </div>

                <Accordion type="single" collapsible className="w-full space-y-4">
                    {faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`} className="bg-white border text-left border-neutral-200 rounded-xl px-6 shadow-sm">
                            <AccordionTrigger className="text-lg font-semibold text-neutral-900 hover:no-underline py-6">
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-neutral-500 text-base pb-6 leading-relaxed">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    )
}
