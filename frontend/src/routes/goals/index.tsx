import { createFileRoute } from "@tanstack/react-router";
import GoalPage from "@/features/goals/pages/GoalPage";

export const Route = createFileRoute('/goals/')({
    component: GoalPage
})
