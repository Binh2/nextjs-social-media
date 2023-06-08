"use client";
import { SessionProvider, signIn, useSession } from "next-auth/react";
import { FormEvent, MouseEventHandler, useEffect, useState } from "react";
import { Intro } from "../../../components/Intro"
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AppLogo } from "@/components/AppLogo";
import Head from 'next/head';

export default function SessionProvided() {
  return (<>
    <SessionProvider>
      <SignIn></SignIn>
    </SessionProvider>
  </>)
}

// Currently only work for GitHub sign in
function SignIn() {
  const session = useSession();
  const router = useRouter();

  const [values, setValues] = useState({
    username: '',
    password: '',
  });

  useEffect(() => {
    if (session.status == 'authenticated') router.push('/');
  }, [router, session])

  const handleChange = (prop: string) => (event: any) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const signInUserWithCredentials = async (event: any) => {
    event.preventDefault();
    await signIn("credentials", {
      redirect: true,
      username: values.username,
      password: values.password
    });
  }
  const signInUserWithGitHub = async (event: any) => {
    event.preventDefault();
    await signIn("github", {
      redirect: true,
    });
  }

  return (<>
    <div className="flex justify-center mb-6 pt-10">
      <AppLogo />
    </div>
    {/* <form onSubmit={signInUserWithCredentials} className="max-w-md mx-auto mt-8 bg-white p-6 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Log in</h2>
      <div className="mb-4">
        <label className="block mb-2">Username:</label>
        <input
          type="text"
          value={values.username}
          onChange={handleChange("username")}
          className="w-full border border-gray-300 rounded-md px-4 py-2"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Password:</label>
        <input
          type="password"
          value={values.password}
          onChange={handleChange("password")}
          className="w-full border border-gray-300 rounded-md px-4 py-2"
        />
      </div>
      <div className="mb-4 flex items-center">
        <span className="mr-1">Don&apos;t have an account?</span>
        <a href="/signup" className="text-blue-500">Sign up</a>
      </div>
      <div className="mb-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2">Submit</button>
        <button
          onClick={signInUserWithGitHub}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md"
        >
          Sign in with GitHub
        </button>
      </div>
    </form> */}

    <form onSubmit={signInUserWithCredentials} className="max-w-2xl mx-auto mt-8 bg-white p-6 rounded-md shadow-md grid grid-cols-2 gap-4">
      
      <div className="col-span-1 pr-2 bg-gray-100">
        <h2 className="text-2xl font-bold mb-4">Log In</h2>
        <p className="text-gray-500 text-justify bg-slate-100">Chào mừng bạn đến với mạng xã hội SocialSphere, nơi đặc biệt cho phép bạn là chính mình, sáng tạo hình ảnh và chia sẻ những khoảnh khắc cuộc sống đáng nhớ.</p>
      </div>

      <div className="col-span-1">
        <div className="mb-4">
          <label className="block mb-2">Username:</label>
          <input
            type="text"
            value={values.username}
            onChange={handleChange("username")}
            className="w-full border border-gray-300 rounded-md px-4 py-2"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Password:</label>
          <input
            type="password"
            value={values.password}
            onChange={handleChange("password")}
            className="w-full border border-gray-300 rounded-md px-4 py-2"
          />
        </div>
        <div className="mb-4 flex items-center">
          <span className="mr-1">Don&apos;t have an account?</span>
          <a href="/signup" className="text-blue-500">Sign up</a>
        </div>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 h-12">Submit</button>
          </div>
          <div>
            <button
              onClick={signInUserWithGitHub}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md h-12" >Sign in with GitHub </button>
          </div>
        </div>
      </div>
    </form>





  </>)

}