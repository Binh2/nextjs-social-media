import * as Urls from "@/lib/urls";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const handle = session?.user.handle;
  const isActive = (path: string) => pathname?.includes(Urls.user(handle, path))
  const className = "block px-4 py-4 font-bold" 

  return (<>
    <ol className="flex bg-white">
      <li><Link href={`${Urls.user(handle, '/posts')}`} className={`${className} ${(isActive('/posts') || pathname == Urls.user(handle)) && 'link--active'}`}>Posts</Link></li>
      <li><Link href={`${Urls.user(handle, '/about')}`} className={`${className} ${isActive('/about') && 'link--active'}`}>About</Link></li>
      <li><Link href={`${Urls.user(handle, '/friends')}`} className={`${className} ${isActive('/friends') && 'link--active'}`}>Friends</Link></li>
      <li><Link href={`${Urls.user(handle, '/photos')}`} className={`${className} ${isActive('/photos') && 'link--active'}`}>Photos</Link></li>
      <li><Link href={`${Urls.user(handle, '/videos')}`} className={`${className} ${isActive('/video') && 'link--active'}`}>Videos</Link></li>
      <li><Link href={`${Urls.user(handle, '/checkins')}`} className={`${className} ${isActive('/checkins') && 'link--active'}`}>Check-ins</Link></li>
    </ol>
  </>)
}