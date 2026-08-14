import type { Metadata } from 'next';

import DataFetchError from '@/components/DataFetchError';
import TodayHoliday from '@/components/TodayHoliday';
import UpcomingHolidays from '@/components/UpcomingHolidays';

import { siteConfig } from '@/config/site';
import { getHolidays } from '@/lib/fetch';
import { getTodayHoliday, getUpcomingHolidays } from '@/lib/parser';

export const metadata: Metadata = {
  title: `Cek Hari Libur Sekarang | ${siteConfig.name}`,
};

export const revalidate = 180; // 3 minutes

export default async function HomePage() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  const initialResult = await getHolidays({ year: currentYear });

  if (initialResult.status === 'THIRD_PARTY_UNAVAILABLE' || initialResult.status === 'UNKNOWN') {
    return <DataFetchError description={initialResult.message} />;
  }

  let allHolidays = initialResult.data;
  let lastFetch = initialResult.lastFetch;

  const upcomingHolidayCount = 4;

  let upcomingHolidays = getUpcomingHolidays(allHolidays, upcomingHolidayCount, currentDate);

  const todayHoliday = getTodayHoliday(allHolidays, currentDate);

  if (upcomingHolidays.length < upcomingHolidayCount) {
    const nextYearResult = await getHolidays({ year: currentYear + 1 });

    if (nextYearResult.status === 'OK') {
      allHolidays = [...allHolidays, ...nextYearResult.data];
      lastFetch = nextYearResult.lastFetch ?? lastFetch;

      upcomingHolidays = getUpcomingHolidays(allHolidays, upcomingHolidayCount, currentDate);
    }
  }

  const holidaysToShow = todayHoliday ? upcomingHolidays.slice(0, 3) : upcomingHolidays.slice(1, 4);

  return (
    <div className="flex flex-col justify-center space-y-4">
      <TodayHoliday
        currentDate={currentDate}
        todayHoliday={todayHoliday}
        nextHoliday={upcomingHolidays[0]}
        lastFetch={lastFetch}
      />

      <UpcomingHolidays holidaysToShow={holidaysToShow} year={currentYear} />
    </div>
  );
}
