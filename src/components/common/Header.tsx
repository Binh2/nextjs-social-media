import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { AppLogo } from './AppLogo';
import { ProfileImage } from './ProfileImage';
import { SearchIcon } from '@heroicons/react/outline';
import React, { CSSProperties, useState } from 'react';
import { MenuUser } from './MenuUser';

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
    <header className={`bg-white flex items-center justify-between px-4 sticky top-0 shadow-md z-[1] ${className}`} style={style}>
      <AppLogo />
      <div className='flex flex-row p-2 text-gray-600 bg-gray-100 rounded-full w-96 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white'>
        <span className="ml-1 mr-1 ">
          <SearchIcon className="w-5 h-6 text-gray-400" />
        </span>
        <input type="search" placeholder="Search on SocialSphere" className='flex-1 ml-2 bg-transparent outline-none ' />
      </div>


      <div className="flex items-center">
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