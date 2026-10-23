import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Sidebar, Header } from "@/components/shared";
import { authCurrentUserOptions } from '@/features/auth';

export const Route = createFileRoute('/_app')({
	beforeLoad: async ({ context }) => {
		try {
			const response = await context.queryClient.query({
				...authCurrentUserOptions,
				staleTime: 'static',
			})

			if (!response.data) {
				throw redirect({ to: '/login' });
			}
		} catch (error) {
			console.log(error);
			throw redirect({ to: '/login' });
		}
	},
	component: AppLayout,
})

function AppLayout() {
	return (
		<SidebarProvider>
			<Sidebar />
			<main className="flex flex-1 min-h-screen bg-[#f4f5f2]">
				<SidebarTrigger className="m-2 z-30" />
				<div className="w-full pt-0 px-4 pb-15">
					<Header />
					<Outlet />
				</div>
			</main>
		</SidebarProvider>
	)
}

