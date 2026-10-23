import { Plus } from "lucide-react";
import { Hero, MetricCard } from "@/components/shared";
import { mockHomeMetrics, USER_NAME } from "@/utils/mockData";

export default function HomePage() {
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
                {mockHomeMetrics.map((item, index) => (
                    <MetricCard key={index} {...item} />
                ))}
            </section>

            {/* Dashboard section */}
            <section></section>
        </div>
    )
}

