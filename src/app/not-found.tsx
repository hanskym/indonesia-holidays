import type { Metadata } from 'next';

import { Link } from 'next-view-transitions';

import { buttonVariants } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: '404 Halaman tidak ditemukan',
};

export default function NotFound() {
  return (
    <div className="flex min-h-[80dvh] flex-col items-center justify-center space-y-8">
      <div className="w-full max-w-2xl space-y-5">
        <div>
          <span className="font-mono text-xs tracking-[0.16em] text-error uppercase">404</span>

          <h1 className="text-4xl leading-tight tracking-[-0.04em] md:text-5xl">
            Halaman tidak ditemukan.
          </h1>
        </div>

        <p className="text-sm leading-6 text-text-muted">
          Halaman yang Anda cari mungkin telah dipindahkan, dihapus, atau tidak pernah tersedia.
        </p>

        <Link className={buttonVariants()} href="/">
          Halaman Utama
        </Link>
      </div>
    </div>
  );
}
