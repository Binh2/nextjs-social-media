import { CheckIcon } from "@heroicons/react/24/solid";

export function Checkbox({id='', name='', checked=false, onChange, className=``}: {id?: string, name?: string, checked: boolean, onChange: (value: boolean) => void, className?: string}) {
  return (<div className={`relative inline ${className}`}>
    <input className={`w-4 h-4 absolute opacity-0 z-[2]`}
    type="checkbox" id={id} name={name} checked={checked}
    onChange={() => {onChange && onChange(!checked)}} />
    <div className={`w-4 h-4 border inline-flex justify-center items-center
    ${checked ? 'bg-teal-500': 'border-gray-500'}`}>
      <CheckIcon className={`text-white ${!checked && 'opacity-0'}`} />
    </div>
  </div>)
}