import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { routeTree } from './routeTree.gen'

import "@/index.css";

const router = createRouter({ 
	routeTree,
	trailingSlash: 'never',
});

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router
	}
}

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,	// Prevent reloading page if user change tab
			retry: 1,						// If API failed, retry once more before return error
			staleTime: 1000 * 60 * 5		// Data is regarded as "new" in 5 mins (no need to spam calling API)
		}
	}
});

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	</StrictMode>,
)
