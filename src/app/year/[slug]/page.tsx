import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';

import type { GetHolidayEntriesResponse } from '@/types/holiday';

import HolidayCalendar from '@/components/HolidayCalendar';
import { buttonVariants } from '@/components/ui/Button';

import { fetchHolidays } from '@/lib/fetch';

export const runtime = 'edge';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const year = Number(slug);
  const currentYear = new Date().getFullYear();

  if (isNaN(year)) {
    redirect(`/year/${currentYear}`);
  }

  return {
    title: `Kalender Libur Tahun ${year}`,
    description: `Daftar lengkap hari libur nasional dan cuti bersama di Indonesia untuk tahun ${year}.`,
    keywords: [`Hari Libur ${year}`, `Cuti Bersama ${year}`, 'Kalender Indonesia'],
  };
}

export default async function YearPage({ params }: Props) {
  const { slug } = await params;
  const year = Number(slug);
  const currentYear = new Date().getFullYear();

  if (isNaN(year)) {
    redirect(`/year/${currentYear}`);
  }

  const holidays: GetHolidayEntriesResponse = await fetchHolidays(year);

  if (holidays.data.length === 0) {
    notFound();
  }

  return (
    <div className="relative mx-auto flex w-full flex-col justify-center">
      <div className="container mx-auto max-w-6xl space-y-4 px-4">
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
      </div>
    </div>
  );
}
