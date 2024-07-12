"use client";

import { Toaster } from "@/components/ui/toaster";
import queryClient from "@/services/http";
import { QueryClientProvider } from "@tanstack/react-query";

export function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        {children}
        <Toaster />
      </QueryClientProvider>
    </>
  );
}
