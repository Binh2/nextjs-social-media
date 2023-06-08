import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { AppLogo } from './AppLogo';
import { ProfileImage } from './ProfileImage';
import { SearchIcon } from '@heroicons/react/outline';

export function Header() {
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

    <header className="bg-blue-500 flex items-center justify-between px-4 py-2 sticky	top-1">
      <AppLogo />
      <div className="flex items-center ">
        <div className="flex items-center bg-gray-100 rounded-full py-2 px-4 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white w-[calc(100% - 8px)]">
          <input type="search" placeholder="Search on SocialSphere" className="w-full bg-transparent outline-none" />
          <span className="ml-2">
            <SearchIcon className="w-5 h-6 text-gray-400" />
          </span>
        </div>
        <button className="rounded-full bg-gray-200 text-gray-700 p-2 ml-2">
          <Image src="/messenger-icon.svg" alt="Messenger icon" width={24} height={24} />
        </button>
        <button className="rounded-full bg-gray-200 text-gray-700 p-2 ml-2">
          <Image src="/notifications-icon.svg" alt="Notification icon" width={24} height={24} />
        </button>
        <button className="rounded-full overflow-hidden ring-2 ring-white ml-2">
          <ProfileImage />
        </button>
        <button className="text-white hover:underline ml-4" onClick={() => signOut()}>Log out</button>
      </div>
    </header>
  </>)
}

export default Header;