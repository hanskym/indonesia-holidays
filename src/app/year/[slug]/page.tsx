import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';

import { Link } from 'next-view-transitions';

import DataFetchError from '@/components/DataFetchError';
import HolidayCalendar from '@/components/HolidayCalendar';
import { buttonVariants } from '@/components/ui/Button';

import { getAvailableYears, getHolidays } from '@/lib/fetch';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const currentYear = new Date().getFullYear();

  const availableYears = await getAvailableYears();

  if (availableYears.status !== 'OK') {
    return [];
  }

  const pastYears = availableYears.data.filter((year) => year < currentYear);

  return pastYears.map((year) => ({ slug: year.toString() }));
}

export const revalidate = 21600; // 6 hours

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const year = Number(slug);
  const currentYear = new Date().getFullYear();

  if (Number.isNaN(year)) {
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

  if (Number.isNaN(year)) {
    redirect(`/year/${currentYear}`);
  }

  const availableYears = await getAvailableYears();

  if (availableYears.status === 'OK' && !availableYears.data.includes(year)) {
    notFound();
  }

  const holidays = await getHolidays({ year });

  if (holidays.status === 'DATA_NOT_AVAILABLE') {
    notFound();
  }

  if (holidays.status === 'THIRD_PARTY_UNAVAILABLE' || holidays.status === 'UNKNOWN') {
    return <DataFetchError description={holidays.message} />;
  }

  return (
    <div className="flex flex-col justify-center space-y-4">
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
  );
}
