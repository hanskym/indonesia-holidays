'use client';

import { Link } from 'next-view-transitions';

import { Icons } from '@/components/ui/Icons';

import { siteConfig } from '@/config/site';

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-border py-8">
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <p className="font-mono text-xs tracking-[0.16em] text-text-muted uppercase">
            {siteConfig.name}
          </p>

          <p className="mt-4 max-w-lg text-xl leading-7 tracking-[-0.03em]">
            {siteConfig.description}
          </p>
        </div>

        <div className="flex flex-col items-start gap-3 font-mono text-xs tracking-[0.14em] text-text-muted uppercase lg:items-end">
          <Link href="/">Beranda</Link>

          <a
            href={siteConfig.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <Icons.github className="size-4" />
            GitHub
          </a>

          <span>
            Sumber data:{' '}
            <a
              href="https://upset.dev/tanggalmerah"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text"
            >
              Tanggal Merah API
            </a>
          </span>

          <span className="flex items-center gap-2">
            <Icons.copyright className="size-4" />
            {new Date().getFullYear()} {siteConfig.name}
          </span>
        </div>
      </div>
    </footer>
  );
}
