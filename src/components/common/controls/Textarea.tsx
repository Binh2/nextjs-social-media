import { useState } from "react";
import { WithLabel } from "./WithLabel";

type Props = {
  id: string,
  label: string,
  className?: string
}

export function Textarea({id, label, className='', ...props}: Props) {
  const [ focus, setFocus ] = useState(false);
  const [ value, setValue ] = useState('');
  return (<>
    <WithLabel htmlFor={id} label={label} focus={focus} value={value} className={`${className}`}>
      <textarea className={`px-2 outline-none w-full resize-none`} 
        id={id} value={value} {...props} onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
      ></textarea>
    </WithLabel>
  </>)
}