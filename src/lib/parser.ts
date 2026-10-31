import { differenceInDays, isSameDay } from 'date-fns';

import { convertToIndonesianTime, formatDate } from '@/lib/format';
import type { HolidayEntry, HolidaysByMonth, UpcomingHoliday } from '@/lib/types';

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
    .sort((a, b) => a.daysUntil - b.daysUntil);
};

export const groupHolidaysByMonth = (holidays: HolidayEntry[], year: number): HolidaysByMonth[] => {
  const sortedHolidays = [...holidays].sort((a, b) =>
    formatDate(a.holidayDate, 'yyyy-MM-dd').localeCompare(formatDate(b.holidayDate, 'yyyy-MM-dd')),
  );

  return Array.from({ length: 12 }, (_, index) => {
    const monthKey = `${year}-${String(index + 1).padStart(2, '0')}`;

    const monthHolidays = sortedHolidays.filter(
      (holiday) => formatDate(holiday.holidayDate, 'yyyy-MM') === monthKey,
    );

    return {
      month: formatDate(`${monthKey}-01`, 'MMMM'),
      holidays: monthHolidays,
    };
  });
};
