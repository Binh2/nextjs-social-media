import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import { MenuUser } from './MenuUser';
import { AppIcon } from './AppIcon';
import { SearchBar } from './SearchBar';
import { TabBar } from './TabBar';

type Props = {
  className?: string;
  style?: CSSProperties;
};


export function Header({ className = "", style = {} }: Props) {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (<>
    <header className={`bg-white grid grid-cols-[35%_1fr_35%] grid-rows-[auto] items-center justify-center px-4 sticky top-0 shadow-md z-[1] ${className}`} style={style}>
      <div className='flex justify-self-start'>
        <AppIcon />
        <SearchBar></SearchBar> 
      </div>
      <TabBar></TabBar>
      <div className="flex items-center justify-self-end">
        <button className="p-2 ml-2 text-gray-700 bg-gray-200 rounded-full">
          <Image src="/messenger-icon.svg" alt="Messenger icon" width={24} height={24} />
        </button>
        <button className="p-2 ml-2 text-gray-700 bg-gray-200 rounded-full">
          <Image src="/notifications-icon.svg" alt="Notification icon" width={24} height={24} />
        </button>

        <MenuUser/>
      </div>
    </header>

  </>)
}

export default Header;