'use client';

import * as React from 'react';

import { useTheme } from 'next-themes';
import { Link } from 'next-view-transitions';

import { Icons } from '@/components/ui/Icons';

import { siteConfig } from '@/config/site';
import useMounted from '@/hooks/use-mounted';

export default function Header() {
  const year = new Date().getFullYear();
  const mounted = useMounted();
  const { resolvedTheme: theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card backdrop-blur-sm">
      <div className="mx-auto max-w-360 px-5 md:px-8 lg:px-10">
        <div className="flex min-h-15 items-center justify-between gap-6">
          <Link href="/" aria-label={siteConfig.name} className="group flex w-fit flex-col">
            <span className="font-mono text-[10px] leading-none tracking-[0.18em] text-text-muted uppercase">
              {siteConfig.namePrefix}
            </span>

            <span className="mt-1 text-xl leading-none font-semibold tracking-tighter">
              {siteConfig.nameSuffix}
            </span>
          </Link>

          <Link href={`/year/${year}`} className="group ml-auto flex items-center gap-3">
            <span className="font-mono text-[10px] tracking-[0.16em] text-text-muted uppercase">
              Kalender
            </span>

            <span className="text-base leading-none tracking-[-0.03em] italic">{year}</span>

            <Icons.arrowtopright className="size-3 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="flex items-center justify-between border-t border-border py-2">
          <span className="font-mono text-[10px] tracking-[0.18em] text-text-muted uppercase">
            Kalender Nasional
          </span>

          <div className="flex items-center justify-center">
            {mounted ? (
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={`Ubah ke mode ${theme === 'dark' ? 'terang' : 'gelap'}`}
                title={`Ubah ke mode ${theme === 'dark' ? 'terang' : 'gelap'}`}
                className="group flex cursor-pointer items-center gap-1 font-mono text-[10px] tracking-[0.14em] text-text-muted uppercase"
              >
                <span className="relative flex size-5 items-center justify-center overflow-hidden">
                  <Icons.light className="absolute size-3.5 scale-0 rotate-90 transition-all duration-300 dark:scale-100 dark:rotate-0" />

                  <Icons.dark className="absolute size-3.5 scale-100 rotate-0 transition-all duration-300 dark:scale-0 dark:-rotate-90" />
                </span>

                <span>{theme === 'dark' ? 'Mode Terang' : 'Mode Gelap'}</span>
              </button>
            ) : (
              <span className="size-5" aria-hidden="true" />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
