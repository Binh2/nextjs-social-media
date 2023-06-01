"use client";
import { SessionProvider, signIn, useSession } from "next-auth/react";
import { FormEvent, MouseEventHandler, useEffect, useState } from "react";
import { Intro } from "../../../components/Intro"
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AppLogo } from "@/components/AppLogo";

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
    <AppLogo></AppLogo>
    <Intro></Intro>
    <form onSubmit={signInUserWithCredentials}>
      <h2>Log in</h2>
      <div>
        <label>Username: 
          <input type="text" value={values.username} onChange={handleChange('username')}></input>
        </label>
      </div>
      <div>
        <label>Password: 
          <input type="password" value={values.password} onChange={handleChange('password')}></input>
        </label>
      </div>
      <div>
        <span>Don&lsquo;t have an account?</span>
        {' '}
        <Link href="/signup">Sign up</Link>
      </div>
      <div>
        <button>Submit</button>
      </div>
      <button onClick={signInUserWithGitHub}>Sign in to GitHub</button>
    </form>
  </>)
   
}