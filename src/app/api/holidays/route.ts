import { NextRequest, NextResponse } from 'next/server';

import type { GetHolidayEntriesResponse, HolidayEntry } from '@/types/holiday';

import { API_BASE_URL } from '@/lib/constants';
import { apiHolidaysResponseSchema, holidaysQuerySchema } from '@/lib/schema';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const yearParam = searchParams.get('year');
  const monthParam = searchParams.get('month');

  const parsedQuery = holidaysQuerySchema.safeParse({
    year: yearParam?.trim() || new Date().getFullYear().toString(),
    month: monthParam ?? undefined,
  });

  if (!parsedQuery.success) {
    const message = parsedQuery.error.issues.map((issue) => issue.message).join(' ');

    const result: GetHolidayEntriesResponse = {
      success: false,
      status: 'INVALID_PARAMS',
      message,
      data: [],
      lastFetch: new Date().toISOString(),
    };

    return NextResponse.json(result, { status: 400 });
  }

  const { year, month } = parsedQuery.data;

  let apiUrl = `${API_BASE_URL}/holidays?year=${year}`;

  if (month) {
    apiUrl += `&month=${month}`;
  }

  let response: Response;
  try {
    response = await fetch(apiUrl);
  } catch {
    const result: GetHolidayEntriesResponse = {
      success: false,
      status: 'THIRD_PARTY_UNAVAILABLE',
      message: 'Penyedia API hari libur tidak dapat dihubungi.',
      data: [],
      lastFetch: new Date().toISOString(),
    };

    return NextResponse.json(result, { status: 503 });
  }

  let rawPayload: unknown;
  try {
    rawPayload = await response.json();
  } catch {
    const result: GetHolidayEntriesResponse = {
      success: false,
      status: 'THIRD_PARTY_UNAVAILABLE',
      message: 'Penyedia API hari libur mengembalikan respons yang tidak valid.',
      data: [],
      lastFetch: new Date().toISOString(),
    };

    return NextResponse.json(result, { status: 502 });
  }

  const parsedPayload = apiHolidaysResponseSchema.safeParse(rawPayload);

  if (!parsedPayload.success) {
    const result: GetHolidayEntriesResponse = {
      success: false,
      status: 'THIRD_PARTY_UNAVAILABLE',
      message: 'Penyedia API hari libur mengembalikan format data yang tidak sesuai.',
      data: [],
      lastFetch: new Date().toISOString(),
    };

    return NextResponse.json(result, { status: 502 });
  }

  const payload = parsedPayload.data;

  try {
    if (!response.ok || !payload.success) {
      if (response.status === 404) {
        const result: GetHolidayEntriesResponse = {
          success: false,
          status: 'DATA_NOT_AVAILABLE',
          message: 'Data kalender libur untuk parameter yang diminta belum tersedia.',
          data: [],
          lastFetch: new Date().toISOString(),
        };

        return NextResponse.json(result, { status: 404 });
      }

      if (response.status === 400) {
        const message = !payload.success ? payload.error : 'Parameter permintaan tidak valid.';

        const result: GetHolidayEntriesResponse = {
          success: false,
          status: 'INVALID_PARAMS',
          message,
          data: [],
          lastFetch: new Date().toISOString(),
        };

        return NextResponse.json(result, { status: 400 });
      }

      const result: GetHolidayEntriesResponse = {
        success: false,
        status: 'THIRD_PARTY_UNAVAILABLE',
        message: 'Gagal mengambil data kalender libur dari penyedia API.',
        data: [],
        lastFetch: new Date().toISOString(),
      };

      return NextResponse.json(result, { status: 502 });
    }

    const data: HolidayEntry[] = payload.data.map((holiday) => ({
      holidayDate: holiday.date,
      holidayName: holiday.name,
      isLeave: holiday.type === 'leave',
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
      status: 'UNKNOWN',
      message: 'Terjadi kesalahan tak terduga pada server.',
      data: [],
      lastFetch: new Date().toISOString(),
    };

    return NextResponse.json(result, { status: 500 });
  }
}
