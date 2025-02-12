import { compareAsc, differenceInDays, isAfter, isToday } from 'date-fns';

import type { HolidayEntry, UpcomingHoliday } from '@/types/holiday';

import { formatDate } from '@/lib/format';

export const getTodayHoliday = (holidays: HolidayEntry[]): HolidayEntry | undefined => {
  return holidays.find((item) => isToday(new Date(item.holidayDate)));
};

export const getUpcomingHolidays = (
  holidays: HolidayEntry[],
  count: number = 4,
  comparisonDate: Date = new Date(),
): UpcomingHoliday[] => {
  const startOfDayComparison = new Date(comparisonDate);
  startOfDayComparison.setHours(0, 0, 0, 0);

  return holidays
    .reduce<UpcomingHoliday[]>((acc, holiday) => {
      const holidayDate = new Date(holiday.holidayDate);

      if (isAfter(holidayDate, startOfDayComparison)) {
        acc.push({
          ...holiday,
          daysUntil: differenceInDays(holidayDate, startOfDayComparison),
        });
      }
      return acc;
    }, [])
    .sort((a, b) => compareAsc(new Date(a.holidayDate), new Date(b.holidayDate)))
    .slice(0, count);
};

export const groupHolidaysByMonth = (
  holidays: HolidayEntry[],
  year: number,
): { month: string; holidays: HolidayEntry[] }[] => {
  const sortedHolidays = [...holidays].sort((a, b) =>
    compareAsc(new Date(a.holidayDate), new Date(b.holidayDate)),
  );

  return Array.from({ length: 12 }, (_, index) => {
    const monthHolidays = sortedHolidays.filter((holiday) => {
      const holidayDate = new Date(holiday.holidayDate);
      return holidayDate.getMonth() === index && holidayDate.getFullYear() === year;
    });

    return {
      month: formatDate(new Date(year, index), 'MMMM'),
      holidays: monthHolidays,
    };
  });
};
