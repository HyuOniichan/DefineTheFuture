import { Outlet } from "@tanstack/react-router"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Sidebar, Header } from "@/components/shared";



export default function RootLayout() {
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
