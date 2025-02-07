import { NextRequest, NextResponse } from 'next/server';

import type { ApiHolidayEntry, HolidayEntry } from '@/types/holiday';

import { API_BASE_URL } from '@/lib/constants';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const month = searchParams.get('month');
    const year = searchParams.get('year') ?? new Date().getFullYear().toString();

    let apiUrl = API_BASE_URL;
    if (month || year) {
      apiUrl += `?year=${year}`;
      if (month) apiUrl += `&month=${month}`;
    }

    const response = await fetch(apiUrl);

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          {
            message: 'No holidays found for the specified month/year.',
            filter: { month: month ?? 'all', year },
            data: [],
            lastFetch: new Date().toISOString(),
          },
          { status: 404 },
        );
      }

      throw new Error(`Unexpected response from external data provider`);
    }

    const responseData: ApiHolidayEntry[] = await response.json();

    const data: HolidayEntry[] = responseData.map((holiday: ApiHolidayEntry) => ({
      holidayDate: holiday.tanggal,
      holidayName: holiday.keterangan,
      isLeave: holiday.is_cuti,
    }));

    return NextResponse.json(
      {
        message: 'Data fetched successfully',
        filter: { month: month ?? 'all', year },
        data,
        lastFetch: new Date().toISOString(),
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Failed to fetch data',
        message: error instanceof Error ? error.message : 'Unknown error occurred',
      },
      { status: 500 },
    );
  }
}
