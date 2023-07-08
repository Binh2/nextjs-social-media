import { useSession } from "next-auth/react";
import Image from 'next/image';
import { ProfileImage } from "./ProfileImage";

const imageStyle = {width: "auto", height: "auto"}
export function LeftSidebar() {
  const { data: session, status } = useSession();

  return (<>
    <section className="flex flex-col space-y">

      {/* Home */}
      <div className="flex items-center py-1 pb-2 pl-5 mt-5 space-x-4 cursor-pointer hover:bg-gray-300 hover:rounded-lg">
        <Image src="/homepage-icon.svg" alt="Go to Homepage" width={32} height={32} style={imageStyle} />
        <p className="text-base font-semibold">Home</p>
      </div>

      <div className="flex items-center py-1 pb-2 pl-5 space-x-4 cursor-pointer hover:bg-gray-300 hover:rounded-lg">
        <ProfileImage size={32} />
        <p className="text-base font-semibold">{session?.user?.name}</p>
      </div>

      <hr className="pb-2 border-gray-300" />

      {/* Features */}
      <div className="flex items-center py-1 pl-5 space-x-4 cursor-pointer hover:bg-gray-300 hover:rounded-lg" >
        <Image src="/tv-icon.svg" alt="Watch videos" width={32} height={32} style={imageStyle} />
        <p className="text-base font-semibold">Watch</p>
      </div>

      <div className="flex items-center py-1 pl-5 space-x-4 cursor-pointer hover:bg-gray-300 hover:rounded-lg">
        <Image src="/market-place-icon.svg" alt="Marketplace" width={32} height={32} style={imageStyle} />
        <p className="text-base font-semibold">Marketplace</p>
      </div>

      <div className="flex items-center py-1 pl-5 space-x-4 cursor-pointer hover:bg-gray-300 hover:rounded-lg">
        <Image src="/game-controller-icon.svg" alt="Game" width={32} height={32} style={imageStyle} />
        <p className="text-base font-semibold">Game</p>
      </div>

      <div className="flex items-center py-1 pl-5 space-x-4 cursor-pointer hover:bg-gray-300 hover:rounded-lg">
        <Image src="/news-icon.svg" alt="News" width={32} height={32} style={imageStyle} />
        <p className="text-base font-semibold">Users</p>
      </div>

      <div className="flex items-center py-1 pl-5 space-x-4 cursor-pointer hover:bg-gray-300 hover:rounded-lg">
        <Image src="/see-all-icon.svg" alt="View all" width={32} height={32} style={imageStyle} />
        <p className="text-base font-semibold">View all</p>
      </div>

      <hr className="pb-2 border-gray-300" />

      {/* View pages */}
      <div className="flex items-center py-1 pl-5 space-x-4 cursor-pointer hover:bg-gray-300 hover:rounded-lg mt-7">
        <div className="container mx-auto">
          <p className="text-base font-semibold">n representative pages</p>
        </div>
      </div>

      <div className="flex items-center py-1 pl-5 mt-5 space-x-4 cursor-pointer hover:bg-gray-300 hover:rounded-lg">
        {/* Need to changes a icon */}
        <Image src="/share-icon.svg" alt="Go to Homepage" width={32} height={32} style={imageStyle} />
        <p className="text-base font-semibold">View all pages</p>
      </div>

      <hr className="pb-2 border-gray-300" />
      {/* View groups */}
      <div className="flex items-center py-1 pl-5 space-x-4 cursor-pointer hover:bg-gray-300 hover:rounded-lg mt-7">
        <div className="container mx-auto">
          <p className="text-base font-semibold">n representative groups</p>
        </div>
      </div>
      <div className="flex items-center py-1 pl-5 mt-5 space-x-4 cursor-pointer hover:bg-gray-300 hover:rounded-lg">
        {/* Need to changes a icon */}
        <Image src="/megaphone-icon.svg" alt="Go to Homepage" width={32} height={32} style={imageStyle} />
        <p className="text-base font-semibold">View all groups</p>
      </div>
    </section>
  </>)
}