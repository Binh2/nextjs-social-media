import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { AppLogo } from './AppLogo';
import { ProfileImage } from './ProfileImage';
import { SearchIcon } from '@heroicons/react/outline';
import React, { useState } from 'react';

type Props = {
  className?: string;
  style?: string;
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
      <div className='p-2 flex flex-row w-96 bg-gray-100 rounded-full  text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white'>
        <span className="mr-1 ml-1 ">
          <SearchIcon className="w-5 h-6 text-gray-400" />
        </span>
        <input type="search" placeholder="Search on SocialSphere" className='flex-1 bg-transparent outline-none ml-2 ' />
      </div>


      <div className="flex items-center">
        <button className="rounded-full bg-gray-200 text-gray-700 p-2 ml-2">
          <Image src="/messenger-icon.svg" alt="Messenger icon" width={24} height={24} />
        </button>
        <button className="rounded-full bg-gray-200 text-gray-700 p-2 ml-2">
          <Image src="/notifications-icon.svg" alt="Notification icon" width={24} height={24} />
        </button>

        <div className="relative p-2 ml-2">
          <button className="relative" onClick={toggleMenu}>
            <ProfileImage />
            <div className="absolute bottom-0 right-0 rounded-full bg-gray-50 text-gray-600">
              <img src="/dropdown-icon.svg" alt="Option" className="h-4 w-4" />
            </div>
          </button>
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 bg-slate-50 rounded-md shadow-lg w-80 h-auto">
              <ul className="p-2">
                <li className='px-2'>
                  <div className="bg-gray-100  flex items-center cursor-pointer hover:bg-slate-300 hover:rounded pl-2 pt-3 pb-3 shadow-md rounded">
                    <ProfileImage size={32} />
                    <p className="text-base font-semibold ml-2">{session?.user?.name}</p>
                  </div>
                </li>
                <li className="px-2 py-2 hover:bg-slate-300 rounded mt-2 flex items-center">
                  <div className="rounded-full bg-slate-300 w-10 h-10 flex items-center justify-center mr-3">
                    <Image src="/icons8-settings.svg" alt="sitting" height={20} width={20} />
                  </div>
                  <a href="#" className='font-semibold'>Cài đặt & quyền riêng tư</a>
                  <Image src="/option-dropdown-icon.svg" alt='opt' width={20} height={20} className='ml-auto transform -rotate-90' />
                </li>
                <li className="px-2 py-2 hover:bg-slate-300 rounded flex items-center">
                  <div className="rounded-full bg-slate-300 w-10 h-10 flex items-center justify-center mr-3">
                    <Image src="/help-icon.svg" alt="help" height={20} width={20} />
                  </div>
                  <a href="#" className='font-semibold'>Trợ giúp & hỗ trợ</a>
                  <Image src="/option-dropdown-icon.svg" alt='opt' width={20} height={20} className='ml-auto transform -rotate-90' />
                </li>
                <li className="px-2 py-2 hover:bg-slate-300 rounded flex items-center">
                  <div className="rounded-full bg-slate-300 w-10 h-10 flex items-center justify-center mr-3">
                    <Image src="/comment-icon.svg" alt="contribute" height={20} width={20} />
                  </div>
                  <a href="#" className='font-semibold'>Đóng góp ý kiến</a>
                  <Image src="/option-dropdown-icon.svg" alt='opt' width={20} height={20} className='ml-auto transform -rotate-90' />
                </li>
                <li className="px-2 py-2 hover:bg-slate-300 rounded flex items-center">
                  <div className="rounded-full bg-slate-300 w-10 h-10 flex items-center justify-center mr-3">
                    <Image src="/logout-svgrepo-com.svg" alt="log out" height={20} width={20} />
                  </div>
                  <button className="text-black hover:underline font-medium" onClick={() => signOut()}>Log out</button>
                </li>

                <li className='flex items-center font-light ml-5 text-sm underline'>
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

        {/* <button className="text-black hover:underline ml-4" onClick={() => signOut()}>Log out</button> */}
      </div>
    </header>

  </>)
}

export default Header;