import { RoadmapGenerator } from "@/components/dashboard/roadmap-generator"

export default function CreateRoadmapPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">New Roadmap</h1>
                <p className="text-muted-foreground">
                    Define your goals and let AI guide your journey.
                </p>
            </div>

            <div className="py-8">
                <RoadmapGenerator />
            </div>
        </div>
    )
}
