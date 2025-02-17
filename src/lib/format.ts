import { formatInTimeZone, toZonedTime } from 'date-fns-tz';
import { id } from 'date-fns/locale';

const TIME_ZONE = 'Asia/Jakarta';

export const formatDate = (
  date: Date | string,
  dateFormat: string = 'EEEE, dd MMMM yyyy',
): string => {
  return formatInTimeZone(new Date(date), TIME_ZONE, dateFormat, { locale: id });
};

export const convertToIndonesianTime = (utcDate: Date): Date => {
  return toZonedTime(utcDate, TIME_ZONE);
};
