import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute('/goals/')({
    component: GoalPage
})

function GoalPage() {
    return <div>Goal Page</div>
}
