import { Slide, ToastContainer } from "react-toastify";
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
    <main>
      <QueryClientProvider client={queryClient}>
        <ToastContainer
          autoClose={2000}
          theme="colored"
          transition={Slide}
          closeOnClick
          pauseOnFocusLoss={false}
        />
        <AppRoutes />
        {/* React Query Devtools for debugging queries */}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </main>
  );
}
