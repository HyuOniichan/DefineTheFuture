import { Outlet } from "@tanstack/react-router"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/shared/Sidebar"

export default function RootLayout() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="flex flex-1 min-h-screen">
                <SidebarTrigger className="m-2 z-30" />
                <div className="w-full max-w-[1400px] pt-0 px-12 pb-15">
                    <Outlet />
                </div>
            </main>
        </SidebarProvider>
    )
}
