import Link from 'next/link';
import { redirect } from 'next/navigation';

import type { GetHolidayEntriesResponse } from '@/types/holiday';

import HolidayCalendar from '@/components/HolidayCalendar';
import { Button } from '@/components/ui/Button';

import { fetchHolidays } from '@/lib/fetch';

export default async function YearPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const year = Number(slug);

  if (isNaN(year)) {
    redirect(`/year/${new Date().getFullYear()}`);
  }

  const holidays: GetHolidayEntriesResponse = await fetchHolidays(year);

  return (
    <div className="relative mx-auto flex w-full flex-col justify-center 2xl:max-w-7xl">
      <div className="container mx-auto max-w-6xl space-y-4 px-4">
        <div className="flex items-center justify-between gap-2 text-sm font-medium">
          <Link href={`/year/${year - 1}`}>
            <Button>{year - 1}</Button>
          </Link>
          <h1 className="text-xl font-bold md:text-3xl">{year}</h1>
          <Link href={`/year/${year + 1}`}>
            <Button>{year + 1}</Button>
          </Link>
        </div>
        {holidays.length > 0 ? (
          <HolidayCalendar holidays={holidays} year={year} />
        ) : (
          <div className="flex min-h-[200px] w-full items-center justify-center">
            <div className="p-8 text-center">
              <h3 className="mb-2 text-xl font-semibold text-gray-900">No Holidays Found</h3>
              <p className="text-gray-600">There are no holidays available for the year {year}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
