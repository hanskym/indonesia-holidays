'use client';

import { Link } from 'next-view-transitions';

import { siteConfig } from '@/config/site';

export default function Footer() {
  return (
    <footer>
      <div className="flex flex-col items-center justify-between py-4 md:flex-row">
        <p>
          &copy; {new Date().getFullYear()}{' '}
          <Link className="hover:text-text/80" href="/">
            {siteConfig.name}
          </Link>
        </p>

        <p>
          Sumber data:{' '}
          <a
            className="hover:text-text/80"
            href="https://dayoffapi.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="dayoff-API"
          >
            dayoff-API
          </a>
        </p>
      </div>
    </footer>
  );
}
