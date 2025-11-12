import AppRoutes from "./routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Disable refetching on window focus
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRoutes />
      {/* React Query Devtools for debugging queries */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
