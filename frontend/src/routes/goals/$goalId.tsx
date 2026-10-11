import { GoalIdPage } from '@/features/goals';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/goals/$goalId')({
    component: GoalIdRoute,
})

function GoalIdRoute() {
    const { goalId } = Route.useParams();
    return <GoalIdPage goalId={goalId} />
}
