import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router"

interface AuthRouterContext {
    queryClient: QueryClient
}

export const Route = createRootRouteWithContext<AuthRouterContext>()({
    component: RootLayout
});

function RootLayout() {
    return <Outlet />
}
