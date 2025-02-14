import { formatInTimeZone } from 'date-fns-tz';
import { id } from 'date-fns/locale';

export const formatDate = (
  date: Date | string,
  dateFormat: string = 'EEEE, dd MMMM yyyy',
): string => {
  const timeZone = 'Asia/Jakarta';

  return formatInTimeZone(new Date(date), timeZone, dateFormat, { locale: id });
};
