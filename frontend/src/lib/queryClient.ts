import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: parseInt(import.meta.env.VITE_TANSTACK_QUERY_CLIENT_RETRY || "1"),
			staleTime: parseInt(import.meta.env.VITE_TANSTACK_QUERY_CLIENT_STALE_TIME || "Infinity")
		}
	}
});

export default queryClient;
