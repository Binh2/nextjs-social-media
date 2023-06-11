"use client"
import { useState } from "react";
import Image from 'next/image';
import DatePicker from "react-datepicker";
import { Intro } from "@/components/common/Intro"
import Link from "next/link";
// import "./SignUp.css";
import "react-datepicker/dist/react-datepicker.css";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function SignUpPage() {
  const {
    register,
    handleSubmit: handleSubmitWrapper,
    formState: { errors },
  } = useForm();
  const [ username, setUsername ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ birthday, setBirthday ] = useState<Date | null>(new Date());
  const [ email, setEmail ] = useState("");
  const [ isMale, setIsMale ] = useState<boolean | null>(true);
  const [ firstName, setFirstName ] = useState("");
  const [ lastName, setLastName ] = useState("");
  const [ isPasswordVisible, setIsPasswordVisible ] = useState(false);
  const router = useRouter()

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const user = await signIn("credentials", {
      type: "signup",
      username,
      password,
      birthday,
      email,
      isMale,
      firstName,
      lastName,
    })
    if (user) router.push('/signin');
  };

  return (<main className="flex bg-[#eee] min-h-[100vh] px-4 gap-x-4">
    <Intro className="w-[50%]"></Intro>
    <div className="w-[50%] my-auto">
      <h1 className="text-2xl font-bold text-center mb-1">Create an Account</h1>
      <form onSubmit={handleSubmit} className="bg-white px-6 py-2">
        <div className="flex flex-col gap-3">
          <div>
            <label htmlFor="first-name" className="text-md font-bold">
              Your name
            </label>
            <div className="flex">
              <input id="first-name" className="w-[50%] py-1 px-2 border border-soid border-black rounded-lg rounded-r" type="text" placeholder="John"
                value={firstName} onChange={e => setFirstName(e.target.value)}
              />
              <input type="text" className="w-[50%] py-1 px-2 border border-soid border-black rounded-lg rounded-l" placeholder="Smith"
                value={lastName} onChange={e => setLastName(e.target.value)}
              />
            </div>
          </div>

          <div className="">
            <label htmlFor="email" className="text-md font-bold">
              Email Address
            </label>
            <div>
              <input className="w-full py-1 px-2 border border-soid border-black rounded-lg"
                id="email" type="text" placeholder="jsmith@example.com"
                value={email} onChange={e => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="">
            <label htmlFor="username" className="font-bold text-md">
              Username
            </label>
            <div>
              <input className="w-full py-1 px-2 border border-soid border-black rounded-lg" 
                id="username" type="text" placeholder="jsmith" 
                value={username} onChange={e => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-[1fr_auto] grid-flow-col grid-rows-[auto_auto]">
            <label htmlFor="gender" className="text-md font-bold">
              Gender
            </label>
            <div className="min-w-12">
              <select className="w-full py-1 px-2 border border-soid border-black rounded-lg"
                id="gender" value={isMale ? "male": "female"} 
                onChange={({target: {value}}) => setIsMale(value == "male" ? true : value == "female" ? false : null)}
              >
                <option value="male">Female</option>
                <option value="female">Male</option>
                <option value="null">Other</option>
              </select>
            </div>
            <label htmlFor="birthday" className="font-bold text-md">
              Birthday
            </label>
            <div>
              <DatePicker className="w-full py-1 px-2 border border-soid border-black rounded-lg" 
                selected={birthday} onChange={date => setBirthday(date)}
                peekNextMonth
                showMonthDropdown
                showYearDropdown
              ></DatePicker>
            </div>
          </div>

          <div className="">
            <label htmlFor="password" className="font-bold text-md">
              Password
            </label>
            <div className="relative">
              <input className="w-full py-1 px-2 border border-soid border-black rounded-lg"
                id="password" name="password" placeholder="Password"
                type={isPasswordVisible ? "text": "password"} 
                value={password} onChange={e => setPassword(e.target.value)}
              />
              {
                isPasswordVisible ? 
                <div className="absolute right-2 top-0 h-8"><Image className="relative top-[50%] -translate-y-[50%]" src="password-visible-icon.svg" alt="Password visible" width={0} height={0} style={{width: "1rem", height: "auto"}} onClick={() => setIsPasswordVisible(false)} /></div>:
                <div className="absolute right-2 top-0 h-8"><Image className="relative top-[50%] -translate-y-[50%]" src="password-hidden-icon.svg" alt="Password hide" width={0} height={0} style={{width: "1rem", height: "auto"}} onClick={() => setIsPasswordVisible(true)} /></div>
              }
            </div>
          </div>
        </div>

        <div className="">
          <input id="term-and-condition" type="checkbox" className="mr-1" />
          <label htmlFor="term-and-condition" className="text-xs">Agree with Term & Conditons</label>
        </div>
        <button className="bg-teal-500 mx-auto my-2 px-8 py-1 font-bold uppercase rounded-lg block">
          Sign Up
        </button>

        <p className="font-bold text-sm text-center">
          <span className="">Already have account? {" "}</span>
          <Link className="text-teal-500" href="/signin">
            Sign in to account
          </Link>
        </p>
      </form>
    </div>
  </main>);
}
