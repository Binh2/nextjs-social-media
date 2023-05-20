import Image from 'next/image';

export function AppLogo() {
  return (<>
    <Image src="/logo.png" alt="App logo" width={183} height={173} />
    <h1>Social sphere</h1>
  </>) 
}