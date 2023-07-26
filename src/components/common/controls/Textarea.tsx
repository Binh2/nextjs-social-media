import { useState } from "react";
import { WithLabel } from "./WithLabel";

type Props = {
  id: string,
  label: string,
  className?: string
  value?: string
  onChange: (value: string) => void
}

export function Textarea({id, label, className='', value='', onChange}: Props) {
  const [ focus, setFocus ] = useState(false);
  return (<>
    <WithLabel htmlFor={id} label={label} focus={focus} value={value} className={`${className}`}>
      <textarea className={`px-2 outline-none w-full resize-none`} 
        id={id} value={value} onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
      ></textarea>
    </WithLabel>
  </>)
}