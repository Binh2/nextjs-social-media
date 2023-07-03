import { CoverImage } from "@/components/common/CoverImage";
import { Loading } from "@/components/common/Loading";
import { ProfileImage } from "@/components/common/ProfileImage";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Suspense, lazy, useEffect } from "react";
import { useLocation } from 'react-router-dom';
// const userComponents = lazy(() => import("@/components/common/user"))

export default function User() {
  const { status, data: session } = useSession()
  const router = useRouter();
  const friendsCount = 0;

  return (<>
    <CoverImage></CoverImage>
    <div>
      <div>
        <ProfileImage></ProfileImage>
        <p>{session?.user?.name || ''}</p>
        <p>{friendsCount} friends</p>
      </div> 
      <div>
        <button>Add to story</button>
        <button>Edit profile</button>
      </div>
      <div>
        <ol>
          <li><Link href="#posts">Posts</Link></li>
          <li><Link href="#about">About</Link></li>
        </ol>
      </div>
    </div>
    <Suspense fallback={<Loading />}>
      {/* { hash == "posts" ? <userComponents.Posts />: <userComponents.About /> } */}
    </Suspense>
  </>)
}
