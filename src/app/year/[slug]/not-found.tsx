import { Link } from 'next-view-transitions';

import { buttonVariants } from '@/components/ui/Button';

export default function NotFound() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="flex min-h-[80dvh] flex-col items-center justify-center space-y-8">
      <div className="text-center">
        <h2 className="text-5xl font-bold">
          <span className="sr-only">Error</span>404
        </h2>
        <p className="mt-4">
          Kalender libur untuk tahun yang Anda cari tidak ditemukan atau belum tersedia.
        </p>
      </div>

      <Link className={buttonVariants()} href={`/year/${currentYear}`}>
        Kalender Tahun Ini
      </Link>
    </div>
  );
}
