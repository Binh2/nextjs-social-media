"use client"
import { useRef, useState } from "react";

export function SearchBar() {
  const searchBar = useRef<HTMLInputElement>(null)
  const [ focus, setFocus ] = useState(false);
  
  return ( 
  <button className={`flex flex-row p-2 text-gray-600 bg-gray-100 rounded-full transition-all duration-500
    ${focus && 'outline-none ring-2 ring-teal-500 bg-white w-64'}`}
    onClick={() => searchBar.current?.focus()}
  >
    <SearchIcon className='text-gray-500'></SearchIcon>
    <input type="search" placeholder="Search on SocialSphere" 
      className='w-0 transition-all duration-500 bg-transparent outline-none focus:flex-1 focus:ml-2' ref={searchBar}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
    />
  </button>
  )
}

function SearchIcon(props: {className?: string}) {
  return (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${props.className}`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>)
}