
type Props = {
  src: string;
  width: number;
  quality?: number | string;
}

// Before: https://res.cloudinary.com/ddyd5lv06/image/upload/v1687214685/8721900573438274616_gmmfrf.jpg
// After : https://res.cloudinary.com/ddyd5lv06/image/upload/w_300,c_limit,q_auto/8721900573438274616_gmmfrf.jpg
export function cloudinaryLoader({ src, width, quality }: Props) {
  const url = new URL(src);
  const splitted = url.pathname.split('/');
  const params = ['f_auto', 'c_limit', `w_${width}`, `q_${quality || 'auto'}`]
  splitted[splitted.length - 2] = params.join(',');
  url.pathname = splitted.join('/')
  return url.href;
}

export default function loader(props: Props) {
  const { src, width, quality } = props;
  try {
    const url = new URL(src);
    if (url.hostname == "res.cloudinary.com") return cloudinaryLoader(props);
  } catch (err) {
    return src;
  }
  return src;
}