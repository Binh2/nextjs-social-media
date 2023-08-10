import Image from "next/image"
import { MouseEventHandler } from "react"

type Props = {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  size?: number;
  className?: string
}

export function CloseButton({ onClick, className='w-12 h-12'}: Props) {
  return (<>
    <button type="button" className={`p-2 bg-gray-200 rounded-full ${className}`} onClick={onClick}>
      <Image src="/close-icon.svg" alt="Close" width={0} height={0} style={{width: "auto", height: "auto"}} />
    </button> 
  </>)
}