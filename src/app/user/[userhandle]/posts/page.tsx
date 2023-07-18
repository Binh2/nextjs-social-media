"use client";
import { CreatePost } from "@/components/posts/CreatePost";
import { EditDetailsPopup } from "./EditDetailsPopup";
import { Hr } from "@/components/common/Hr";
import { Feed } from "@/components/posts/Feed";

export default function Posts() {
  return (<>
    <div className="flex">
      <div>
        <h1>Intro</h1>
        <button>Add Bio</button>
        <p>Studied at ...</p>
        <p>Went to ...</p>
        <p>Went to ...</p>
        <p>Lives in ...</p>
        <p>From ...</p>
        <EditDetailsPopup />
        <p></p>
        {/* Edit hobbies */}
      </div>
      <div>
        <CreatePost></CreatePost>
        <div>
          <div>
            <h1>Posts</h1>
            <button>Filters</button>
            <button>Manage posts</button>
          </div>
          <Hr />
          <div>
            <p>List view</p>
            <p>Grid view</p>
          </div>
          <Feed />
        </div>
      </div>
    </div>
  </>)
}