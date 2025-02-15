import { Link } from 'next-view-transitions';

import { siteConfig } from '@/config/site';

export default function Header() {
  return (
    <header className="mx-auto py-4 text-center">
      <div className="space-y-4">
        <Link className="text-2xl font-semibold hover:text-text/80" href="/">
          {siteConfig.name}
        </Link>
      </div>
    </header>
  );
}
