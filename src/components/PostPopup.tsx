import { useSession } from 'next-auth/react';
import Popup from 'reactjs-popup';
import Image from 'next/image';
import { ProfileImage } from './ProfileImage';
import 'reactjs-popup/dist/index.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loading } from './Loading';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

export const UploadState = {
  IDLE: 1,
  UPLOADING: 2,
  UPLOADED: 3,
};
Object.freeze(UploadState);

function useUpload(defaultImageUrl: string = '') {
  const [uploadState, setUploadState] = useState(UploadState.IDLE);
  const [imgUrl, setImgUrl] = useState(defaultImageUrl);
  async function handleFileInputChange(e) {
    setUploadState(UploadState.UPLOADING);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    setImgUrl(data.secure_url);
    setUploadState(UploadState.UPLOADED);
  }
  return {
    uploadState,
    imageUrl: imgUrl,
    handleFileInputChange,
  }
}

export function PostPopup() {
  const { data: session, status } = useSession();
  const [ content, setContent ] = useState('');
  const router = useRouter();
  const { uploadState, imageUrl, handleFileInputChange, } = useUpload();

  async function submit(e: React.SyntheticEvent) {
    e.preventDefault();

    try {
      const body = { title: '', content }
      await fetch('/api/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
      await router.push('/')
    }
    catch (error) {
      console.log(error);
    }
  }
  

  return (<Popup trigger={
    <button><input placeholder="What are you thinking?"></input></button>
  } modal>
    <form onSubmit={submit} className="flex-col items-center">
      <div className="flex">
        <p className="text-[1.5em] font-bold text-center">Create post</p>
        <button>
          <Image src="close-icon.svg" alt="Close" width={32} height={32} />
        </button>
      </div>
      <div>
        <div className="flex">
          <ProfileImage size={32}></ProfileImage>
          <p>{session?.user?.name}</p>
        </div>
        <select style={{fontFamily: 'FontAwesome'}}>
          <option>
            <p className="font-bold fa-solid">&#xf007; Only me &#xf0d7;</p>
          </option>
          <option>
            <p className="font-bold">
              <span className="fa-regular">&#xf0ac;</span>
              Public 
              <span className="fa-solid">&#xf047;</span>
            </p>
          </option>
        </select>
      </div>
      <textarea className="w-[100%]"
        value={content} onChange={e => setContent(e.target.value)} placeholder={`What's on your mind, ${session?.user?.name}?`}
      ></textarea>
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
        { uploadState == UploadState.UPLOADED ? <Image src={imageUrl} alt="Uploaded image" width={0} height={0} style={{width: "auto", height: "auto"}} /> : ""} 
      </div>
      <div className="flex">
        <p>Add to your post</p>
        <div className="float-right flex">
          <Image src="/add-photo-icon.svg" alt="Add photo icon" width="32" height="32" />
          <Image src="/location-icon.svg" alt="Add location icon" width="32" height="32" />
          <Image src="/add-user-icon.svg" alt="Add others icon" width="32" height="32" />
          <Image src="/add-music-icon.svg" alt="Add music icon" width="32" height="32" />
        </div>
      </div>
      <button className="bg-teal text-black w-[100%] font-bold">Post</button>
    </form>
  </Popup>);
}