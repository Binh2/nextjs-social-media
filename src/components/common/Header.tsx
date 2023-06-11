import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { AppLogo } from './AppLogo';
import { ProfileImage } from './ProfileImage';
import { SearchIcon } from '@heroicons/react/outline';
import { CSSProperties } from 'react';

type Props = {
  className?: string;
  style?: CSSProperties;
};


export function Header({className = "", style = {}}: Props) {
  const { data: session, status } = useSession();

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

    <header className={`bg-white flex items-center justify-between px-4 py-2 sticky top-0 shadow-md z-[1] ${className}`} style={style}>
      <AppLogo />
      <div className='p-2 flex flex-row w-96 bg-gray-100 rounded-full  text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white w-96'>
        <span className="mr-1 ml-1 ">
          <SearchIcon  className="w-5 h-6 text-gray-400" />
        </span>
        <input type="search" placeholder="Search on SocialSphere" className='flex-1 bg-transparent outline-none ml-2' />
      </div>

      
      <div className="flex items-center">
        <button className="rounded-full bg-gray-200 text-gray-700 p-2 ml-2">
          <Image src="/messenger-icon.svg" alt="Messenger icon" width={24} height={24} />
        </button>
        <button className="rounded-full bg-gray-200 text-gray-700 p-2 ml-2">
          <Image src="/notifications-icon.svg" alt="Notification icon" width={24} height={24} />
        </button>
        <button className="rounded-full overflow-hidden ring-2 ring-white ml-2">
          <ProfileImage />
        </button>
        <button className="text-black hover:underline ml-4" onClick={() => signOut()}>Log out</button>
      </div>
    </header>

  </>)
}

export default Header;