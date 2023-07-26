import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Popup from 'reactjs-popup';
import Image from 'next/image';
import { CloseButton, Loading, ProfileImage, UploadedImage } from '../common';
import 'reactjs-popup/dist/index.css';
import { ChangeEvent, useRef, useState } from 'react';
import { UploadState, useUpload } from '@/hooks/useUpload';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PostSuccessPopup } from './PostSuccessPopup';
import { useCloseAfter } from '../../hooks/useCloseAfter';
import { PublicitySelect } from '../common/controls';
import { Publicities } from '@/lib/constants/publicity';

export function PostPopup() {
  const { data: session, status } = useSession();
  const [content, setContent] = useState('');
  const { uploadState, imageUrl, handleFileInputChange, } = useUpload();
  const [open, setOpen] = useState(false);
  const [successModal, setSuccessModal] = useCloseAfter(false, 3000);
  const queryClient = useQueryClient();
  const [ publicity, setPublicity ] = useState(Publicities.PUBLIC)
  const mutation = useMutation({
    mutationFn: (post: {content: string, image: string}) => {
      return axios.post('/api/post', post);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries(['post'])
      setContent('')
    }
  })

  async function submit(e: React.SyntheticEvent) {
    e.preventDefault();
    mutation.mutate({content, image: imageUrl})
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
        <form onSubmit={submit} className="flex flex-col items-center m-2 rounded-2xl" >
          <div className="flex items-center justify-between w-full">
            <p className="flex-1 text-xl font-bold text-center">Create post</p>
            <CloseButton></CloseButton>
          </div>

          <div className="w-full m-0 mt-4 border-b border-gray-300"></div> {/* Separation line */}

          <div className="flex items-center w-full mt-4 rounded-xl">
            <div className="flex items-center">
              <ProfileImage size={55} className="rounded-full" />
            </div>
            <div className="ml-2 ">
              <p className="ml-2 text-lg font-semibold">{session?.user?.name}</p>
              <PublicitySelect value={publicity} onChange={setPublicity} />
            </div>
            <Link href="/combine" className="inline-flex items-center px-4 py-2 ml-auto font-semibold bg-gray-200 border-2 border-gray-300 rounded-lg" >
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
      </Popup>
      {/* Notification of successful posting */}
      <PostSuccessPopup open={successModal} setOpen={setSuccessModal}></PostSuccessPopup>
    </div>);
}
