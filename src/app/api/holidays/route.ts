import { NextRequest, NextResponse } from 'next/server';

import { FETCH_STATUS_TO_HTTP_STATUS, getHolidays } from '@/lib/fetch';
import { holidaysQuerySchema } from '@/lib/schema';
import type { GetHolidayEntriesResponse } from '@/lib/types';

const SUCCESS_CACHE_CONTROL = 'public, max-age=3600, s-maxage=21600, stale-while-revalidate=86400';
const ERROR_CACHE_CONTROL = 'no-store';

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

    return NextResponse.json(result, {
      status: 400,
      headers: { 'Cache-Control': ERROR_CACHE_CONTROL },
    });
  }

  const result = await getHolidays(parsedQuery.data);

  return NextResponse.json(result, {
    status: FETCH_STATUS_TO_HTTP_STATUS[result.status],
    headers: {
      'Cache-Control': result.status === 'OK' ? SUCCESS_CACHE_CONTROL : ERROR_CACHE_CONTROL,
    },
  });
}
