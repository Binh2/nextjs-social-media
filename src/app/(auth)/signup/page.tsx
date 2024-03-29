"use client"
import { useEffect, useState } from "react";
import Image from 'next/image';
import DatePicker from "react-datepicker";
import { Intro } from "@/components/common"
import Link from "next/link";
import "react-datepicker/dist/react-datepicker.css";
import { SessionProvider, signIn, useSession } from "next-auth/react";
import { z } from "zod";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const errorMap = (message: string): z.ZodErrorMap => (error, ctx) => {
  if (error.code == z.ZodIssueCode.invalid_literal) return { message } 
  return { message: ctx.defaultError };
};

const FormSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string({required_error: "Email is required"}).email("This is not an email"),
  username: z.string({required_error: "Username is required"}).min(6, "Username must be at least 6 characters"),
  isMale: z.coerce.boolean().nullable(),
  birthday: z.date().optional(),
  password: z.string({required_error: "Password is required"}).min(6, "Password must be at least 6 characters"),
  termsAndConditions: z.literal<boolean>(true, { errorMap: errorMap("You must accept Terms and Conditions.") }),
});
type FormSchemaType = z.infer<typeof FormSchema>;

export default function SignUpPage() {
  const { control, register, reset, handleSubmit, getValues, formState: { errors, isSubmitting } } = 
  useForm<FormSchemaType>({
    mode: 'onChange',
    resolver: zodResolver(FormSchema),
  });
  const [ isPasswordVisible, setIsPasswordVisible ] = useState(false);
  const { status, data: session } = useSession();

  const submit = handleSubmit( async (data) => {
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
      redirect: true,
      callbackUrl: '/',
    })
  })

  const isLoading = isSubmitting || status == 'loading'

  return (<main className="flex bg-[#eee] min-h-[100vh] px-4 gap-x-4">
    <Intro className="w-[50%]"></Intro>
    <div className="w-[50%] my-auto">
      <h1 className="mb-1 text-2xl font-bold text-center">Create an Account</h1>
      <form onSubmit={submit} className="px-6 py-2 bg-white">
        <div className="flex flex-col gap-3">
          <div>
            <label htmlFor="first-name" className="font-bold text-md">
              Your name
            </label>
            <div className="flex">
              <input id="first-name" className="w-[50%] py-1 px-2 border border-soid border-black rounded-lg rounded-r disabled:opacity-20" type="text" placeholder="John"
                disabled={isLoading}
                {...register("firstName")}
              />
              <input type="text" className="w-[50%] py-1 px-2 border border-soid border-black rounded-lg rounded-l disabled:opacity-20" placeholder="Smith"
                disabled={isLoading}
                {...register("lastName")}
              />
            </div>
          </div>

          <div className="">
            <label htmlFor="email" className="font-bold text-md">
              Email Address
            </label>
            <div>
              <input className="w-full px-2 py-1 border border-black rounded-lg border-soid disabled:opacity-20"
                id="email" type="text" placeholder="jsmith@example.com"
                disabled={isLoading}
                {...register("email")}
              />
            </div>
            { errors.email && <p className="text-red-500 text-sm">{errors.email.message || ''}</p>}
          </div>

          <div className="">
            <label htmlFor="username" className="font-bold text-md">
              Username
            </label>
            <div>
              <input className="w-full px-2 py-1 border border-black rounded-lg border-soid disabled:opacity-20" 
                id="username" type="text" placeholder="jsmith" 
                disabled={isLoading}
                {...register("username")}
              />
            </div>
            { errors.username && <p className="text-red-500 text-sm">{errors.username.message || ''}</p>}
          </div>

          <div className="grid grid-cols-[1fr_auto] grid-rows-[auto_auto_auto]">
            <label htmlFor="gender" className="font-bold text-md">
              Gender
            </label>
            <label htmlFor="birthday" className="font-bold text-md">
              Birthday
            </label>
            <div className="min-w-12">
              <select className="w-full px-2 py-1 border border-black rounded-lg border-soid disabled:opacity-20"
                id="gender" 
                disabled={isLoading}
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
                  <DatePicker className="w-full px-2 py-1 border border-black border-solid rounded-lg disabled:opacity-20" 
                    disabled={isLoading}
                    selected={field.value} onChange={(date) => (date && field.onChange(date))}
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                  ></DatePicker>
                )}
              ></Controller>
            </div>
            { errors.isMale && <p className="text-red-500 text-sm">{errors.isMale.message || ''}</p>}
            { errors.birthday && <p className="text-red-500 text-sm">{errors.birthday.message || ''}</p>}
          </div>

          <div className="">
            <label htmlFor="password" className="font-bold text-md">
              Password
            </label>
            <div className="relative">
              <input className="w-full px-2 py-1 border border-black rounded-lg border-soid disabled:opacity-20"
                id="password" placeholder="Password"
                type={isPasswordVisible ? "text": "password"} 
                disabled={isLoading}
                {...register("password")}
              />
              {
                isPasswordVisible ? 
                <div className="absolute top-0 h-8 right-2"><Image className="relative top-[50%] -translate-y-[50%]" src="password-visible-icon.svg" alt="Password visible" width={0} height={0} style={{width: "1rem", height: "auto"}} onClick={() => setIsPasswordVisible(false)} /></div>:
                <div className="absolute top-0 h-8 right-2"><Image className="relative top-[50%] -translate-y-[50%]" src="password-hidden-icon.svg" alt="Password hide" width={0} height={0} style={{width: "1rem", height: "auto"}} onClick={() => setIsPasswordVisible(true)} /></div>
              }
            </div>
            { errors.password && <p className="text-red-500 text-sm">{errors.password.message || ''}</p>}
          </div>
        </div>

        <div className="">
          <input id="term-and-condition" type="checkbox" className="mr-1 disabled:opacity-20" {...register('termsAndConditions')} disabled={isLoading} />
          <label htmlFor="term-and-condition" className="text-xs">Agree with Terms & Conditons</label>
        </div>
        { errors.termsAndConditions && <p className="text-red-500 text-sm">{errors.termsAndConditions.message || ''}</p>}
        <button className="block px-8 py-1 mx-auto my-2 font-bold uppercase bg-teal-500 rounded-lg disabled:opacity-20" disabled={isLoading}>
          Sign Up
        </button>

        <p className="text-sm font-bold text-center">
          <span className="">Already have account? {" "}</span>
          <Link className="text-teal-500" href="/signin">
            Sign in to account
          </Link>
        </p>
      </form>
    </div>
  </main>);
}