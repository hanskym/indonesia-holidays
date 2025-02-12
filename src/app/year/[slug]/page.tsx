import { redirect } from 'next/navigation';

import { Link } from 'next-view-transitions';

import type { GetHolidayEntriesResponse } from '@/types/holiday';

import HolidayCalendar from '@/components/HolidayCalendar';
import { buttonVariants } from '@/components/ui/Button';

import { fetchHolidays } from '@/lib/fetch';

export default async function YearPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const year = Number(slug);
  const currentYear = new Date().getFullYear();

  if (isNaN(year)) {
    redirect(`/year/${currentYear}`);
  }

  const holidays: GetHolidayEntriesResponse = await fetchHolidays(year);

  return (
    <div className="relative mx-auto flex w-full flex-col justify-center">
      <div className="container mx-auto max-w-6xl space-y-4 px-4">
        {holidays.data.length ? (
          <>
            <div className="flex items-center justify-between gap-2 text-sm font-medium">
              <Link className={buttonVariants()} href={`/year/${year - 1}`}>
                {year - 1}
              </Link>
              <h1 className="text-xl font-bold md:text-3xl">{year}</h1>
              <Link className={buttonVariants()} href={`/year/${year + 1}`}>
                {year + 1}
              </Link>
            </div>

            <HolidayCalendar holidays={holidays.data} year={year} />
          </>
        ) : (
          <div className="flex min-h-[75dvh] w-full items-center justify-center">
            <div className="text-center">
              <h2 className="text-xl font-semibold">Data Tidak Tersedia</h2>
              <p className="mt-4">
                Data libur untuk tahun {year} masih belum tersedia saat ini. Silakan coba lagi
                nanti.
              </p>

              <Link className={buttonVariants({ className: 'mt-6' })} href={`/year/${currentYear}`}>
                Lihat Tahun Ini
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
