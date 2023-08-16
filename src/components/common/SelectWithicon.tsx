"use client"
import { useEffect, useState } from "react";
import Image from 'next/image';

type IconOptionType = { 
  value: string, 
  label: string, 
  src: string,
  alt: string,
  width: number,
  height: number,
  style?: Object,
};

export function SelectWithIcon({options}: { options: IconOptionType[] }) {
  const [ option, setOption ] = useState(options[0])
  const [ menuShown, setMenuShown ] = useState(false);

  useEffect(() => {
    function showMenu() { setMenuShown(false) }
    window.addEventListener("click", showMenu);
    return () => window.removeEventListener("click", showMenu)
  }, [])

  return (<div className={`relative`}>
    <div onClick={(e) => {e.stopPropagation(); setMenuShown(true)}} className={`bg-gray-300 px-2 py-1 rounded-lg hover:bg-gray-200 inline-block`}>
      <OptionWithIcon option={option} />
    </div>
    {menuShown && <div className={`absolute top-[100%] px-2`}>
      {options.map(option => <OptionWithIcon onClick={(option) => setOption(option)} option={option} />)}
    </div>}
  </div>);
}
function OptionWithIcon({option, onClick, className=''}: {option: IconOptionType, onClick?: (option: IconOptionType) => void, className?: string}) {
  const { src, alt, width, height, style, value, label } = option;
  return (<>
    <div className={`flex items-center cursor-default ${className}`} onClick={() => onClick && onClick(option)}>
      <Image src={src} alt={alt} width={width} height={height} className={`inline mr-1`} />
      <p className={`inline`}>{label}</p>
    </div>
  </>)
}