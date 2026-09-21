import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute('/')({
    component: HomePage
})

function HomePage() {
    return (
        <div>
            <h1 className="text-2xl font-bold">Hello world</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae quisquam quia harum atque quo ad, amet deserunt soluta maiores quas provident obcaecati maxime esse porro, est cumque mollitia ea ab!</p>
        </div>
    )
}

