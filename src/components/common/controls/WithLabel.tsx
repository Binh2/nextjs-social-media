export function WithLabel({children, focus=false, value='', label='', htmlFor}: {children: JSX.Element, focus?: boolean, value?: string, label?: string, htmlFor: string}) {
  return (<>
    <div className={`relative w-full`}>
      <label className={`
        ${focus && 'text-teal-600 text-xs'}
        ${value != '' && 'text-xs'}
        ${focus || value != '' ? 'pt-1' : 'pt-2'}
        px-[calc(0.5rem+1px)] absolute text-base transition-all cursor-text width-full
      `} htmlFor={htmlFor}>{label}</label>
      <div className={`pt-4 pb-1 border border-gray-600 rounded-md w-full`}>
        {children}
      </div>
    </div>
  </>)
}