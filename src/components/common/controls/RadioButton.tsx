import { useState } from "react";

export function RadioButton({id, name, value, checked, onChange, className=``}: {id?: string, name?: string, value?: string, checked?: boolean, onChange?: (value: string) => void, className?: string}) {
  const [ currentValue, setCurrentValue ] = useState(checked && value);
  const internalChecked = checked != undefined ? checked : currentValue == value
  return (<div className={`relative ${className}`}>
    <input className={`w-4 h-4 absolute opacity-0`}
    type="radio" id={id} name={name} value={value} checked={internalChecked}
    onChange={e => {onChange && onChange(e.target.value); setCurrentValue(e.target.value); console.log(e.target.value)}} />
    <div className={`w-4 h-4 border rounded-full flex justify-center items-center
    ${internalChecked ? 'border-teal-500': 'border-gray-500'}`}>
      { internalChecked && <div className={`rounded-full w-[10px] h-[10px] bg-teal-500`}></div> }
    </div>
  </div>)
}