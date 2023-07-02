import Image from 'next/image';

type Props = {
  src?: string;
  width?: number;
  height?: number;
  alt?: string
}

export function CoverImage(props: Props) {
  const { src, width, height, alt } = props;
  return (<>
    { src && width && height ?
      <Image src={src} width={width} height={height} alt={alt || ''}></Image>  :
      <div className={`w-${width} h-${height}`}></div>
    }
  </>)
}