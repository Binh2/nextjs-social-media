"use client"
import { CoverImage } from "@/components/common/CoverImage";
import { Navbar } from "./Navbar";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./style.css";

const queryClient = new QueryClient()

export default function Layout({children}: {children: JSX.Element}) {
  return (<>
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <Navbar />
        <div className="mx-[10%]">
          <CoverImage />
          { children }
        </div>
      </SessionProvider>
    </QueryClientProvider>
  </>)
}
