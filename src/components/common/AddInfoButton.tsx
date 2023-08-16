import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { MouseEventHandler } from "react";

type Props = {
  children: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
export function AddInfoButton(props: Props) {
  return (<>
    <button onClick={props.onClick} className={`flex gap-x-5`}>
      <PlusCircleIcon className={`text-teal-600`} />
      <p className={`text-teal-600`}>{props.children}</p>
    </button>
  </>)
}