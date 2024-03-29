"use client"
import * as Urls from "@/lib/urls";
import { SessionProvider, useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react"

export default function SessionProvided() {
  return <SessionProvider><Page /></SessionProvider>
}

function Page() {
  const router = useRouter();
  const params = useParams();
  const { status, data: session } = useSession();
  console.log(router, params)

  useEffect(() => {
    if (params && status == "authenticated") 
      router.push(`${Urls.user(
        session.user.handle, 
        params.path ? 
          typeof params.path == 'string' ? 
          '/' + params.path : 
          '/' + params.path.join('/') : 
        ''
      )}`)
  }, [status, session, router, params])
  return <p>Redirecting...</p>
}