import { signOut } from 'next-auth/react';
import Image from 'next/image';
import { AppLogo } from './AppLogo';

export function Header() {
  return (<>
    <header>
      <AppLogo />
      
      <button onClick={() => signOut()}>Log out</button>
    </header>
  </>)
}