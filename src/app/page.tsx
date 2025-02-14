import type { Metadata } from 'next';

import { GetHolidayEntriesResponse } from '@/types/holiday';

import TodayHoliday from '@/components/TodayHoliday';
import UpcomingHolidays from '@/components/UpcomingHolidays';

import { siteConfig } from '@/config/site';
import { fetchHolidays } from '@/lib/fetch';
import { getTodayHoliday, getUpcomingHolidays } from '@/lib/parser';

export const runtime = 'edge';

export const metadata: Metadata = {
  title: `Cek Hari Libur Sekarang | ${siteConfig.name}`,
};

export default async function HomePage() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  const holidaysThisYear: GetHolidayEntriesResponse = await fetchHolidays(currentYear);

  const upcomingHolidayCount = 4;
  let allHolidays = holidaysThisYear.data;
  let lastFetch = holidaysThisYear.lastFetch;

  const todayHoliday = getTodayHoliday(allHolidays);
  let upcomingHolidays = getUpcomingHolidays(allHolidays, upcomingHolidayCount, currentDate);

  if (upcomingHolidays.length < upcomingHolidayCount) {
    const holidaysNextYear: GetHolidayEntriesResponse = await fetchHolidays(currentYear + 1);

    allHolidays = [...holidaysThisYear.data, ...holidaysNextYear.data];
    const combinedUpcomingHolidays = getUpcomingHolidays(
      allHolidays,
      upcomingHolidayCount,
      currentDate,
    );

    lastFetch = holidaysNextYear.lastFetch || holidaysThisYear.lastFetch;
    upcomingHolidays = combinedUpcomingHolidays;
  }

  const holidaysToShow = todayHoliday ? upcomingHolidays.slice(0, 3) : upcomingHolidays.slice(1, 4);

  return (
    <div className="relative mx-auto flex w-full flex-col justify-center">
      <div className="container mx-auto max-w-6xl space-y-4 px-4">
        <TodayHoliday
          todayHoliday={todayHoliday}
          nextHoliday={upcomingHolidays[0]}
          lastFetch={lastFetch}
        />

        <UpcomingHolidays holidaysToShow={holidaysToShow} year={currentYear} />
      </div>
    </div>
  );
}
