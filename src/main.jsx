import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import Router from "./config/Router";
import { AuthProvider } from "./contexts/AuthContext";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NotificationsProvider } from "reapop";
import { HelmetProvider } from "react-helmet-async";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <NotificationsProvider>
            <Router />
            <Toaster position="top-right" reverseOrder={false} />
          </NotificationsProvider>
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  </StrictMode>
);
