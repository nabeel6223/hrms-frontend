import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./GlobalStyles.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SidebarProvider } from "./context/SidebarContext.jsx";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute → data considered fresh
      cacheTime: 5 * 60 * 1000, // 5 minutes → kept in memory
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <SidebarProvider>
          <App />
        </SidebarProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
);
