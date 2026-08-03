import { NextRequest, NextResponse } from 'next/server';

import type { ApiHolidayEntry, GetHolidayEntriesResponse, HolidayEntry } from '@/types/holiday';

import { API_BASE_URL } from '@/lib/constants';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const month = searchParams.get('month');
    const year = searchParams.get('year') ?? new Date().getFullYear().toString();

    let apiUrl = `${API_BASE_URL}?year=${year}`;

    if (month) {
      apiUrl += `&month=${month}`;
    }

    const response = await fetch(apiUrl);

    if (!response.ok) {
      if (response.status === 404) {
        const result: GetHolidayEntriesResponse = {
          success: true,
          status: 'DATA_NOT_AVAILABLE',
          message: 'Data kalender libur yang diminta belum tersedia.',
          data: [],
          lastFetch: new Date().toISOString(),
        };

        return NextResponse.json(result);
      }

      const result: GetHolidayEntriesResponse = {
        success: false,
        status: 'THIRD_PARTY_UNAVAILABLE',
        message: 'Gagal mengambil data kalender libur dari sumber pihak ketiga.',
        data: [],
        lastFetch: new Date().toISOString(),
      };

      return NextResponse.json(result, { status: 502 });
    }

    const responseData: ApiHolidayEntry[] = await response.json();

    const data: HolidayEntry[] = responseData.map((holiday) => ({
      holidayDate: holiday.tanggal,
      holidayName: holiday.keterangan,
      isLeave: holiday.is_cuti,
    }));

    const result: GetHolidayEntriesResponse = {
      success: true,
      status: 'OK',
      message: 'Berhasil mengambil data hari libur.',
      data,
      lastFetch: new Date().toISOString(),
    };

    return NextResponse.json(result);
  } catch {
    const result: GetHolidayEntriesResponse = {
      success: false,
      status: 'THIRD_PARTY_UNAVAILABLE',
      message: 'Terjadi kesalahan saat mengambil data kalender libur dari sumber pihak ketiga.',
      data: [],
      lastFetch: new Date().toISOString(),
    };

    return NextResponse.json(result, {
      status: 502,
    });
  }
}
