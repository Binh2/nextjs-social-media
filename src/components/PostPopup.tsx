import { useSession } from 'next-auth/react';
import Popup from 'reactjs-popup';
import Image from 'next/image';
import { ProfileImage } from './ProfileImage';
import 'reactjs-popup/dist/index.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function PostPopup() {
  const { data: session, status } = useSession();
  const [ content, setContent ] = useState('');
  const router = useRouter();

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
  } position="right center">
    <form onSubmit={submit}>
      <div>
        <p>Create post</p>
        <button>X</button>
      </div>
      <div>
        <ProfileImage></ProfileImage>
        <p>{session?.user?.name}</p>
        <option>
          <select>Only me</select>
        </option>
      </div>
      <textarea value={content} onChange={e => setContent(e.target.value)}>What&apos;s on your mind, {session?.user?.name}?</textarea>
      {/* <Image src="background-picker.png" width="35" height="34" alt="Background picker menu" /> */}
      <div>
        <p>Add to your p</p>
      </div>
      <button>Post</button>
    </form>
  </Popup>);
}