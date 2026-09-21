import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/goals/$goalId')({
    component: GoalDetailPage,
})

function GoalDetailPage() {
    const { goalId } = Route.useParams();

    return <div>
        <h1>Goal page</h1>
        <p>Id: {goalId}</p>
    </div>
}


