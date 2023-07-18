import * as Urls from '@/lib/urls';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Navbar({className}: {className?: string}) {
  const { data: session } = useSession();
  const handle = session?.user.handle;
  const pathname = usePathname()
  const isActive = (path: string) => pathname?.includes(Urls.aboutUser(handle, path))

  return (<>
    <ol className={`${className}`}>
      <li><Link className={`side-link ${(isActive('/overview') || pathname == Urls.aboutUser(handle)) && 'side-link--active'}`} href={`${Urls.aboutUser(handle)}/overview`}>Overview</Link></li>
      <li><Link className={`side-link ${isActive('/work-and-education') && 'side-link--active'}`} href={`${Urls.aboutUser(handle)}/work-and-education`}>Work and education</Link></li>
      <li><Link className={`side-link ${isActive('/places') && 'side-link--active'}`} href={`${Urls.aboutUser(handle)}/places`}>Places lived</Link></li>
      <li><Link className={`side-link ${isActive('/contact') && 'side-link--active'}`} href={`${Urls.aboutUser(handle)}/contact`}>Contact and basic info</Link></li>
      <li><Link className={`side-link ${isActive('/family-and-relationships') && 'side-link--active'}`} href={`${Urls.aboutUser(handle)}/family-and-relationship`}>Family and relationships</Link></li>
      <li><Link className={`side-link ${isActive('/details') && 'side-link--active'}`} href={`${Urls.aboutUser(handle)}/details`}>Details about you</Link></li>
      <li><Link className={`side-link ${isActive('/life-events') && 'side-link--active'}`} href={`${Urls.aboutUser(handle)}/life-events`}>Life events</Link></li>
    </ol>
  </>)
}