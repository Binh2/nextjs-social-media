import { useState } from "react";
import { WithLabel } from "./WithLabel";

type Props = {
  id: string,
  label: string,
  type?: string,
}

export function Input({id, label, type = 'text', ...props}: Props) {
  const [ focus, setFocus ] = useState(false);
  const [ value, setValue ] = useState('');
  return (<>
    <WithLabel focus={focus} label={label} htmlFor={id} value={value}>
      <input className={`w-full outline-none px-2`}
        type={type}
        id={id} value={value} {...props} onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
        ></input>
      </WithLabel>
  </>)
}