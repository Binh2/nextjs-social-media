import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Redirect() {
  const router = useRouter();
  const { status, data: session } = useSession();
  const userId = router.query.id;
  const sessionUserId = session?.user?.id;
  useEffect(() => {
    if (userId) return;
    if (!sessionUserId) return;
    router.push(`/user/${sessionUserId}`)
  }, [userId, sessionUserId]);
}