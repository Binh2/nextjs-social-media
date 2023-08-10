import Image from "next/image"
import { MouseEventHandler } from "react"

type Props = {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  size?: number;
  className?: string
}

export function CloseButton({ onClick, size=25, className='' }: Props) {
  return (<>
    <button type="button" className={`p-2 bg-gray-200 rounded-full ${className}`} onClick={onClick}>
      <Image src="/close-icon.svg" alt="Close" width={size} height={size} />
    </button> 
  </>)
}