import Image from "next/image"
import { MouseEventHandler } from "react"

type Props = {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  size?: number;
}

export function CloseButton({ onClick, size=25 }: Props) {
  return (<>
    <button className="p-2 mr-2 bg-gray-200 rounded-full" onClick={onClick}>
      <Image src="/close-icon.svg" alt="Close" width={size} height={size} />
    </button> 
  </>)
}