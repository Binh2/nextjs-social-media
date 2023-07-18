"use client"
import { VerticalLine } from "@/components/common/VerticalLine";
import { Navbar } from "./Navbar";

export default function About({ children }: {children: JSX.Element}) {
  return (<>
    <div className={`flex bg-gray-200 rounded-md`}>
      <div className="px-1 py-4">
        <h1 className={`px-2 text-xl font-bold`}>About</h1>
        <Navbar></Navbar>
      </div>
      <VerticalLine className={`bg-gray-500`}></VerticalLine>
      <div className={`py-2 px-2`}>{children}</div>
    </div>
  </>)
}