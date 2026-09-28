import { GoalCard, Hero } from "@/components/shared";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockGoals } from "@/utils/mockData";
import { createFileRoute } from "@tanstack/react-router";
import { Funnel, Plus } from "lucide-react";

export const Route = createFileRoute('/goals/')({
    component: GoalPage
})

const filterItems = [
    { label: "All", value: "all" },
    { label: "Active", value: "active" },
    { label: "Backlog", value: "backlog" },
    { label: "Achieved", value: "achieved" },
    { label: "Suspended", value: "suspended" },
    { label: "Dropped", value: "dropped" }
]

function GoalPage() {
    return (
        <div className="mr-10">
            {/* Hero section */}
            <Hero
                subtitle="Workspace"
                title="Goals"
                buttonInnerHtml={<>
                    <Plus />
                    New goal
                </>}
            />

            {/* Filter section */}
            <section className="flex w-full justify-end mb-6">
                <Select items={filterItems}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue
                            placeholder={
                                <>
                                    <Funnel />
                                    Status
                                </>
                            }
                        />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {filterItems.map((item) => (
                                <SelectItem
                                    key={item.value}
                                    value={item.value}
                                    className="hover:bg-[#eef1ed] focus:bg-[#eef1ed]"
                                >
                                    {item.label}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </section>

            {/* Goals List section */}
            <section className="flex gap-4">
                {mockGoals.map(goal => (
                    <GoalCard
                        key={goal.goal_id}
                        id={goal.goal_id.toString()}
                        goalStatus={goal.status}
                        title={goal.title}
                        description={goal.description}
                        progress={goal.progress}
                        tagTitles={goal.tag_titles}
                    />
                ))}
            </section>
        </div>
    )
}
