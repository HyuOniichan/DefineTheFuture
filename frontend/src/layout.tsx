import { Outlet } from "@tanstack/react-router"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Sidebar, Breadcrumb, HeaderActions } from "@/components/shared";



export default function RootLayout() {
    return (
        <SidebarProvider>
            <Sidebar />
            <main className="flex flex-1 min-h-screen">
                <SidebarTrigger className="m-2 z-30" />
                <div className="w-full max-w-[1400px] pt-0 px-4 pb-15">
                    <header className="flex h-[52px] items-center justify-between border-b-[1px] border-[#e2e6e2]">
                        <Breadcrumb />
                        <HeaderActions />
                    </header>
                    <Outlet />
                </div>
            </main>
        </SidebarProvider>
    )
}
