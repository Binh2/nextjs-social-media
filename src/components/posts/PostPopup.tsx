import { useSession } from 'next-auth/react';
import Popup from 'reactjs-popup';
// const Popup = dynamic(import('reactjs-popup'), { ssr: false })
import Image from 'next/image';
import { ProfileImage } from '../common/ProfileImage';
import 'reactjs-popup/dist/index.css';
import { ChangeEvent, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loading } from '../common/Loading';
import dynamic from 'next/dynamic';
import UploadedImage from '../common/UploadedImage';
import Router from 'next/router';
import { UploadState, useUpload } from '@/lib/useUpload';
import { json } from 'stream/consumers';

export function PostPopup() {
  const { data: session, status } = useSession();
  const [content, setContent] = useState('');
  const router = useRouter();
  const { uploadState, imageUrl, handleFileInputChange, } = useUpload();
  const [open, setOpen] = useState(false);

  async function submit(e: React.SyntheticEvent) {
    e.preventDefault();

    try {
      const body = { content, image: imageUrl }
      await fetch('/api/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
      // await Router.reload()
    }
    catch (error) {
      console.log(error);
    }
  }

  const [stateIcon, setStateIcon] = useState("Only me");
  const handleSelectChange = (event) => {
    setStateIcon(event.target.value);
  };

  return (
    <div className='flex flex-1'>
      <button onClick={() => setOpen(true)} className='flex-1'>
        <div className="relative ml-3 flex flex-1">
          <input
            className="ml-2 w-full md:w-96 lg:max-w-full flex-1 xl:w-144 px-4 py-2 rounded-full bg-gray-100 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder={`What are you thinking, ${session?.user?.name}?`}
          />
        </div>
      </button>

      <Popup modal open={open} onClose={() => setOpen(false)} contentStyle={{ width: "40%", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)" }}>
        <form onSubmit={submit} className="flex flex-col items-center rounded-2xl m-2" >
          <div className="flex justify-between items-center w-full">
            <p className="text-xl font-bold text-center flex-1">Create post</p>
            <button className="p-2 rounded-full bg-gray-200 mr-2" onClick={e => { e.preventDefault(); setOpen(false) }}>
              <Image src="/close-icon.svg" alt="Close" width={25} height={25} />
            </button>
          </div>

          <div className="border-b border-gray-300 w-full mt-4 m-0"></div> {/* Separation line */}

          <div className="w-full mt-4 flex rounded-xl items-center">
            <div className="flex items-center">
              <ProfileImage size={55} className="rounded-full" />
            </div>
            <div className="ml-2 ">
              <p className="ml-2 text-lg font-semibold">{session?.user?.name}</p>
              <div className='flex flex-row relative items-center  rounded-lg bg-gray-200'>
                {
                  stateIcon === 'Only me' ? <Image src="/world.svg" alt="Add photo icon" width={15} height={15} className=" absolute left-3 z-0 " />
                    : <Image src="/lock-closed.svg" alt="Add photo icon" width={15} height={15} className=" absolute left-3 z-0 " />
                }
                <select
                  onChange={handleSelectChange}
                  className="pl-6  w-full border rounded-md text-sm outline-0 focus:outline-0 z-50 bg-transparent">
                  <option value="Only me"> <p>Public</p> </option>
                  <option value="Only medd"> <p>Only me</p> </option>
                </select>
              </div>
            </div>

            <button className="bg-gray-200 border-2 border-gray-300 py-2 px-4 rounded-lg inline-flex items-center font-semibold ml-auto">
              <p className='mr-3'>Artistic style photo processing</p>
              <Image src='/upload-icon--sideway.svg' alt="Add style img" width={15} height={15} ></Image>
            </button>

            {/* <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
              <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" /></svg>
              <span>Download</span>
            </button> */}


          </div>

          <div className="overflow-y-auto max-h-[50vh] w-full mt-4 rounded-md">
            <textarea
              className="w-full resize-none border border-gray-300 rounded-md px-3 py-2 text-base"
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder={`What's on your mind, ${session?.user?.name}?`}
            ></textarea>
            {uploadState === UploadState.UPLOADED ? (
              <UploadedImage className="w-full mt-2" src={imageUrl} alt="Uploaded image" />
            ) : (
              <div className="bg-gray-200 flex flex-col items-center px-4 py-6 mt-2">
                <label className="cursor-pointer">
                  <input type="file" onChange={handleFileInputChange} className="hidden" />
                  {uploadState === UploadState.UPLOADING ? (
                    <Loading></Loading>
                  ) : (
                    <Image src="/add-photo-icon--big.svg" width={48} height={48} alt="Add Photo" />
                  )}
                </label>
                <p className="text-lg font-bold mt-2">Add photos/videos</p>
                <p className="text-sm">or drag and drop</p>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between w-full mt-4 shadow rounded-md border-2 ">
            <p className="text-lg ml-4">Add to your post</p>
            <div className="flex items-center space-x-2">
              <div className="group relative flex justify-center items-center">
                <button className="hover:bg-blue-100 rounded-full p-2">
                  <Image src="/add-photo-icon.svg" alt="Add photo icon" width={32} height={32} className="h-8 w-8" />
                </button>
                <span className="absolute bottom-10 left-1/2 transform -translate-x-1/2 scale-0 bg-blue-100 text-xs text-center rounded-md px-2 py-1 whitespace-nowrap opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-200">
                  Add Photo </span>
              </div>
              <div className="group relative flex justify-center items-center">
                <button className="hover:bg-blue-100 rounded-full p-2">
                  <Image src="/location-icon.svg" alt="Add location icon" width={32} height={32} className="h-8 w-8" />
                </button>
                <span className="absolute bottom-10 left-1/2 transform -translate-x-1/2 scale-0 bg-blue-100 text-xs text-center rounded-md px-2 py-1 whitespace-nowrap opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-200">
                  Add Location </span>
              </div>
              <div className="group relative flex justify-center items-center">
                <button className="hover:bg-blue-100 rounded-full p-2">
                  <Image src="/add-user-icon.svg" alt="Add others icon" width={32} height={32} className="h-8 w-8" />
                </button>
                <span className="absolute bottom-10 left-1/2 transform -translate-x-1/2 scale-0 bg-blue-100 text-xs text-center rounded-md px-2 py-1 whitespace-nowrap opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-200">
                  Tag Friends </span>
              </div>
              <div className="group relative flex justify-center items-center">
                <button className="hover:bg-blue-100 rounded-full p-2">
                  <Image src="/add-music-icon.svg" alt="Add music icon" width={32} height={32} className="h-8 w-8" />
                </button>
                <span className="absolute bottom-10 left-1/2 transform -translate-x-1/2 scale-0 bg-blue-100 text-xs text-center rounded-md px-2 py-1 whitespace-nowrap opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-200">
                  Add Music </span>
              </div>
            </div>
          </div>
          <button className="bg-teal-500 text-white font-bold w-full mt-4 py-2 rounded-md shadow">
            Post
          </button>
        </form>
      </Popup>
    </div>);
}