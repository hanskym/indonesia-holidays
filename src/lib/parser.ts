import { compareAsc, differenceInDays, isAfter, isToday } from 'date-fns';

import type { GetHolidayEntriesResponse, HolidayEntry, UpcomingHoliday } from '@/types/holiday';

export const getTodayHoliday = (holidays: GetHolidayEntriesResponse): HolidayEntry | undefined => {
  return holidays.find((item) => isToday(new Date(item.holiday_date)) && item.is_national_holiday);
};

export const getUpcomingHolidays = (
  holidays: GetHolidayEntriesResponse,
  count: number = 4,
): UpcomingHoliday[] => {
  const today = new Date();

  return holidays
    .sort((a, b) => compareAsc(new Date(a.holiday_date), new Date(b.holiday_date)))
    .filter((item) => isAfter(new Date(item.holiday_date), today) && item.is_national_holiday)
    .map((holiday) => ({
      ...holiday,
      daysUntil: differenceInDays(new Date(holiday.holiday_date), today),
    }))
    .slice(0, count);
};
