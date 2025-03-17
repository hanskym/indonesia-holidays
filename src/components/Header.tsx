import { Link } from 'next-view-transitions';

import { siteConfig } from '@/config/site';

export default function Header() {
  return (
    <header>
      <div className="mx-auto space-y-4 py-4 text-center">
        <Link className="text-2xl font-semibold hover:text-text/80" href="/">
          {siteConfig.name}
        </Link>
      </div>
    </header>
  );
}
