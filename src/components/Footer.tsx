'use client';

import { Link } from 'next-view-transitions';

export default function Footer() {
  return (
    <footer className="p-4">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
          <p>
            &copy; {new Date().getFullYear()}{' '}
            <Link className="hover:text-text/80" href="/">
              Libur
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
