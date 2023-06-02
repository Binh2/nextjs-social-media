import Image from 'next/image';
import { useSession } from "next-auth/react";

type Props = {
  size?: number | string;
}

export const ProfileImage: React.FC<Props> = ({size}) => {
  const { data: session, status } = useSession();
  
  return (<>{
    session?.user?.image ?
    <Image src={session?.user?.image} alt="Profile pic" width={size} height={size} className='rounded-[100%]'></Image> :
    <Image src="/blank-profile.svg" alt="Blank profile pic" width={size} height={size} className='rounded-[100%]'></Image>
  }</>);
}

ProfileImage.defaultProps = { size: 48 };