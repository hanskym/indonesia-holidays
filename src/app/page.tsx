import type { Metadata } from 'next';

import DataFetchError from '@/components/DataFetchError';
import TodayHoliday from '@/components/TodayHoliday';
import UpcomingHolidays from '@/components/UpcomingHolidays';

import { siteConfig } from '@/config/site';
import { getHolidays } from '@/lib/fetch';
import { getTodayHoliday, getUpcomingHolidays } from '@/lib/parser';

export const metadata: Metadata = {
  title: `Cek Hari Libur Sekarang | ${siteConfig.name}`,
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: `Cek Hari Libur Sekarang | ${siteConfig.name}`,
    description: siteConfig.description,
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
    title: `Cek Hari Libur Sekarang | ${siteConfig.name}`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
};

export const revalidate = 180; // 3 minutes

export default async function HomePage() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  const currentYearResult = await getHolidays({
    year: currentYear,
  });

  if (
    currentYearResult.status === 'THIRD_PARTY_UNAVAILABLE' ||
    currentYearResult.status === 'UNKNOWN'
  ) {
    return <DataFetchError description={currentYearResult.message} />;
  }

  let allHolidays = currentYearResult.data;
  let lastFetch = currentYearResult.lastFetch;

  // Include next year's holidays when the calendar is available.
  const nextYearResult = await getHolidays({
    year: currentYear + 1,
  });

  if (nextYearResult.status === 'OK' && nextYearResult.data.length > 0) {
    allHolidays = [...allHolidays, ...nextYearResult.data];
    lastFetch = nextYearResult.lastFetch ?? lastFetch;
  }

  const todayHoliday = getTodayHoliday(allHolidays, currentDate);
  const upcomingHolidays = getUpcomingHolidays(allHolidays, currentDate);

  return (
    <div className="grid grid-cols-1 items-stretch gap-y-8 pt-8 lg:grid-cols-[1.15fr_0.85fr] lg:divide-x lg:divide-border lg:pt-10">
      <TodayHoliday currentDate={currentDate} todayHoliday={todayHoliday} lastFetch={lastFetch} />

      <UpcomingHolidays holidaysToShow={upcomingHolidays} year={currentYear} />
    </div>
  );
}
