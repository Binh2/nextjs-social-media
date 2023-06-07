import { useSession } from 'next-auth/react';
import Popup from 'reactjs-popup';
// const Popup = dynamic(import('reactjs-popup'), { ssr: false })
import Image from 'next/image';
import { ProfileImage } from './ProfileImage';
import 'reactjs-popup/dist/index.css';
import { ChangeEvent, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loading } from './Loading';
import dynamic from 'next/dynamic';
import UploadedImage from './UploadedImage';
import Router from 'next/router';
import { UploadState, useUpload } from '@/lib/useUpload';

export function PostPopup() {
  const { data: session, status } = useSession();
  const [ content, setContent ] = useState('');
  const router = useRouter();
  const { uploadState, imageUrl, handleFileInputChange, } = useUpload();
  const [ open, setOpen ] = useState(false);

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
      await Router.reload()
    }
    catch (error) {
      console.log(error);
    }
  }

  return (<div>
    <button onClick={() => setOpen(true)}><input placeholder="What are you thinking?"></input></button>
    <Popup modal open={open} onClose={() => setOpen(false)}>
      <form onSubmit={submit} className="flex-col items-center">
        <div className="flex">
          <p className="text-[1.5em] font-bold text-center">Create post</p>
          <button className="" onClick={e => {e.preventDefault(); setOpen(false)}}>
            <Image src="close-icon.svg" alt="Close" width={32} height={32} />
          </button>
        </div>
        <div>
          <div className="flex">
            <ProfileImage size={32}></ProfileImage>
            <p>{session?.user?.name}</p>
          </div>
          <select className="">
            <option>
              <p className="font-bold">
                {/* <span className="fa-solid">&#xf007;</span> */}
                Only me
                {/* <span className="float-right fa-solid">&#xf0d7;</span> */}
              </p>
            </option>
            <option>
              <p className="font-bold">
                {/* <span className="fa-regular fa-globe">&#xf0ac;</span> */}
                Public 
                {/* <span className="float-right fa-solid">&#xf0d7;</span> */}
              </p>
            </option>
          </select>
        </div>
        <div className="overflow-y-auto max-h-[50vh]">
          <textarea className="w-[100%]"
            value={content} onChange={e => setContent(e.target.value)} placeholder={`What's on your mind, ${session?.user?.name}?`}
          ></textarea>
          { 
            uploadState == UploadState.UPLOADED ?
            <UploadedImage className="w-[100%]" src={imageUrl} alt="Uploaded image" /> :
            <div className="bg-[#eee] flex flex-col items-center">
              <label className="cursor-pointer">
                <input type="file" onChange={handleFileInputChange} className="hidden"></input>
                { 
                  uploadState == UploadState.UPLOADING ? 
                  <Loading></Loading> :
                  <Image src="/add-photo-icon--big.svg" width="48" height="48" alt="Add Photo" />
                }
              </label>
              <p className="text-[1.2em] font-bold">Add photos/videos</p>
              <p className="text-[0.8em]">or drag and drop</p>
              {/* { uploadState == UploadState.UPLOADED && <Image src={imageUrl} alt="Uploaded image" width={0} height={0} style={{width: "100%", height: "auto"}} /> }  */}
            </div>
          }
        </div>
        <div className="flex">
          <p>Add to your post</p>
          <div className="flex float-right">
            <Image src="/add-photo-icon.svg" alt="Add photo icon" width="32" height="32" />
            <Image src="/location-icon.svg" alt="Add location icon" width="32" height="32" />
            <Image src="/add-user-icon.svg" alt="Add others icon" width="32" height="32" />
            <Image src="/add-music-icon.svg" alt="Add music icon" width="32" height="32" />
          </div>
        </div>
        <button className="bg-teal-500 text-black w-[100%] font-bold">Post</button>
      </form>
    </Popup>
  </div>);
}