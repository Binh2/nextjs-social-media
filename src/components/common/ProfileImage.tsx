import Image from 'next/image';
import { useSession } from "next-auth/react";

type Props = {
  size?: number;
  className?: string;
}

export const ProfileImage: React.FC<Props> = ({size = 48}) => {
  const { data: session, status } = useSession();
  
  return (<>{
    session?.user?.image ?
    <Image src={session?.user?.image} alt="Profile pic" width={size} height={size} className={`rounded-[100%]`} style={{width: size, height: size}}></Image> :
    <Image src="/blank-profile.svg" alt="Blank profile pic" width={size} height={size} className='rounded-[100%]' style={{width: size, height: size}}></Image>
  }</>);
}
