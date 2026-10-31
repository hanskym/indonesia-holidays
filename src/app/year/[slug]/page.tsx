import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';

import { Link } from 'next-view-transitions';

import DataFetchError from '@/components/DataFetchError';
import HolidayCalendar from '@/components/HolidayCalendar';
import { Icons } from '@/components/ui/Icons';

import { siteConfig } from '@/config/site';
import { getAvailableYears, getHolidays } from '@/lib/fetch';
import { formatDate } from '@/lib/format';
import { yearSchema } from '@/lib/schema';

type YearPageProps = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 21600; // 6 hours

export async function generateMetadata({ params }: YearPageProps): Promise<Metadata> {
  const { slug } = await params;

  const currentYear = Number(formatDate(new Date(), 'yyyy'));
  const result = yearSchema.safeParse(slug);

  if (!result.success) {
    redirect(`/year/${currentYear}`);
  }

  const year = result.data;

  return {
    title: `Kalender Libur Tahun ${year}`,
    description: `Daftar lengkap hari libur nasional dan cuti bersama di Indonesia untuk tahun ${year}.`,
    keywords: [`Hari Libur ${year}`, `Cuti Bersama ${year}`, 'Kalender Indonesia'],
    alternates: {
      canonical: `/year/${year}`,
    },
    openGraph: {
      title: `Kalender Libur Tahun ${year} | ${siteConfig.name}`,
      description: `Daftar lengkap hari libur nasional dan cuti bersama di Indonesia untuk tahun ${year}.`,
      images: [
        {
          alt: siteConfig.name,
          height: 630,
          url: siteConfig.ogImage,
          width: 1200,
        },
      ],
      locale: 'id_ID',
      siteName: siteConfig.name,
      type: 'website',
      url: siteConfig.url,
    },
    twitter: {
      card: 'summary_large_image',
      creator: siteConfig.aboutMe.socials.twitterUsername,
      title: `Kalender Libur Tahun ${year} | ${siteConfig.name}`,
      description: `Daftar lengkap hari libur nasional dan cuti bersama di Indonesia untuk tahun ${year}.`,
      images: [siteConfig.ogImage],
    },
  };
}

export async function generateStaticParams() {
  const currentYear = Number(formatDate(new Date(), 'yyyy'));
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

export default async function YearPage({ params }: YearPageProps) {
  const { slug } = await params;

  const currentYear = Number(formatDate(new Date(), 'yyyy'));
  const result = yearSchema.safeParse(slug);

  if (!result.success) {
    redirect(`/year/${currentYear}`);
  }

  const year = result.data;

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
        className="sticky top-24 z-40 grid grid-cols-[1fr_auto_1fr] items-center border-b border-border bg-background py-2 font-mono text-xs tracking-[0.14em] uppercase"
        aria-label="Navigasi tahun"
      >
        <Link
          href={`/year/${year - 1}`}
          className="inline-flex min-h-10 items-center gap-1 justify-self-start px-2 transition-colors hover:text-text-muted"
        >
          <Icons.arrowleft className="size-3" />
          {year - 1}
        </Link>

        <span className="inline-flex min-h-10 items-center">{year}</span>

        <Link
          href={`/year/${year + 1}`}
          className="inline-flex min-h-10 items-center gap-1 justify-self-end px-2 transition-colors hover:text-text-muted"
        >
          {year + 1}
          <Icons.arrowright className="size-3" />
        </Link>
      </nav>

      <HolidayCalendar holidays={holidays.data} year={year} />
    </div>
  );
}
