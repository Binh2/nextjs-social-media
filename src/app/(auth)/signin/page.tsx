"use client";
import { SessionProvider, signIn, useSession } from "next-auth/react";
import { FormEvent, FormEventHandler, MouseEventHandler, useEffect, useState } from "react";
import { Intro } from "../../../components/common/Intro"
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AppLogo } from "@/components/common/AppLogo";
import Head from 'next/head';

export default function SessionProvided() {
  return (<>
    <SessionProvider>
      <SignIn></SignIn>
    </SessionProvider>
  </>)
}

const saltRounds = 10;
function SignIn() {
  const session = useSession();
  const router = useRouter();

  const [ username, setUsername ] = useState("");
  const [ password, setPassword ] = useState("");

  useEffect(() => {
    if (session.status == 'authenticated') router.push('/');
  }, [router, session])

  const signInUserWithCredentials: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const user = await signIn("credentials", {
      redirect: true,
      type: "signin",
      username,
      password
    });
    console.log(user)
    if (user) router.push('/')
  }
  const signInUserWithGitHub: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();
    await signIn("github", {
      redirect: true,
    });
  }

  return (<>
    <div className="flex justify-center pt-10 mb-6">
      <AppLogo />
    </div>

    <form onSubmit={signInUserWithCredentials} className="grid max-w-2xl grid-cols-2 gap-4 p-6 mx-auto mt-8 bg-white rounded-md shadow-md">
      
      <div className="col-span-1 pr-2 bg-gray-100">
        <h2 className="mb-4 text-2xl font-bold">Log In</h2>
        <p className="text-justify text-gray-500 bg-slate-100">Chào mừng bạn đến với mạng xã hội SocialSphere, nơi đặc biệt cho phép bạn là chính mình, sáng tạo hình ảnh và chia sẻ những khoảnh khắc cuộc sống đáng nhớ.</p>
      </div>

      <div className="col-span-1">
        <div className="mb-4">
          <label className="block mb-2">Username:</label>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Password:</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex items-center mb-4">
          <span className="mr-1">Don&apos;t have an account?</span>
          <a href="/signup" className="text-blue-500">Sign up</a>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <button className="h-12 px-4 py-2 mr-2 text-white bg-blue-500 rounded-md">Submit</button>
          </div>
          <div>
            <button
              onClick={signInUserWithGitHub}
              className="h-12 px-4 py-2 text-gray-700 bg-gray-200 rounded-md" >Sign in with GitHub </button>
          </div>
        </div>
      </div>
    </form>
  </>)
}