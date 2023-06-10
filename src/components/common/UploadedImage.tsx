import { isPropertySignature } from "typescript";

type Props = {
  className?: string;
  src: string;
  alt?: string;
}

export default function UploadedImage(props: Props) {
  return <img className={props.className} src={props.src} alt={props.alt} />;
}

UploadedImage.defaultProps = {
  className: "",
  src: "",
  alt: "",
};