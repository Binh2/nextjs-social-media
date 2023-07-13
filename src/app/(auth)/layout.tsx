"use client";
import { SessionProvider } from "next-auth/react";

export default function Layout({children}: {children: JSX.Element}) {
  return (<>
    <SessionProvider>
      {children}
    </SessionProvider>
  </>)
}