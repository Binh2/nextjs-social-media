"use client";
import { Header } from '@/components/Header';
import { SessionProvider, signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image'
import Link, { useRouter } from 'next/navigation';
import { FormEvent, useEffect } from 'react';

export default function SessionProvidedHome() {
  return <SessionProvider>
    <Home />
  </SessionProvider>
}

function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();

  // Navigate to sign in page when user is not signed in
  useEffect(() => {
    if (status == 'unauthenticated') router.push('/signin')
  }, [status, router]);

  return (<>
    <Header></Header>
    {/* <LeftSidebar></LeftSidebar> */}
    <main>
    </main>
    {/* <RightSidebar></RightSidebar> */}
  </>);
}
