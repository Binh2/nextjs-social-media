import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { AppLogo } from './AppLogo';
import { ProfileImage } from './ProfileImage';
import { SearchIcon } from '@heroicons/react/outline';
import React, { CSSProperties, useState } from 'react';

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
    {/* <header className={`bg-white flex items-center`}>
      <AppLogo />
      <input type="search" placeholder="Search on SocialSphere"></input>
      <button className=''>
        <Image src="/messenger-icon.svg" alt="Messenger icon" width={48} height={48}></Image>
      </button>
      <button className=''>
        <Image src="/notifications-icon.svg" alt="Notification icon" width={48} height={48}></Image>
      </button>
      <button className='rounded-[100%]'>
        <ProfileImage></ProfileImage>
      </button>
      <button onClick={() => signOut()}>Log out</button>
    </header> */}

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

        <div className="relative p-2 ml-2">
          <button className="relative" onClick={toggleMenu}>
            <ProfileImage />
            <div className="absolute bottom-0 right-0 text-gray-600 rounded-full bg-gray-50">
              <img src="/dropdown-icon.svg" alt="Option" className="w-4 h-4" />
            </div>
          </button>
          {isMenuOpen && (
            <div className="absolute right-0 h-auto mt-2 rounded-md shadow-lg bg-slate-50 w-80">
              <ul className="p-2">
                <li className='px-2'>
                  <div className="flex items-center pt-3 pb-3 pl-2 bg-gray-100 rounded shadow-md cursor-pointer hover:bg-slate-300 hover:rounded">
                    <ProfileImage size={32} />
                    <p className="ml-2 text-base font-semibold">{session?.user?.name}</p>
                  </div>
                </li>
                <li className="flex items-center px-2 py-2 mt-2 rounded hover:bg-slate-300">
                  <div className="flex items-center justify-center w-10 h-10 mr-3 rounded-full bg-slate-300">
                    <Image src="/icons8-settings.svg" alt="sitting" height={20} width={20} />
                  </div>
                  <a href="#" className='font-semibold'>Cài đặt & quyền riêng tư</a>
                  <Image src="/option-dropdown-icon.svg" alt='opt' width={20} height={20} className='ml-auto transform -rotate-90' />
                </li>
                <li className="flex items-center px-2 py-2 rounded hover:bg-slate-300">
                  <div className="flex items-center justify-center w-10 h-10 mr-3 rounded-full bg-slate-300">
                    <Image src="/help-icon.svg" alt="help" height={20} width={20} />
                  </div>
                  <a href="#" className='font-semibold'>Trợ giúp & hỗ trợ</a>
                  <Image src="/option-dropdown-icon.svg" alt='opt' width={20} height={20} className='ml-auto transform -rotate-90' />
                </li>
                <li className="flex items-center px-2 py-2 rounded hover:bg-slate-300">
                  <div className="flex items-center justify-center w-10 h-10 mr-3 rounded-full bg-slate-300">
                    <Image src="/comment-icon.svg" alt="contribute" height={20} width={20} />
                  </div>
                  <a href="#" className='font-semibold'>Đóng góp ý kiến</a>
                  <Image src="/option-dropdown-icon.svg" alt='opt' width={20} height={20} className='ml-auto transform -rotate-90' />
                </li>
                <li className="flex items-center px-2 py-2 rounded hover:bg-slate-300">
                  <div className="flex items-center justify-center w-10 h-10 mr-3 rounded-full bg-slate-300">
                    <Image src="/logout-svgrepo-com.svg" alt="log out" height={20} width={20} />
                  </div>
                  <button className="font-medium text-black hover:underline" onClick={() => signOut()}>Log out</button>
                </li>

                <li className='flex items-center ml-5 text-sm font-light underline'>
                 <a href='#'className=''>Điều khoản</a> 
                 <span className='ml-2'>-</span>
                 <a href='#' className='ml-2'>SocialSphere</a>
                 <span className='ml-2'>-</span>
                 <a href='#' className='ml-2'>Xem thêm</a>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* <button className="ml-4 text-black hover:underline" onClick={() => signOut()}>Log out</button> */}
      </div>
    </header>

  </>)
}

export default Header;