import { isPropertySignature } from "typescript";
import React, { useState } from 'react';
import Modal from 'react-modal';
import 'src/app/globals.css';
import { MenuUser } from "./MenuUser";
import Image from "next/image"
import Router, { useRouter } from "next/router";
import { formatDate } from "@/lib/functions";
import { WriteComment } from "../posts/comments/WriteComment";
import { CommentSection } from "../posts/comments/CommentSection";
import prisma from "@/lib/prisma";
import { PostProps } from "@/types/PostProps";
import { CommentProps } from "@/types/CommentProps";
import ReactDatePicker from "react-datepicker";
import { Reaction } from "../posts/reactions/Reaction";
import { useSession } from "next-auth/react";
import { ReactionTypes } from "@/lib/reactionTypes";
import { ProfileImage } from "./ProfileImage";


type Props = {
  className?: string;
  src: string;
  alt?: string;
  createdAt?: string;
  
}

const UploadedImage: React.FC<Props> = (props) => {
  
  const { data: session, status } = useSession();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const handleImageClick = () => {
    setModalIsOpen(true);
  };
  console.log('sdsdsdsd', props.createdAt)
  return (
    // <div className="relative"> 
    //   <img className={props.className} src={props.src} alt={props.alt} />

    // </div>

    <div className="relative">
      <img
        className={`${props.className} cursor-pointer`}
        src={props.src}
        alt={props.alt}
        onClick={handleImageClick}
      />
 

      {modalIsOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-container bg-black  flex">
            <div className="modal-content w-3/4  fixed left-0 top-0 h-full flex justify-center items-center bg-black">
              <img
                className="object-contain max-w-full max-h-full"
                src={props.src}
                alt={props.alt}
              />
            </div>


            {/* Comment section */}
            <div className="modal-sidebar bg-slate-50 w-1/4 fixed right-0 top-0 h-full">
              <div className="flex items-center justify-end">
                <button className="p-2 ml-2 text-gray-700 bg-gray-200 rounded-full">
                  <img src="/messenger-icon.svg" alt="Messenger icon" width={24} height={24} />
                </button>
                <button className="p-2 ml-2 text-gray-700 bg-gray-200 rounded-full">
                  <img src="/notifications-icon.svg" alt="Notification icon" width={24} height={24} />
                </button>

                <MenuUser />
              </div>
              <div className="flex items-center space-x-4 py-1 cursor-pointer hover:bg-gray-300 hover:rounded-lg pb-2 pl-5">
                <ProfileImage size={32} />
                <p className="text-base font-semibold">{session?.user?.name}</p>
              </div>
              <hr className="border-gray-300 pb-2" />

            </div>
            <button
              className="modal-close absolute top-4 left-4 text-gray-500 hover:text-gray-700 p-2 rounded-full bg-gray-200 mr-2"
              onClick={() => setModalIsOpen(false)}>
              <img src="/close-icon.svg" alt="Close" width={25} height={25} />
            </button>
          </div>
        </div>
      )}
    </div>








  )


}

UploadedImage.defaultProps = {
  className: "",
  src: "",
  alt: "",
};

export default UploadedImage;