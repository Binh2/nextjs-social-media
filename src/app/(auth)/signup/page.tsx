"use client"
import { SessionProvider, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AppLogo } from "@/components/AppLogo";

export default function ContextProvided() {
  return (<>
    <SessionProvider>
      <SignUp></SignUp>
    </SessionProvider>
  </>)
}

function SignUp(props: any) {
  const session = useSession();
  const router = useRouter();

  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    isMale: true,
    birthday: new Date(),
    password: '',
  });

  useEffect(() => {
    if (session.status == 'authenticated') router.push('/');
  }, [session, router])

  const handleChange = (prop: string) => (event: any) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleIsMaleChange = (event: any) => {
    setValues({ ...values, isMale: event.target.value == "Male" })
  };
  const handleBirthdayChange = (event: any) => {
    setValues({ ...values, birthday: new Date(event.target.value) })
  }

  const handleSigninUser = async (event: any) => {
    // Still not working
    return;
    event.preventDefault();
    await signIn("credentials", {
      redirect: true,
      username: values.username,
      password: values.password
    });
  }
  return (<>
    <div className="flex justify-center mb-6 pt-10">
      <AppLogo />
    </div>

    <form onSubmit={handleSigninUser} className="max-w-md mx-auto mt-8 bg-white p-6 rounded-md shadow-md">
      <h1 className="text-3xl font-bold mb-4 flex justify-center">Create an account</h1>
      <div className="mb-4 grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-2">First name:</label>
          <input
            type="text"
            value={values.firstName}
            onChange={handleChange('firstName')}
            className="w-full border border-gray-300 rounded-md px-4 py-2"
            placeholder="First name"
          />
        </div>
        <div>
          <label className="block mb-2">Last name:</label>
          <input
            type="text"
            value={values.lastName}
            onChange={handleChange('lastName')}
            className="w-full border border-gray-300 rounded-md px-4 py-2"
            placeholder="Last name"
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Email:</label>
        <input
          type="text"
          value={values.email}
          onChange={handleChange('email')}
          className="w-full border border-gray-300 rounded-md px-4 py-2"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Username:</label>
        <input
          type="text"
          value={values.username}
          onChange={handleChange('username')}
          className="w-full border border-gray-300 rounded-md px-4 py-2"
        />
      </div>
      <div className="mb-4 grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-2">Gender:</label>
          <select
            value={values.isMale ? 'Male' : 'Female'}
            onChange={handleIsMaleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div>
          <label className="block mb-2">Birthday:</label>
          <input
            type="date"
            value={values.birthday.toISOString().split('T')[0]}
            onChange={handleBirthdayChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2"
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Password:</label>
        <input
          type="password"
          value={values.password}
          onChange={handleChange('password')}
          className="w-full border border-gray-300 rounded-md px-4 py-2"
        />
      </div>
      <div className="flex justify-center">
        <button className="bg-blue-500 text-white px-8 py-2 rounded-md">Submit</button>
      </div>
    </form>



  </>);
}