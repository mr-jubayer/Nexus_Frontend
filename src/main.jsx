import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import Router from "./config/Router";
import { AuthProvider } from "./contexts/AuthContext";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <Toaster position="top-right" reverseOrder={false} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
