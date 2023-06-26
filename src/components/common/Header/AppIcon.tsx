import Image from 'next/image';
import Link from 'next/link';

type Props = {
  className?: string;
}

export const AppIcon: React.FC<Props> = (props) => {
  return (<>
    <Link href="/" className={`flex ${props.className}`}>
      <Image src="/logo-icon.svg" alt="App logo" width={48} height={48} className={`px-2`} />
    </Link>
  </>) 
}