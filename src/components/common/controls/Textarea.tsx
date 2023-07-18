import { useState } from "react";
import { WithLabel } from "./WithLabel";

type Props = {
  id: string,
  label: string,
}

export function Textarea({id, label, ...props}: Props) {
  const [ focus, setFocus ] = useState(false);
  const [ value, setValue ] = useState('');
  return (<>
    <WithLabel htmlFor={id} label={label} focus={focus}>
      <textarea className={`px-2 outline-none w-full`} 
        id={id} value={value} {...props} onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
      ></textarea>
    </WithLabel>
  </>)
}