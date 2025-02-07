export type ApiHolidayEntry = {
  tanggal: string;
  keterangan: string;
  is_cuti: boolean;
};

export type HolidayEntry = {
  holidayDate: Date | string;
  holidayName: string;
  isLeave: boolean;
};

export interface UpcomingHoliday extends HolidayEntry {
  daysUntil: number;
}

export type GetHolidayEntriesResponse = {
  message: string;
  data: HolidayEntry[];
  lastFetch?: string;
};

export type GetHolidayEntriesParams = {
  month?: number;
  year?: number;
};
