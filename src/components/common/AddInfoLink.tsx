import Link from 'next/link'
import { PlusCircleIcon } from "@heroicons/react/24/outline";

type Props = {
  children: string;
  href: string;
}
export function AddInfoLink(props: Props) {
  return (<>
    <Link href={props.href} className={`flex gap-x-5`}>
      <PlusCircleIcon className={`text-teal-600`} />
      <p className={`text-teal-600`}>{props.children}</p>
    </Link>
  </>)
}
