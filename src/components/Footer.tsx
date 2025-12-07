'use client';

import { Link } from 'next-view-transitions';

import { Icons } from '@/components/ui/Icons';

import { siteConfig } from '@/config/site';

export default function Footer() {
  return (
    <footer>
      <div className="flex flex-col items-center justify-between gap-1 py-4 md:grid md:grid-cols-3">
        <p className="order-2 md:order-0 md:col-start-1">
          &copy; {new Date().getFullYear()}{' '}
          <Link className="transition-all duration-300 hover:text-text/80" href="/">
            {siteConfig.name}
          </Link>
        </p>

        <a
          className="order-1 flex items-center justify-center transition-all duration-300 hover:text-text/80 md:order-0 md:col-start-2"
          href={siteConfig.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Indonesia Holidays GitHub Repository"
        >
          <Icons.github className="size-4 md:mr-1" />
          <span className="hidden md:block">GitHub</span>
        </a>

        <p className="order-3 md:order-0 md:col-start-3 md:text-right">
          Sumber data:{' '}
          <a
            className="transition-all duration-300 hover:text-text/80"
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
