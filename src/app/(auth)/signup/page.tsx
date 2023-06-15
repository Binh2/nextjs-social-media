"use client"
import { useState } from "react";
import Image from 'next/image';
import DatePicker from "react-datepicker";
import { Intro } from "@/components/common/Intro"
import Link from "next/link";
import "react-datepicker/dist/react-datepicker.css";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const FormSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string({required_error: "Email is required"}).email("This is not an email"),
  username: z.string({required_error: "Username is required"}).min(6, "Username must be at least 6 characters"),
  isMale: z.coerce.boolean().nullable(),
  birthday: z.date().optional(),
  password: z.string({required_error: "Password is required"}).min(6, "Password must be at least 6 characters"),
  termsAndConditions: z.literal(true, {
    invalid_type_error: "You must accept Terms and Conditions.",
  }),
});
type FormSchemaType = z.infer<typeof FormSchema>;

export default function SignUpPage() {
  const {
    control,
    register,
    reset,
    // watch,
    handleSubmit: handleSubmitWrapper,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });
  const [ isPasswordVisible, setIsPasswordVisible ] = useState(false);
  const router = useRouter()

  const handleSubmit = handleSubmitWrapper( async (data) => {
    // e.preventDefault();
    // const data = getValues();
    console.log(data)
    const { username, password, birthday, email, isMale, firstName, lastName } = data;
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
  })

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
                {...register("firstName")}
              />
              <input type="text" className="w-[50%] py-1 px-2 border border-soid border-black rounded-lg rounded-l" placeholder="Smith"
                {...register("lastName")}
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
                // value={email} onChange={e => setEmail(e.target.value)}
                {...register("email")}
              />
            </div>
            { errors.email && <p className="text-xm text-red-500">{errors.email.message || ''}</p>}
          </div>

          <div className="">
            <label htmlFor="username" className="font-bold text-md">
              Username
            </label>
            <div>
              <input className="w-full py-1 px-2 border border-soid border-black rounded-lg" 
                id="username" type="text" placeholder="jsmith" 
                // value={username} onChange={e => setUsername(e.target.value)}
                {...register("username")}
              />
            </div>
            { errors.username && <p className="text-xm text-red-500">{errors.username.message || ''}</p>}
          </div>

          <div className="grid grid-cols-[1fr_auto] grid-rows-[auto_auto_auto]">
            <label htmlFor="gender" className="text-md font-bold">
              Gender
            </label>
            <label htmlFor="birthday" className="font-bold text-md">
              Birthday
            </label>
            <div className="min-w-12">
              <select className="w-full py-1 px-2 border border-soid border-black rounded-lg"
                id="gender" 
                {...register("isMale")}
              >
                <option value="true">Female</option>
                <option value="false">Male</option>
                <option value="null">Other</option>
              </select>
            </div>
            <div>
              <Controller
                control={control}
                name='birthday'
                render={({ field }) => (
                  <DatePicker className="w-full py-1 px-2 border border-soid border-black rounded-lg" 
                    // selected={birthday} onChange={date => setBirthday(date)}
                    selected={field.value} onChange={(date) => field.onChange(date)}
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                  ></DatePicker>
                )}
              ></Controller>
            </div>
            { errors.isMale && <p className="text-xm text-red-500">{errors.isMale.message || ''}</p>}
            { errors.birthday && <p className="text-xm text-red-500">{errors.birthday.message || ''}</p>}
          </div>

          <div className="">
            <label htmlFor="password" className="font-bold text-md">
              Password
            </label>
            <div className="relative">
              <input className="w-full py-1 px-2 border border-soid border-black rounded-lg"
                id="password" placeholder="Password"
                type={isPasswordVisible ? "text": "password"} 
                // value={password} onChange={e => setPassword(e.target.value)}
                {...register("password")}
              />
              {
                isPasswordVisible ? 
                <div className="absolute right-2 top-0 h-8"><Image className="relative top-[50%] -translate-y-[50%]" src="password-visible-icon.svg" alt="Password visible" width={0} height={0} style={{width: "1rem", height: "auto"}} onClick={() => setIsPasswordVisible(false)} /></div>:
                <div className="absolute right-2 top-0 h-8"><Image className="relative top-[50%] -translate-y-[50%]" src="password-hidden-icon.svg" alt="Password hide" width={0} height={0} style={{width: "1rem", height: "auto"}} onClick={() => setIsPasswordVisible(true)} /></div>
              }
            </div>
            { errors.password && <p className="text-xm text-red-500">{errors.password.message || ''}</p>}
          </div>
        </div>

        <div className="">
          <input id="term-and-condition" type="checkbox" className="mr-1" {...register('termsAndConditions')} />
          <label htmlFor="term-and-condition" className="text-xs">Agree with Terms & Conditons</label>
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
