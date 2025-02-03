import { GetHolidayEntriesResponse } from '@/types/holiday';

import TodayHoliday from '@/components/TodayHoliday';
import UpcomingHolidays from '@/components/UpcomingHolidays';

import { fetchHolidays } from '@/lib/fetch';
import { getTodayHoliday, getUpcomingHolidays } from '@/lib/parser';

export default async function HomePage() {
  const currentYear = new Date().getFullYear();

  const holidaysThisYear: GetHolidayEntriesResponse = await fetchHolidays(currentYear);

  const upcomingHolidayCount = 4;
  let allHolidays = holidaysThisYear.data;
  let lastFetch = holidaysThisYear.lastFetch;

  if (holidaysThisYear.data.length < upcomingHolidayCount) {
    const holidaysNextYear: GetHolidayEntriesResponse = await fetchHolidays(currentYear + 1);
    allHolidays = [...holidaysThisYear.data, ...holidaysNextYear.data];

    lastFetch = holidaysNextYear.lastFetch || holidaysThisYear.lastFetch;
  }

  const upcomingHolidays = getUpcomingHolidays(allHolidays, upcomingHolidayCount);
  const todayHoliday = getTodayHoliday(allHolidays);

  const holidaysToShow = todayHoliday ? upcomingHolidays.slice(0, 3) : upcomingHolidays.slice(1, 4);

  return (
    <div className="relative mx-auto flex w-full flex-col justify-center 2xl:max-w-7xl">
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
