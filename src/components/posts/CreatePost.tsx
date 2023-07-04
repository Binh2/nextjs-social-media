import { ProfileImage } from "../common/ProfileImage";
import { PostPopup } from "./PostPopup";
import Image from "next/image";

export function CreatePost() {
  return (<>
    <div className="my-4 bg-white rounded-lg shadow">
      <div className="flex items-center flex-1 p-4">
        <ProfileImage />
        <PostPopup />
      </div>
      <hr className="pb-2 mt-2 border-gray-300" />

      <div className="flex justify-between px-3 mt-1 mb-1">
        <div className="flex items-center h-12 p-10 py-1 pl-5 mb-2 ml-2 space-x-1 cursor-pointer hover:bg-gray-200 hover:rounded-lg">
          <Image src="/livestream-icon.svg" alt="View all" width={32} height={32} />
          <button className="text-sm font-medium">Livestream</button>
        </div>
        <div className="flex items-center p-10 py-1 pl-5 mb-2 space-x-1 cursor-pointer hover:bg-gray-200 hover:rounded-lg">
          <Image src="/photo-icon.svg" alt="View all" width={32} height={32} />
          <button className="text-sm font-medium">Photo/Video</button>
        </div>
        <div className="flex items-center p-10 py-1 pl-5 mb-2 mr-2 space-x-1 cursor-pointer hover:bg-gray-200 hover:rounded-lg">
          <Image src="/flag-icon.svg" alt="View all" width={25} height={25} />
          <button className="text-sm font-medium">Life events</button>
        </div>
      </div>
    </div>
  </>)
}