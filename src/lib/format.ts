import { format } from 'date-fns';
import { id } from 'date-fns/locale';

export const formatDate = (
  date: Date | string,
  dateFormat: string = 'EEEE, dd MMMM yyyy',
): string => {
  return format(new Date(date), dateFormat, {
    locale: id,
  });
};
