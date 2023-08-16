"use client";
import { CheckIcon, Cog6ToothIcon, LockClosedIcon, UserMinusIcon, UserPlusIcon, UsersIcon } from '@heroicons/react/24/solid';
import { RadioButton } from '../common/controls';
import { GlobeAltIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Popup from 'reactjs-popup';
import Image from 'next/image';
import { CloseButton, Loading, ProfileImage, UploadedImage } from '../common';
import 'reactjs-popup/dist/index.css';
import { ChangeEvent, MouseEventHandler, useRef, useState } from 'react';
import { UploadState, useUpload } from '@/hooks/useUpload';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PostSuccessPopup } from './PostSuccessPopup';
import { useCloseAfter } from '../../hooks/useCloseAfter';
import { Publicities } from '@/lib/constants/publicities';
import { BackButton } from '../common/controls/buttons';

export function PostPopup() {
  const queryClient = useQueryClient();
  const popupRef = useRef<HTMLDivElement | null>(null);
  const { data: session, status } = useSession();
  const [ content, setContent ] = useState('');
  const { uploadState, imageUrl, handleFileInputChange } = useUpload();
  const [ open, setOpen ] = useState(false);
  const [ successModal, setSuccessModal ] = useCloseAfter(false, 3000);
  const [ publicity, setPublicity ] = useState(Publicities.PUBLIC);
  const [ page, setPage ] = useState(0);
  const maxPage = 2;
  function nextPage() {
    if (!popupRef.current) return;
    const newPage = (page + 1) % maxPage;
    popupRef.current.scrollLeft = newPage * popupRef.current.clientWidth;
    setPage(newPage);
  }
  function prevPage() {
    if (!popupRef.current) return;
    const newPage = (page + maxPage - 1) % maxPage;
    popupRef.current.scrollLeft = newPage * popupRef.current.clientWidth;
    setPage(newPage);
  }
  const mutation = useMutation({
    mutationFn: (post: {content: string, image: string, publicity: string}) => {
      return axios.post('/api/posts', post);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries(['posts'])
      setContent('')
    }
  })

  async function submit(e: React.SyntheticEvent) {
    e.preventDefault();
    mutation.mutate({content, image: imageUrl, publicity})
  }

  const handlePostClick = () => {
    setOpen(false);
    setSuccessModal(true);
  };
  
  return (
    <div className='flex flex-1'>
      <button onClick={() => setOpen(true)} className='flex-1'>
        <div className="relative flex flex-1 ml-3">
          <input
            className="flex-1 w-full px-4 py-2 ml-2 text-gray-700 placeholder-gray-500 bg-gray-100 rounded-full md:w-96 lg:max-w-full xl:w-144 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            onChange={(e) => setContent(e.target.value)}
            placeholder={`What are you thinking, ${session?.user?.name}?`}
          />
        </div>
      </button>

      <Popup modal open={open} onClose={() => setOpen(false)}
        contentStyle={{ width: "40%", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)" }}
      > 
        <div className="flex overflow-x-hidden scroll-smooth snap-x snap-mandatory" ref={popupRef}>
          {/* First page */}
          <form onSubmit={submit} className={`flex flex-col items-center flex-shrink-0 w-full m-2 rounded-2xl snap-start`}>
            <div className="flex items-center justify-between w-full">
              <p className="flex-1 text-xl font-bold text-center">Create post</p>
              <CloseButton onClick={() => setOpen(false)}></CloseButton>
            </div>

            <div className="w-full m-0 mt-4 border-b border-gray-300"></div> {/* Separation line */}

            <div className="flex items-center w-full mt-4 rounded-xl">
              <div className="flex items-center">
                <ProfileImage size={55} className="rounded-full" />
              </div>
              <div className="ml-2 ">
                <p className="ml-2 text-lg font-semibold">{session?.user?.name}</p>
                <PublicityButton value={publicity} onClick={nextPage} />
              </div>
              <Link href="/combine" className="inline-flex items-center px-4 py-2 ml-auto font-semibold bg-gray-200 border-2 border-gray-300 rounded-lg">
                <p className="mr-3">Add style</p>
                <Image src="/upload-icon--sideway.svg" alt="Add style img" width={15} height={15} />
              </Link>
            </div>

            <div className="overflow-y-auto max-h-[50vh] w-full mt-4 rounded-md">
              <textarea
                className="w-full px-3 py-2 text-base border border-gray-300 rounded-md resize-none"
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder={`What's on your mind, ${session?.user?.name}?`}
              ></textarea>
              {uploadState === UploadState.UPLOADED ? (
                <UploadedImage className="w-full mt-2" src={imageUrl} alt="Uploaded image" />
              ) : (
                <div className="flex flex-col items-center px-4 py-6 mt-2 bg-gray-200">
                  <label className="cursor-pointer">
                    <input type="file" onChange={handleFileInputChange} className="hidden" />
                    {uploadState === UploadState.UPLOADING ? (
                      <Loading></Loading>
                    ) : (
                      <Image src="/add-photo-icon--big.svg" width={48} height={48} alt="Add Photo" />
                    )}
                  </label>
                  <p className="mt-2 text-lg font-bold">Add photos/videos</p>
                  <p className="text-sm">or drag and drop</p>
                </div>
              )}
            </div>
            <div className="flex items-center justify-between w-full mt-4 border-2 rounded-md shadow ">
              <p className="ml-4 text-lg">Add to your post</p>
              <div className="flex items-center space-x-2">
                <div className="relative flex items-center justify-center group">
                  <button className="p-2 rounded-full hover:bg-blue-100">
                    <Image src="/add-photo-icon.svg" alt="Add photo icon" width={32} height={32} className="w-8 h-8" />
                  </button>
                  <span className="absolute px-2 py-1 text-xs text-center transition-all duration-200 transform scale-0 -translate-x-1/2 bg-blue-100 rounded-md opacity-0 bottom-10 left-1/2 whitespace-nowrap group-hover:scale-100 group-hover:opacity-100">
                    Add Photo </span>
                </div>
                <div className="relative flex items-center justify-center group">
                  <button className="p-2 rounded-full hover:bg-blue-100">
                    <Image src="/location-icon.svg" alt="Add location icon" width={32} height={32} className="w-8 h-8" />
                  </button>
                  <span className="absolute px-2 py-1 text-xs text-center transition-all duration-200 transform scale-0 -translate-x-1/2 bg-blue-100 rounded-md opacity-0 bottom-10 left-1/2 whitespace-nowrap group-hover:scale-100 group-hover:opacity-100">
                    Add Location </span>
                </div>
                <div className="relative flex items-center justify-center group">
                  <button className="p-2 rounded-full hover:bg-blue-100">
                    <Image src="/add-user-icon.svg" alt="Add others icon" width={32} height={32} className="w-8 h-8" />
                  </button>
                  <span className="absolute px-2 py-1 text-xs text-center transition-all duration-200 transform scale-0 -translate-x-1/2 bg-blue-100 rounded-md opacity-0 bottom-10 left-1/2 whitespace-nowrap group-hover:scale-100 group-hover:opacity-100">
                    Tag Friends </span>
                </div>
                <div className="relative flex items-center justify-center group">
                  <button className="p-2 rounded-full hover:bg-blue-100">
                    <Image src="/add-music-icon.svg" alt="Add music icon" width={32} height={32} className="w-8 h-8" />
                  </button>
                  <span className="absolute px-2 py-1 text-xs text-center transition-all duration-200 transform scale-0 -translate-x-1/2 bg-blue-100 rounded-md opacity-0 bottom-10 left-1/2 whitespace-nowrap group-hover:scale-100 group-hover:opacity-100">
                    Add Music </span>
                </div>
              </div>
            </div>

            <button
              className="w-full py-2 mt-4 font-bold text-white bg-teal-500 rounded-md shadow"
              onClick={handlePostClick}
              >
              Post
            </button>

          </form>
          
          {/* Second page */}
          <div className="flex-shrink-0 w-full snap-start">
            <PublicitySelectMenu value={publicity} onChange={setPublicity} prevPage={prevPage} onClose={() => setOpen(false)} />
          </div>
        </div>
      </Popup>
      {/* Notification of successful posting */}
      <PostSuccessPopup open={successModal} setOpen={setSuccessModal}></PostSuccessPopup>
    </div>);
}


type OptionType = { 
  title: string
  description: string
  value: string
  icon?: JSX.Element
};

const options: OptionType[] = [
  { title: "Public", description: "Anyone on and off Facebook", value: Publicities.PUBLIC, icon: <GlobeAltIcon /> },
  { title: "Friends", description: "Your friends on Facebook", value: Publicities.FRIENDS, icon: <UsersIcon />},
  { title: "Friends except...", description: "Don't show to some friends", value: "friends-except", icon: <UserMinusIcon />},
  { title: "Specific friends", description: "Only show to some friends", value: "specific-friends", icon: <UserPlusIcon />},
  { title: "Only me", description: "", value: Publicities.ONLY_ME, icon: <LockClosedIcon /> },
  { title: "Custom", description: "Include and exclude friends and lists", value: "custom", icon: <Cog6ToothIcon />},
]

function PublicityButton({ value, onClick }: { value: string, onClick: MouseEventHandler<HTMLButtonElement> }) {
  const selected = options.find(option => option.value == value) || options[0];
  return (<button type="button" onClick={onClick} className={`flex items-center p-2 rounded-lg bg-gray-200`}>
    <div className={`mr-1`}>
      <div className={`w-6 h-6`}>{selected.icon}</div>
    </div>
    <p className={`inline`}>{selected.title}</p>
  </button>);
}
export function PublicitySelectMenu({id='publicity-select', value, onChange, prevPage, onClose}: {id?: string, value: string, onChange: (value: string) => void, prevPage: () => void, onClose: () => void}) {
  function handleChange(newValue: string) {
    onChange(newValue);
    prevPage();
  }
  return (<>
    <div className={`rounded-lg w-full`}>
      {/* Header */}
      <div className={`relative flex items-center bg-white border-b border-b-gray-200`}>
        <BackButton className={`my-2`} onClick={prevPage} />
        <p className={`mx-auto text-lg font-bold`}>Select your audiences</p>
        <CloseButton className={`w-12 h-12 my-2`} onClick={onClose} />
      </div>

      {/* Body */}
      <div className={`bg-white overflow-auto w-full max-h-[60vh]`}>
        {options.map(option => 
        <Option id={`${id}__${option.value}`} name={id} option={option} onClick={handleChange}
        onChange={handleChange} checked={value == option.value} 
        className={`${value == option.value ? 'bg-teal-50': 'hover:bg-gray-50'}`} />)}
      </div>

      {/* Footer */}
      <div className={`flex justify-end bg-white`}>
        <button type="button" className={`button`} onClick={prevPage}>Cancel</button>
        <button type="button" className={`button button--standout`} onClick={() => {}}>Done</button>
      </div>
    </div>
  </>)
}

function Option({ id, name, option, checked, onClick, onChange, className='' }: {id: string, name: string, option: OptionType, checked: boolean, className?: string,
  onClick: (value: string) => void, 
  onChange: (value: string) => void}) {
  const { title, description, icon, value } = option;
  return (<>
    <div className={`flex flex-row p-2 rounded-lg cursor-pointer ${className}`} onClick={() => onClick(value)}>
      <div className={`w-16 h-16 inline-block rounded-full bg-gray-200 p-4 mr-2`}>
        {icon}
      </div>
      <div className={`inline-flex flex-col justify-center mr-2`}>
        <p className={`font-bold`}>{title}</p>
        <p className={`text-sm`}>{description}</p>
      </div>
      <RadioButton id={id} name={name} value={value} checked={checked} onChange={onChange} 
      className={`self-center ml-auto`} />
    </div>
  </>)
}