import { useSession } from "next-auth/react";
import Image from 'next/image';
import { ProfileImage } from "./ProfileImage";

export function LeftSidebar() {
  const { data: session, status } = useSession();
  
  return (<>
    <section className={`grid grid-cols-[32px_1fr] items-center`} style={{gridTemplateRows: "repeat(10, 32px)"}}>
      <Image src="/homepage-icon.svg" alt="Go to Homepage" width="0" height="0" style={{width: 32, height: "auto"}} />
      <p>Home</p>
      
      <ProfileImage size={32}></ProfileImage>
      <p>{session?.user?.name}</p>

      <hr></hr>
      <hr></hr>
    
      <Image src="tv-icon.svg" alt="Watch videos" width="0" height="0" style={{width: 32, height: "auto"}} />
      <p>Watch</p>
    
      <Image src="market-place-icon.svg" alt="Marketplace" width="0" height="0" style={{width: 32, height: "auto"}} />
      <p>Marketplace</p>
    
      <Image src="game-controller-icon.svg" alt="Game" width="0" height="0" style={{width: 32, height: "auto"}} />
      <p>Game</p>
      
      <Image src="news-icon.svg" alt="News" width="0" height="0" style={{width: 32, height: "auto"}} />
      <div>Users</div>

      <Image src="see-all-icon.svg" alt="View all" width="0" height="0" style={{width: 32, height: "auto"}} />
      <div>View all</div>
    </section>
  </>)
}