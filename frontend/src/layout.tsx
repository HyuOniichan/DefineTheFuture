import { Outlet } from "@tanstack/react-router"

export default function RootLayout() {
    return (
        <html lang="en">
            <body className="antialiased">
                <Outlet />
            </body>
        </html>
    )
}
