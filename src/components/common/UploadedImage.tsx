import Image from 'next/image';

type Props = {
  className?: string;
  src: string;
  alt?: string;
}

export default function UploadedImage(props: Props) {
  // return <Image className={props.className} src={props.src} alt={props.alt || ''} width={512} height={0} style={{width: "auto", height: "auto"}} />;
  return <img className={props.className} src={props.src} alt={props.alt || ''} />
}

UploadedImage.defaultProps = {
  className: "",
  src: "",
  alt: "",
};