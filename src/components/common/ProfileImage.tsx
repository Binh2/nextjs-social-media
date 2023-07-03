import Image from 'next/image';
import { useSession } from "next-auth/react";

type Props = {
  src?: string | null;
  size?: number;
  className?: string;
}

export const ProfileImage: React.FC<Props> = ({src, size = 48, className}) => {
  const { data: session, status } = useSession();
  const alt = "Profile pic";
  const currentUserImage = session?.user?.image || '';
  src = src ? src : currentUserImage;
  src = src ? src : '/blank-profile.svg';
  return (<>
    <Image src={src} alt={alt} width={size} height={size} className={`rounded-[100%] ${className}`}></Image>
  </>);
}
