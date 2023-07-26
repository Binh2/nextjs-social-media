import { useState } from 'react';
import Image from 'next/image'
import Popup from 'reactjs-popup'
import { CheckIcon, Cog6ToothIcon, UserMinusIcon, UserPlusIcon, UsersIcon } from '@heroicons/react/24/solid';
import { CloseButton } from '../CloseButton';
import { RadioButton } from './RadioButton';
import { Publicities } from '@/lib/constants/publicity';

type OptionType = { 
  title: string
  description: string
  value: string
  icon?: JSX.Element
  src?: string,
  alt?: string,
  width?: number,
  height?: number,
};

const options: OptionType[] = [
  { title: "Public", description: "Anyone on and off Facebook", value: Publicities.PUBLIC, src: "/public-icon.svg", alt: "Public icon", width: 24, height: 24 },
  { title: "Friends", description: "Your friends on Facebook", value: Publicities.FRIENDS, src: "", alt: "Friends icon", width: 24, height: 24, icon: <UsersIcon />},
  { title: "Friends except...", description: "Don't show to some friends", value: "friends-except", src: "", alt: "Friends except... icon", width: 24, height: 24, icon: <UserMinusIcon />},
  { title: "Specific friends", description: "Only show to some friends", value: "specific-friends", src: "", alt: "Specific friends icon", width: 24, height: 24, icon: <UserPlusIcon />},
  { title: "Only me", description: "", value: Publicities.ONLY_ME, src: "/lock-closed.svg", alt: "Only me icon", width: 24, height: 24 },
  { title: "Custom", description: "Include and exclude friends and lists", value: "custom", src: "", alt: "Custom list of friends icon", width: 24, height: 24, icon: <Cog6ToothIcon />},
]
const firstOption = options[0]
export function PublicitySelect({id='publicity-select', value, onChange}: {id?: string, value: string, onChange: (value: string) => void}) {
  const [ open, setOpen ] = useState(false);
  const [ open2, setOpen2 ] = useState(false);
  return (<>
    <button onClick={() => setOpen(true)} className={`flex items-center p-2 rounded-lg bg-gray-100`}>
      <div className={`mr-1`}>
        { firstOption.src ? 
        <Image className={`inline`} src={firstOption.src} alt={firstOption.alt || ''} width={24} height={24} />:
        <div className={`w-6 h-6`}>{firstOption.icon}</div>}
      </div>
      <p className={`inline`}>{firstOption.title}</p>
    </button>

    {/* Overlay */}
    { (open || open2) && <div className={`fixed w-full h-full bg-gray-500 opacity-50 top-0 right-0`}></div>}
    <Popup open={open} onClose={() => setOpen(false)} position="center center">
      <div className={`rounded-lg`}>
        <PopupHeader className={``} onClose={() => setOpen(false)}>Select your audiences</PopupHeader>
        <div className={`bg-white overflow-auto w-[80vw] max-h-[60vh]`}>
          {options.map(option => 
          <Option id={`${id}__${option.value}`} name={id} option={option} onClick={onChange}
          onChange={onChange} checked={value == option.value} 
          className={`${value == option.value ? 'bg-teal-50': 'hover:bg-gray-50'}`} />)}
        </div>
        <PopupFooter onCancel={() => setOpen(false)} onDone={() => setOpen(false)} />
      </div>
    </Popup>
    {/* <Popup open={open2} onClose={() => setOpen2(false)} position="center center">
      <PopupHeader></PopupHeader>
      <PopupFooter />
    </Popup> */}
  </>)
}

function PopupHeader({children='', className='', onClose}: {children?: string, className?: string, onClose?: () => void}) {
  return (<>
    <div className={`relative flex items-center bg-white border-b border-b-gray-200 ${className}`} onClick={onClose}>
      <div className={`w-8 h-1`}></div>
      <p className={`mx-auto text-lg font-bold`}>{children}</p>
      <CloseButton size={32} className={`m-2`} />
    </div>
  </>)
}
function PopupFooter({onCancel, onDone, onNext}: {onCancel?: () => void, onDone?: () => void, onNext?: () => void}) {
  return (<div className={`flex justify-end bg-white p-2`}>
    <button className={`button`} onClick={onCancel}>Cancel</button>
    <button className={`button button--standout`} onClick={onDone}>Done</button>
  </div>)
}

function Option({ id, name, option, checked, onClick, onChange, className='' }: {id: string, name: string, option: OptionType, checked: boolean, className?: string,
  onClick: (value: string) => void, 
  onChange: (value: string) => void}) {
  const { src, width, height, alt, title, description, icon, value } = option;
  const size = 64;
  return (<>
    <div className={`flex flex-row p-2 rounded-lg ${className}`} onClick={() => onClick(value)}>
      <div className={`w-16 h-16 inline-block rounded-full bg-gray-200 p-4 mr-2`}>
        { src ? <Image src={src} width={size} height={size} alt={alt || ''} className={`inline`} /> :
          icon}
      </div>
      <div className={`inline-flex flex-col justify-center mr-2`}>
        <p className={`font-bold`}>{title}</p>
        <p className={`text-sm`}>{description}</p>
      </div>
      <RadioButton id={id} name={name} value={value} checked={checked} onChange={onChange} 
      className={`self-center ml-auto`} />
    </div>
  </>)
}
