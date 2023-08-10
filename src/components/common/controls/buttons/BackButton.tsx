export function BackButton({className='', onClick}: {className?: string, onClick?: () => void}) {
  return (<button type="button" className={`bg-gray-200 rounded-full ${className}`} onClick={onClick}>
    <LeftArrowIcon className={`w-8 h-8 m-2`} />
  </button>)
}
function LeftArrowIcon({className='w-6 h-6'}: {className?: string}) {
  return (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`${className}`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
  </svg>);
}