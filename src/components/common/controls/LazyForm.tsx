import { ComponentType, LazyExoticComponent, Suspense, lazy, useState } from "react";
import { Loading } from "../Loading";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

type Props = {
  importPath?: string,
  LazyComponent?: LazyExoticComponent<ComponentType<any>>,
}

export function LazyForm({importPath, LazyComponent, ...props}: Props) {
  if (!importPath && !LazyComponent) throw Error('Have to pass in either importPath or LazyComponent');
  const _LazyComponent = LazyComponent || lazy(() => import(importPath || ''));
  const [ component, setComponent ] = useState<JSX.Element | null>(null);

  return (<>
    { !component && 
      <button className={`flex items-center mb-1`} onClick={() => setComponent(<_LazyComponent {...props} />)} >
        <PlusCircleIcon className={`text-teal-500 w-5 h-5`} />
        <span className={`text-teal-500 font-bold ml-1 hover:underline`}>Add a university</span>
      </button>
    }
    <Suspense fallback={<Loading />}>
      {component || <></>}
    </Suspense>
  </>)
}