import Image from 'next/image';

type Props = {
  src?: string;
  alt?: string
}

export function CoverImage(props: Props) {
  const { src, alt } = props;
  return (<>
    { src ?
      <Image src={src} alt={alt || ''} className={`w-[100%]`}></Image>  :
      <div className={`w-[100%]`}></div>
    }
  </>)
}