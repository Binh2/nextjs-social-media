import { useSession } from "next-auth/react";
import Image from 'next/image';
import { ProfileImage } from "./ProfileImage";

export function LeftSidebar() {
  const { data: session, status } = useSession();

  return (<>
    <section className="float-left w-80 bg-gray-200 p-4">
      <div className="flex items-center space-x-2 mb-2 hover:bg-gray-300 rounded-lg">
        <Image src="/homepage-icon.svg" alt="Go to Homepage" width="32" height="32" />
        <p className="text-gray-600 text-sm">Home</p>
      </div>
      <div className="flex items-center space-x-2 mb-2 hover:bg-gray-300 rounded-lg">
        <div className="w-8 h-8 rounded-full overflow-hidden">
          <ProfileImage size={32} />
        </div>
        <p className="text-gray-600 text-sm">{session?.user?.name}</p>
      </div>
      <hr className="my-2 border-gray-300 " /> {/* Đường thẳng tách */}
      <div className="flex items-center space-x-2 mb-2 hover:bg-gray-300 rounded-lg">
        <Image src="/tv-icon.svg" alt="Watch videos" width="32" height="32" />
        <p className="text-gray-600 text-sm">Watch</p>
      </div>
      <div className="mb-2 hover:bg-gray-300 rounded-lg">
        <p className="text-gray-600 text-sm">Marketplace</p>
      </div>
      <div className="flex items-center space-x-2 mb-2 hover:bg-gray-300 rounded-lg">
        <Image src="/game-controller-icon.svg" alt="Games" width="30" height="30" />
        <p className="text-gray-600 text-sm">Game</p>
      </div>
      <div className="mb-2 hover:bg-gray-300 rounded-lg">
        <p className="text-gray-600 text-sm">Users</p>
      </div>
      <div className="mb-2 hover:bg-gray-300 rounded-lg">
        <p className="text-gray-600 text-sm">View</p>
      </div>
    </section>
  </>)
}