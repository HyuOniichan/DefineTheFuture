import { createFileRoute } from "@tanstack/react-router";
import { USER_NAME } from "@/utils/mockData";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { MetricCard } from "@/components/shared";

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
            <section className="flex justify-between items-end gap-[20px] pt-[45px] pb-[28px]">
                <div>
                    {/* Current day */}
                    <p className="text-[14px] tracking-wider text-[#85908a] font-[700]">
                        {new Date().toLocaleDateString('en-US', { weekday: 'long' })}, {new Date().toLocaleDateString('vi-VN')}
                    </p>

                    {/* Greeting */}
                    <h1 className="mt-[10px] mb-[8px] text-[clamp(28px,3vw,38px)] tracking-tight leading-8 font-bold">
                        Yo bro, {USER_NAME}
                    </h1>
                </div>

                <Button className="flex gap-2 w-36 h-12 pr-4">
                    <Plus />
                    New goal
                </Button>
            </section>

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

