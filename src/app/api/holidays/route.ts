import { NextResponse } from 'next/server';

import type { ApiHolidayEntry, HolidayEntry } from '@/types/holiday';

import { API_BASE_URL } from '@/lib/constants';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const month = searchParams.get('month');
    const year = searchParams.get('year') ?? new Date().getFullYear().toString();

    let apiUrl = API_BASE_URL;
    if (month || year) {
      apiUrl += `?year=${year}`;
      if (month) apiUrl += `&month=${month}`;
    }

    const response = await fetch(apiUrl, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData: Promise<ApiHolidayEntry[]> = response.json();

    const data: HolidayEntry[] = (await responseData).map(({ tanggal, keterangan, is_cuti }) => ({
      holidayDate: tanggal,
      holidayName: keterangan,
      isLeave: is_cuti,
    }));

    return NextResponse.json(
      {
        message: 'Data fetched successfully',
        filter: { month: month ?? 'all', year },
        data,
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
