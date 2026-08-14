import { cache } from 'react';

import { API_BASE_URL } from '@/lib/constants';
import { apiHolidaysResponseSchema, apiYearsResponseSchema } from '@/lib/schema';
import type {
  FetchStatus,
  GetAvailableYearsResponse,
  GetHolidayEntriesResponse,
  HolidayEntry,
} from '@/lib/types';

export const HOLIDAYS_REVALIDATE_SECONDS = 21600; // 6 hours

export const YEARS_REVALIDATE_SECONDS = 86400; // 24 hours

export const FETCH_STATUS_TO_HTTP_STATUS: Record<FetchStatus, number> = {
  OK: 200,
  INVALID_PARAMS: 400,
  DATA_NOT_AVAILABLE: 404,
  THIRD_PARTY_UNAVAILABLE: 503,
  UNKNOWN: 500,
};

type GetHolidaysParams = {
  year: number;
  month?: number;
};

export const getHolidays = cache(
  async ({ year, month }: GetHolidaysParams): Promise<GetHolidayEntriesResponse> => {
    let apiUrl = `${API_BASE_URL}/holidays?year=${year}`;

    if (month) {
      apiUrl += `&month=${month}`;
    }

    let response: Response;
    try {
      response = await fetch(apiUrl, {
        next: {
          revalidate: HOLIDAYS_REVALIDATE_SECONDS,
          tags: ['holidays', `holidays-${year}`],
        },
      });
    } catch {
      return {
        success: false,
        status: 'THIRD_PARTY_UNAVAILABLE',
        message: 'Penyedia API hari libur tidak dapat dihubungi.',
        data: [],
        lastFetch: new Date().toISOString(),
      };
    }

    let rawPayload: unknown;
    try {
      rawPayload = await response.json();
    } catch {
      return {
        success: false,
        status: 'THIRD_PARTY_UNAVAILABLE',
        message: 'Penyedia API hari libur mengembalikan respons yang tidak valid.',
        data: [],
        lastFetch: new Date().toISOString(),
      };
    }

    const parsedPayload = apiHolidaysResponseSchema.safeParse(rawPayload);

    if (!parsedPayload.success) {
      return {
        success: false,
        status: 'THIRD_PARTY_UNAVAILABLE',
        message: 'Penyedia API hari libur mengembalikan format data yang tidak sesuai.',
        data: [],
        lastFetch: new Date().toISOString(),
      };
    }

    const payload = parsedPayload.data;

    try {
      if (!response.ok || !payload.success) {
        if (response.status === 404) {
          return {
            success: false,
            status: 'DATA_NOT_AVAILABLE',
            message: 'Data kalender libur untuk parameter yang diminta tidak ditemukan.',
            data: [],
            lastFetch: new Date().toISOString(),
          };
        }

        if (response.status === 400) {
          return {
            success: false,
            status: 'INVALID_PARAMS',
            message: !payload.success ? payload.error : 'Parameter permintaan tidak valid.',
            data: [],
            lastFetch: new Date().toISOString(),
          };
        }

        return {
          success: false,
          status: 'THIRD_PARTY_UNAVAILABLE',
          message: 'Gagal mengambil data kalender libur dari penyedia API.',
          data: [],
          lastFetch: new Date().toISOString(),
        };
      }

      const data: HolidayEntry[] = payload.data.map((holiday) => ({
        holidayDate: holiday.date,
        holidayName: holiday.name,
        isLeave: holiday.type === 'leave',
      }));

      return {
        success: true,
        status: 'OK',
        message: 'Berhasil mengambil data hari libur.',
        data,
        lastFetch: new Date().toISOString(),
      };
    } catch {
      return {
        success: false,
        status: 'UNKNOWN',
        message: 'Terjadi kesalahan tak terduga pada server.',
        data: [],
        lastFetch: new Date().toISOString(),
      };
    }
  },
);

export const getAvailableYears = cache(async (): Promise<GetAvailableYearsResponse> => {
  const apiUrl = `${API_BASE_URL}/years`;

  let response: Response;
  try {
    response = await fetch(apiUrl, {
      next: {
        revalidate: YEARS_REVALIDATE_SECONDS,
        tags: ['holiday-years'],
      },
    });
  } catch {
    return {
      success: false,
      status: 'THIRD_PARTY_UNAVAILABLE',
      message: 'Penyedia API daftar tahun tidak dapat dihubungi.',
      data: [],
    };
  }

  let rawPayload: unknown;
  try {
    rawPayload = await response.json();
  } catch {
    return {
      success: false,
      status: 'THIRD_PARTY_UNAVAILABLE',
      message: 'Penyedia API daftar tahun mengembalikan respons yang tidak valid.',
      data: [],
    };
  }

  const parsedPayload = apiYearsResponseSchema.safeParse(rawPayload);

  if (!parsedPayload.success) {
    return {
      success: false,
      status: 'THIRD_PARTY_UNAVAILABLE',
      message: 'Penyedia API daftar tahun mengembalikan format data yang tidak sesuai.',
      data: [],
    };
  }

  const payload = parsedPayload.data;

  if (!response.ok || !payload.success) {
    return {
      success: false,
      status: 'THIRD_PARTY_UNAVAILABLE',
      message: 'Gagal mengambil daftar tahun yang tersedia dari penyedia API.',
      data: [],
    };
  }

  return {
    success: true,
    status: 'OK',
    message: 'Berhasil mengambil daftar tahun yang tersedia.',
    data: payload.data,
  };
});
