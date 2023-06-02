import { useSession } from "next-auth/react";
import Image from 'next/image';
import { ProfileImage } from "./ProfileImage";

export function LeftSidebar() {
  const { data: session, status } = useSession();
  
  return (<>
    <section className={`float-left`}>
      <div className="flex">
        <Image src="/homepage-icon.svg" alt="Go to Homepage" width="32" height="32" />
        <p>Home</p>
      </div> 
      <div className="flex">
        <ProfileImage size="32"></ProfileImage>
        <p>{session?.user?.name}</p>
      </div>
      <div className="flex">
        <Image src="tv-icon.svg" alt="Watch videos" width="32" height="32" />
        <p>Watch</p>
      </div>
      <div>
        <p>Marketplace</p>
      </div>
      <div>Game</div>
      <div>Users</div>
      <div>View</div>
    </section>
  </>)
}