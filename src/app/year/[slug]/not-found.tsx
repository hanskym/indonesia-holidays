import { Link } from 'next-view-transitions';

import { buttonVariants } from '@/components/ui/Button';

export default function NotFound() {
  const currentYear = new Date().getFullYear();

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
          Kalender libur untuk tahun yang Anda cari tidak ditemukan atau belum tersedia.
        </p>

        <Link className={buttonVariants()} href={`/year/${currentYear}`}>
          Kalender {currentYear}
        </Link>
      </div>
    </div>
  );
}
