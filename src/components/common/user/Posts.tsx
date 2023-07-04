import { CreatePost } from "@/components/posts/CreatePost";

export default function Posts() {
  return (<>
    <div className="flex">
      <div>
        <h1>Intro</h1>
        <button>Add Bo</button>
        <p>Studied at ...</p>
        <p>Went to ...</p>
        <p>Went to ...</p>
        <p>Lives in ...</p>
        <p>From ...</p>
      </div>
      <div>
        <CreatePost></CreatePost>
        <div>
          <div>
            <h1>Posts</h1>
            <button>Filters</button>
            <button>Manage posts</button>
          </div>
          <div>
            <p>List view</p>
            <p>Grid view</p>
          </div>
        </div>
      </div>
    </div>
  </>)
}