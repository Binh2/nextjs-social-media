import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { AppLogo } from './AppLogo';
import { ProfileImage } from './ProfileImage';

export function Header() {
  const { data: session, status } = useSession();

  return (<>
    <header className={`bg-white flex items-center`}>
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
    </header>
  </>)
}