"use client";
import { SessionProvider, useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

type Props = {
  children: ReactNode
}
export function useAuthGuard() {
  const { status, data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status == "unauthenticated") router.push("/signin")
  }, [ status, router ]);
}

export function AuthGuard({children}: Props) {
  const {status} = useSession();
  useAuthGuard();

  return (
    status == "loading" ?
      <p>Loading session...</p>:
    status == "authenticated" ?
      <>{children}</>:
      <p>Unauthenticated</p>
  )
}