'use client';

import Link from 'next/link';

import { siteConfig } from '@/config/site';

export default function Footer() {
  return (
    <footer className="p-4">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex flex-col items-center justify-between md:flex-row">
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
      </div>
    </footer>
  );
}
