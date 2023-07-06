"use client";
import { SessionProvider, signIn, useSession } from "next-auth/react";
import { FormEvent, FormEventHandler, MouseEventHandler, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppLogo } from "@/components/common";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function SessionProvided() {
  return (<>
    <SessionProvider>
      <SignIn></SignIn>
    </SessionProvider>
  </>)
}

const FormSchema = z.object({
  username: z.union([
    z.string({required_error: "Username is required"}).min(6, "Username must be at least 6 characters"),
    z.string({required_error: "Email is required"}).email("This is not an email"),
  ]),
  password: z.string({required_error: "Password is required"}).min(6, "Password must be at least 6 characters"),
});
type FormSchemaType = z.infer<typeof FormSchema>;

function SignIn() {
  const { status, data: session } = useSession();
  console.log(status, session)
  const router = useRouter();

  const { 
    control, register, reset,
    // watch,
    handleSubmit: handleSubmitWrapper,
    getValues, formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  const signInUserWithCredentials: FormEventHandler<HTMLFormElement> = handleSubmitWrapper(async (data) => {
    const { username, password } = data;
    const user = await signIn("credentials", {
      redirect: true,
      type: "signin",
      username: username,
      email: username,
      password: password,
      callbackUrl: '/', 
    });
  })
  const signInUserWithGitHub: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();
    await signIn("github", {
      redirect: true,
      callBackUrl: '/',
    });
  }
  const isLoading = isSubmitting || status == 'loading'

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
            {...register('username')}
            disabled={isLoading}
            className="w-full px-4 py-2 border border-gray-300 rounded-md disabled:opacity-20"
          />
        </div>
        { errors.username && <p className="text-red-500 text-xm">{errors.username.message || ''}</p>}
        <div className="mb-4">
          <label className="block mb-2">Password:</label>
          <input
            type="password"
            {...register('password')}
            disabled={isLoading}
            className="w-full px-4 py-2 border border-gray-300 rounded-md disabled:opacity-20"
          />
        </div>
        { errors.password && <p className="text-red-500 text-xm">{errors.password.message || ''}</p>}
        <div className="flex items-center mb-4">
          <span className="mr-1">Don&apos;t have an account?</span>
          <a href="/signup" className="text-blue-500">Sign up</a>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <button className="h-12 px-4 py-2 mr-2 text-white bg-blue-500 rounded-md disabled:opacity-20" 
              disabled={isLoading}
            >Submit</button>
          </div>
          <div>
            <button
              onClick={signInUserWithGitHub}
              disabled={isLoading}
              className="h-12 px-4 py-2 text-gray-700 bg-gray-200 rounded-md disabled:opacity-20" >Sign in with GitHub </button>
          </div>
        </div>
      </div>
    </form>
  </>)
}