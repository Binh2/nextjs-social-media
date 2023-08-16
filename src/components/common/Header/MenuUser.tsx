"use client"
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { ProfileImage } from '../ProfileImage';
import React, { useState } from 'react';
import * as Urls from '@/lib/urls';

export function MenuUser() {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }
  return (
    <div className="relative p-2 ml-2">
      <button className="relative" onClick={toggleMenu}>
        <ProfileImage />
        <div className="absolute bottom-0 right-0 text-gray-600 rounded-full bg-gray-50">
          <Image src="/dropdown-icon.svg" alt="Option" width={16} height={16} unoptimized />
        </div>
      </button>
      {isMenuOpen && (
        <div className="absolute right-0 h-auto mt-2 rounded-md shadow-lg bg-slate-50 w-80">
          <ul className="p-2">
            <li className='px-2'>
              <Link href={`${Urls.user(session?.user.id)}`} className="w-[100%] flex items-center pt-3 pb-3 pl-2 bg-gray-100 rounded shadow-md cursor-pointer hover:bg-slate-300 hover:rounded">
                <ProfileImage size={32} />
                <p className="ml-2 text-base font-semibold">{session?.user?.name}</p>
              </Link>
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
              <button className="flex w-[100%] items-center font-medium text-black hover:underline" onClick={() => signOut()}>
                <div className="flex items-center justify-center w-10 h-10 mr-3 rounded-full bg-slate-300">
                  <Image src="/logout-svgrepo-com.svg" alt="log out" height={20} width={20} />
                </div>
                <span>Log out</span>
              </button>
            </li>

            <li className='flex items-center ml-5 text-sm font-light underline'>
              <a href='#' className=''>Điều khoản</a>
              <span className='ml-2'>-</span>
              <a href='#' className='ml-2'>SocialSphere</a>
              <span className='ml-2'>-</span>
              <a href='#' className='ml-2'>Xem thêm</a>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}