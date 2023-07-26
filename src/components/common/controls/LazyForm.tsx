import { ComponentType, LazyExoticComponent, Suspense, lazy, useState } from "react";
import { Loading } from "../Loading";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

type Props = {
  children: JSX.Element,
  show: boolean,
  setShow: (show: boolean) => void
}

export function LazyForm({children, show, setShow}: Props) {
  return (<>
    { !show && 
      <button className={`flex items-center mb-2`} onClick={() => setShow(true)}>
        <PlusCircleIcon className={`text-teal-500 w-5 h-5`} />
        <span className={`text-teal-500 font-bold ml-1 hover:underline`}>Add a university</span>
      </button>
    }
    <Suspense fallback={<Loading />}>
      {show && children}
    </Suspense>
  </>)
}