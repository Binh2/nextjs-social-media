"use client"
import { CoverImage } from "@/components/common/CoverImage";
import { Navbar } from "./Navbar";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./style.css";
import { useDebuggerStop } from "@/hooks";
import { AuthGuard } from "@/components/common";

const queryClient = new QueryClient()

export default function Layout({children}: {children: JSX.Element}) {
  useDebuggerStop()
  return (<>
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <AuthGuard>
          <Navbar />
          <div className="mx-[10%]">
            <CoverImage className={`mb-4`} />
            { children }
          </div>
        </AuthGuard>
      </SessionProvider>
    </QueryClientProvider>
  </>)
}
