import { createFileRoute } from "@tanstack/react-router";
import { USER_NAME } from "@/utils/mockData";
import { Plus } from "lucide-react";
import { Hero, MetricCard } from "@/components/shared";

export const Route = createFileRoute('/')({
    component: HomePage
})

const metricCardItems = [
    {
        title: "Active goals",
        highlightedText: "2",
        normalText: "2",
        linkText: "Review goals",
        link: "/goals",
        commentText: "At your weekly limit",
    },
    {
        title: "Today's progress",
        highlightedText: "0",
        normalText: "3",
        linkText: "Today tasks",
        link: "/today",
        commentText: "On a good track",
    },
    {
        title: "Planned time",
        highlightedText: "2h 55m",
        linkText: "Check reports",
        link: "/reports",
        commentText: "5m completed today",
    },
]

function HomePage() {
    return (
        <div className="mr-10">
            {/* Hero section */}
            <Hero 
                subtitle={`${new Date().toLocaleDateString('en-US', { weekday: 'long' })}, ${new Date().toLocaleDateString('vi-VN')}`}
                title={`Yo bro, ${USER_NAME}`}
                buttonInnerHtml={<>
                    <Plus />
                    New goal
                </>}
            />

            {/* Metrics section */}
            <section className="flex gap-4">
                {metricCardItems.map((item, index) => (
                    <MetricCard key={index} {...item} />
                ))}
            </section>

            {/* Dashboard section */}
            <section></section>
        </div>
    )
}

