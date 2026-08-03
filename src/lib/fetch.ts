import type { GetHolidayEntriesResponse } from '@/types/holiday';

import { NEXT_BASE_URL } from '@/lib/constants';

export const fetchHolidays = async (year: number): Promise<GetHolidayEntriesResponse> => {
  try {
    const response = await fetch(`${NEXT_BASE_URL}/api/holidays?year=${year}`, {
      // next: {
      //   revalidate: 86400, // 24 hours
      //   tags: ['holidays-data'],
      // },
    });

    const result: GetHolidayEntriesResponse = await response.json();

    if (!response.ok) {
      return {
        success: false,
        status: result.status,
        message: result.message,
        data: [],
        lastFetch: result.lastFetch,
      };
    }

    return result;
  } catch (error) {
    return {
      success: false,
      status: 'UNKNOWN',
      message:
        error instanceof Error
          ? error.message
          : 'Terjadi kesalahan saat mengambil data hari libur.',
      data: [],
      lastFetch: new Date().toISOString(),
    };
  }
};
