import { compareAsc, differenceInDays, isSameDay } from 'date-fns';

import type { HolidayEntry, UpcomingHoliday } from '@/types/holiday';

import { convertToIndonesianTime, formatDate } from '@/lib/format';

export const getTodayHoliday = (
  holidays: HolidayEntry[],
  currentDate: Date = new Date(),
): HolidayEntry | undefined => {
  const today = convertToIndonesianTime(currentDate);
  today.setHours(0, 0, 0, 0);

  return holidays.find((item) => {
    const holidayDate = convertToIndonesianTime(new Date(item.holidayDate));
    holidayDate.setHours(0, 0, 0, 0);

    return isSameDay(today, holidayDate);
  });
};

export const getUpcomingHolidays = (
  holidays: HolidayEntry[],
  count: number = 4,
  comparisonDate: Date = new Date(),
): UpcomingHoliday[] => {
  const startOfDayComparison = convertToIndonesianTime(comparisonDate);
  startOfDayComparison.setHours(0, 0, 0, 0);

  return holidays
    .map((holiday) => {
      const holidayDate = convertToIndonesianTime(new Date(holiday.holidayDate));
      holidayDate.setHours(0, 0, 0, 0);

      return {
        ...holiday,
        daysUntil: differenceInDays(holidayDate, startOfDayComparison),
      };
    })
    .filter((holiday) => holiday.daysUntil > 0)
    .sort((a, b) => a.daysUntil - b.daysUntil)
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
