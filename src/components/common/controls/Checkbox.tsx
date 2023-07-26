export function Checkbox({id='', name='', checked=false, onChange, className=``}: {id?: string, name?: string, checked: boolean, onChange: (value: boolean) => void, className?: string}) {
  return (<div className={`relative inline ${className}`}>
    <div className={`w-4 h-4 inline-flex justify-center items-center border
    ${checked ? 'bg-teal-500 border-teal-500': 'border-gray-500'}`}>
      <CheckIcon className={`text-white font-bold ${!checked && 'opacity-0'}`} strokeWidth={4} />
      <input className={`w-4 h-4 absolute opacity-0`}
      type="checkbox" id={id} name={name} checked={checked}
      onChange={() => {onChange && onChange(!checked)}} />
    </div>
  </div>)
}

function CheckIcon({className='', strokeWidth=1.5}: {className?: string, strokeWidth?: number}) {
  return (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" className={className || 'w-6 h-6'}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>);
}