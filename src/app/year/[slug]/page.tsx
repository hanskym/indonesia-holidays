import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';

import { Link } from 'next-view-transitions';

import DataFetchError from '@/components/DataFetchError';
import HolidayCalendar from '@/components/HolidayCalendar';
import { Icons } from '@/components/ui/Icons';

import { getAvailableYears, getHolidays } from '@/lib/fetch';

type YearPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const currentYear = new Date().getFullYear();
  const availableYears = await getAvailableYears();

  if (availableYears.status !== 'OK') {
    return [];
  }

  return availableYears.data
    .filter((year) => year < currentYear)
    .map((year) => ({
      slug: year.toString(),
    }));
}

export const revalidate = 21600; // 6 hours

export async function generateMetadata({ params }: YearPageProps): Promise<Metadata> {
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

export default async function YearPage({ params }: YearPageProps) {
  const { slug } = await params;

  const year = Number(slug);
  const currentYear = new Date().getFullYear();

  if (Number.isNaN(year)) {
    redirect(`/year/${currentYear}`);
  }

  const holidays = await getHolidays({ year });

  if (holidays.status === 'DATA_NOT_AVAILABLE') {
    notFound();
  }

  if (holidays.status === 'THIRD_PARTY_UNAVAILABLE' || holidays.status === 'UNKNOWN') {
    return <DataFetchError description={holidays.message} />;
  }

  return (
    <div>
      <nav
        className="grid grid-cols-[1fr_auto_1fr] items-center border-b border-border py-5 font-mono text-xs tracking-[0.14em] uppercase"
        aria-label="Navigasi tahun"
      >
        <Link
          href={`/year/${year - 1}`}
          className="inline-flex items-center gap-1 justify-self-start transition-colors hover:text-text-muted"
        >
          <Icons.arrowleft className="size-3" />
          {year - 1}
        </Link>

        <span className="px-5">{year}</span>

        <Link
          href={`/year/${year + 1}`}
          className="inline-flex items-center gap-1 justify-self-end transition-colors hover:text-text-muted"
        >
          {year + 1}
          <Icons.arrowright className="size-3" />
        </Link>
      </nav>

      <HolidayCalendar holidays={holidays.data} year={year} />
    </div>
  );
}
