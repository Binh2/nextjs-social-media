"use client"
import { AuthGuard } from "@/components/common";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";

export default function Layout({children}: {children: JSX.Element}) {
  return (
    <Providers>
      {children}
    </Providers>
  )
}

const queryClient = new QueryClient();
export function Providers({children}: {children: JSX.Element}) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <AuthGuard>
          {children}
        </AuthGuard>
      </SessionProvider>
    </QueryClientProvider>
  )
}