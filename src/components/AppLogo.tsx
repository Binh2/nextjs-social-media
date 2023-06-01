import Image from 'next/image';
import Link from 'next/link';

type Props = {
  className?: string;
}

export const AppLogo: React.FC<Props> = (props) => {
  return (<>
    <Link href="/" className={`flex ${props.className}`}>
      <Image src="/logo-icon.svg" alt="App logo" width={48} height={48} className={`px-2`} />
      <Image src="/logo-text.svg" alt="Logo text" width={0} height={0} style={{ width: "auto", height: "40px" }} /> 
    </Link>
  </>) 
}