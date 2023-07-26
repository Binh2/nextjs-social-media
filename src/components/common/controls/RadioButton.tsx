export function RadioButton({id='', name='', value='', checked=false, onChange, className=``}: {id?: string, name?: string, value?: string, checked?: boolean, onChange?: (value: string) => void, className?: string}) {
  return (<div className={`relative inline-flex justify-center ${className}`}>
    <input className={`w-4 h-4 absolute opacity-0`}
    type="radio" id={id} name={name} value={value} checked={checked}
    onChange={e => {onChange && onChange(e.target.value)}} />
    <div className={`w-4 h-4 border rounded-full inline-flex justify-center items-center
    ${checked ? 'border-teal-500': 'border-gray-500'}`}>
      <div className={`rounded-full w-[10px] h-[10px] bg-teal-500 ${!checked && 'opacity-0'}`}></div>
    </div>
  </div>)
}