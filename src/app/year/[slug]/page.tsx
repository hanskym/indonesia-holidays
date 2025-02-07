import Link from 'next/link';
import { redirect } from 'next/navigation';

import type { GetHolidayEntriesResponse } from '@/types/holiday';

import HolidayCalendar from '@/components/HolidayCalendar';
import { Button } from '@/components/ui/Button';

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
              <Link href={`/year/${year - 1}`}>
                <Button>{year - 1}</Button>
              </Link>
              <h1 className="text-xl font-bold md:text-3xl">{year}</h1>
              <Link href={`/year/${year + 1}`}>
                <Button>{year + 1}</Button>
              </Link>
            </div>

            <HolidayCalendar holidays={holidays.data} year={year} />
          </>
        ) : (
          <div className="flex min-h-[75dvh] w-full items-center justify-center">
            <div className="p-8 text-center">
              <h3 className="mb-2 text-xl font-semibold text-gray-900">Data Tidak Tersedia</h3>
              <p className="text-gray-600">Data libur untuk tahun {year} masih belum tersedia</p>
              <Link href={`/year/${currentYear}`}>
                <Button className="mt-6">Periksa libur tahun ini</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
