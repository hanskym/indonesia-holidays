import { HolidayEntry, UpcomingHoliday } from '@/types/holiday';

import ImageDisplay from '@/components/ImageDisplay';
// import { RevalidateHolidaysButton } from '@/components/RevalidateHolidaysButton';
import { Badge } from '@/components/ui/Badge';
import { Icons } from '@/components/ui/Icons';

import { formatDate } from '@/lib/format';

interface TodayHolidayProps {
  currentDate: Date;
  todayHoliday?: HolidayEntry;
  nextHoliday: UpcomingHoliday;
  lastFetch?: string;
}

export default function TodayHoliday({
  currentDate = new Date(),
  todayHoliday,
  nextHoliday,
  lastFetch,
}: TodayHolidayProps) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-card p-8">
      <div className="absolute top-4 right-4 z-20">
        {lastFetch && (
          <div className="flex items-center gap-2 text-right text-xs text-text-muted">
            <div className="flex flex-col gap-x-1 md:flex-row">
              <p>Data diperbarui pada</p>
              <p>{formatDate(lastFetch, 'dd MMM yyyy, HH:mm:ss')}</p>
            </div>

            {/* <RevalidateHolidaysButton /> */}
          </div>
        )}
      </div>
      <div className="mt-4 grid md:grid-cols-2">
        <div className="relative z-10 flex flex-col justify-between space-y-6">
          <div className="relative flex aspect-square size-12 rounded-full border border-border before:absolute before:-inset-2 before:rounded-full before:border before:border-border">
            <Icons.calendar className="m-auto size-6" />
          </div>

          <div className="space-y-4">
            <Badge className="p-1">
              <h1 className="text-sm">Hari ini: {formatDate(currentDate, 'EEEE, dd MMMM yyyy')}</h1>
            </Badge>

            {todayHoliday ? (
              <>
                <h2 className="mb-6 text-3xl font-bold">Hari Ini Libur!</h2>
                <p className="text-xl font-medium">{todayHoliday.holidayName}</p>
              </>
            ) : nextHoliday ? (
              <>
                <h2 className="mb-6 text-3xl font-bold">Kapan hari libur terdekat?</h2>
                <p className="text-xl font-medium">
                  {nextHoliday.holidayName} -{' '}
                  {formatDate(nextHoliday.holidayDate, 'EEEE, dd MMMM yyyy')}
                </p>
                <p className="mt-4 text-base text-text-muted">
                  {nextHoliday.daysUntil === 1
                    ? 'Besok adalah hari libur 🎉'
                    : `${nextHoliday.daysUntil} hari lagi`}
                </p>
              </>
            ) : (
              <>
                <h2 className="mb-6 text-3xl font-bold">
                  Yah, tidak ada hari libur yang akan datang.
                </h2>
                <p className="text-xl font-medium text-text-muted">
                  Silakan periksa kembali nanti.
                </p>
              </>
            )}
          </div>
        </div>
        <div className="relative mt-6 -mr-[34px] -mb-[34px] h-fit overflow-hidden rounded-tl-lg border-2 border-border bg-card-content px-3 py-6 transition-all duration-300 sm:mt-auto sm:ml-6">
          <div className="absolute top-2 left-3 flex gap-1">
            <span className="block size-2 rounded-full bg-border"></span>
            <span className="block size-2 rounded-full bg-border"></span>
            <span className="block size-2 rounded-full bg-border"></span>
          </div>

          <div className="mt-2 max-h-48">
            <ImageDisplay todayHoliday={todayHoliday} />
          </div>
        </div>
      </div>
    </div>
  );
}
