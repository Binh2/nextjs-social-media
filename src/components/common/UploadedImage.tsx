import Image from 'next/image';

type Props = {
  className?: string;
  src: string;
  alt?: string;
}

export function UploadedImage({className = "", src = "", alt = ""}: Props) {
  // return <Image className={props.className} src={props.src} alt={props.alt || ''} width={512} height={0} style={{width: "auto", height: "auto"}} />;
  return <Image className={className} src={src} alt={alt} width={0} height={0} unoptimized />
}

export default UploadedImage;