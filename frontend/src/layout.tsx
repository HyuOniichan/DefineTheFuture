import { Outlet } from "@tanstack/react-router"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/shared/Sidebar"

export default function RootLayout() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="flex min-h-screen">
                <SidebarTrigger className="z-10" />
                <div className="flex-1 max-w-[1400px] pt-0 px-12 pb-15">
                    <Outlet />
                </div>
            </main>
        </SidebarProvider>
    )
}
