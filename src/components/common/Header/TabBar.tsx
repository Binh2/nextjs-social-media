"use client";
import Link from 'next/link';
import { BuildingStorefrontIcon, HomeIcon, TvIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { UsersIcon } from "@heroicons/react/24/solid";
import { usePathname } from 'next/navigation';

type Props = {
  className?: string
}

export function TabBar(props: Props) {
  const pathname = usePathname();
  const isActive = (route: string) => pathname == route;
  return (<>
    <ol className={`flex flex-0 gap-2 justify-center ${props.className}`}>
      <li className="w-8">
        <Link href="/" className={`list-non`}>
          <HomeIcon className={`text-black border-teal-500 ${isActive("/") && 'text-teal-500 border-b-4'}`}></HomeIcon>
        </Link>
      </li>
      <li className="w-8">
        <Link href="/friends" className={`list-none`}>
          <UsersIcon className={`text-black border-teal-500 ${isActive("/friends") && 'text-teal-500 border-b-4'}`}></UsersIcon>
        </Link>
      </li>
      <li className="w-8">
        <Link href="/" className={`list-none`}>
          <TvIcon className={`text-black border-teal-500 ${isActive("/a") && 'text-teal-500 border-b-4'}`}></TvIcon>
        </Link>
      </li>
      <li className="w-8">
        <Link href="/" className={`list-none`}>
          <BuildingStorefrontIcon className={`text-black border-teal-500 ${isActive("/a") && 'text-teal-500 border-b-4'}`}></BuildingStorefrontIcon>
        </Link>
      </li>
      <li className="w-8">
        <Link href="/" className={`list-none`}>
          <UserGroupIcon className={`text-black border-teal-500 ${isActive("/a") && 'text-teal-500 border-b-4'}`}></UserGroupIcon>
        </Link>
      </li>
    </ol>
  </>)
}