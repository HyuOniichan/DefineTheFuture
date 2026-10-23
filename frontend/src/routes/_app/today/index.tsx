import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/today/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/today/"!</div>
}
