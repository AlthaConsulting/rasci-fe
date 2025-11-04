"use client";

import { QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "@altha/core/components/ui/sonner";

import { getQueryClient } from "../lib/query-client";
import { useFlashMessage } from "../hooks/use-flash-message";

export function AppProvider({ children }: { children: React.ReactNode }) {
  void useFlashMessage();
  const queryClient = getQueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster />
    </QueryClientProvider>
  );
}
