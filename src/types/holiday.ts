export type HolidayEntry = {
  holidayDate: Date | string;
  holidayName: string;
  isLeave: boolean;
};

export interface UpcomingHoliday extends HolidayEntry {
  daysUntil: number;
}

export type HolidayStatus =
  'OK' | 'INVALID_PARAMS' | 'DATA_NOT_AVAILABLE' | 'THIRD_PARTY_UNAVAILABLE' | 'UNKNOWN';

export type GetHolidayEntriesResponse = {
  success: boolean;
  status: HolidayStatus;
  message: string;
  data: HolidayEntry[];
  lastFetch?: string;
};

export type GetHolidayEntriesParams = {
  month?: number;
  year?: number;
};
