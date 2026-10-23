import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/goals')({
	component: GoalsLayout,
})

function GoalsLayout() {
	return <Outlet />
}
