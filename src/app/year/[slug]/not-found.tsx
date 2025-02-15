import { Link } from 'next-view-transitions';

import { buttonVariants } from '@/components/ui/Button';

export default function NotFound() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="container mx-auto flex min-h-[80dvh] flex-col items-center justify-center px-4">
      <div className="text-center">
        <h2 className="text-xl font-semibold">Data Tidak Tersedia</h2>
        <p className="mt-4">
          Kalender libur untuk tahun yang diinginkan masih belum tersedia saat ini. Silakan coba
          lagi nanti.
        </p>

        <Link className={buttonVariants({ className: 'mt-6' })} href={`/year/${currentYear}`}>
          Kalender Tahun Ini
        </Link>
      </div>
    </div>
  );
}
