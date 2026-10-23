import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth')({
	component: AuthLayout,
})

function AuthLayout() {
	return (
		<div className='h-screen flex justify-center items-center'>
			<Outlet />
		</div>
	)
}
