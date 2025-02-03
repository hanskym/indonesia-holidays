import { GetHolidayEntriesResponse } from '@/types/holiday';

import { NEXT_BASE_URL } from '@/lib/constants';

export const fetchHolidays = async (year: number): Promise<GetHolidayEntriesResponse> => {
  const response = await fetch(`${NEXT_BASE_URL}/api/holidays?year=${year}`, {
    next: {
      revalidate: 86400, // 24 hours
      tags: ['holidays-data'],
    },
  });
  const { data, lastFetch } = await response.json();
  return { data, lastFetch };
};
