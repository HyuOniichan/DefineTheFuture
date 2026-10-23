import { GoalIdPage } from '@/features/goals';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/goals/$goalId')({
    component: GoalIdRoute,
})

function GoalIdRoute() {
    const { goalId } = Route.useParams();
    return <GoalIdPage goalId={goalId} />
}
