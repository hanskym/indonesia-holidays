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

        <div className="space-y-3 font-mono text-xs tracking-[0.14em] text-text-muted uppercase lg:justify-self-end lg:text-right">
          <Link href="/" className="block">
            Beranda
          </Link>

          <a
            href={siteConfig.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2"
          >
            <Icons.github className="size-4" />
            GitHub
          </a>

          <a
            href="https://upset.dev/tanggalmerah"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            Sumber data: <span className="text-text">Tanggal Merah API</span>
          </a>

          <span className="inline-flex items-center gap-2">
            <Icons.copyright className="size-4" /> {new Date().getFullYear()} {siteConfig.name}
          </span>
        </div>
      </div>
    </footer>
  );
}
