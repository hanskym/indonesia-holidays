import ImageDisplay from '@/components/ImageDisplay';

import { formatDate } from '@/lib/format';
import { HolidayEntry } from '@/lib/types';
import { cn } from '@/lib/utils';

interface TodayHolidayProps {
  currentDate: Date;
  todayHoliday?: HolidayEntry;
  lastFetch?: string;
}

export default function TodayHoliday({ currentDate, todayHoliday, lastFetch }: TodayHolidayProps) {
  const day = formatDate(currentDate, 'dd');
  const month = formatDate(currentDate, 'MMMM');
  const year = formatDate(currentDate, 'yyyy');
  const weekday = formatDate(currentDate, 'EEEE');

  const isWeekend = currentDate.getDay() === 0 || currentDate.getDay() === 6;

  const statusDescription = todayHoliday
    ? todayHoliday.isLeave
      ? 'Cuti bersama yang ditetapkan.'
      : 'Hari libur nasional yang ditetapkan.'
    : isWeekend
      ? 'Akhir pekan telah tiba.'
      : 'Hari kerja reguler.';

  return (
    <section className="flex h-full flex-col lg:pr-10">
      <header className="flex items-center justify-between border-b border-border pb-3 font-mono text-[10px] tracking-[0.3em] uppercase">
        <div>Edisi Harian</div>

        {lastFetch && (
          <div className="flex items-center gap-2 text-text-muted">
            <span className="md:hidden">Diperbarui: {formatDate(lastFetch, 'HH:mm')}</span>
            <span className="hidden md:inline">
              Diperbarui: {formatDate(lastFetch, 'dd MMM yyyy, HH:mm:ss')}
            </span>

            {/* <RevalidateHolidaysButton /> */}
          </div>
        )}
      </header>

      <div className="flex flex-col gap-8 border-b border-border py-10 md:flex-row md:gap-12">
        <div className="flex flex-1 flex-col justify-center">
          <h1
            id="today-holiday"
            className="text-[clamp(2.5rem,5vw,4rem)] leading-none font-normal tracking-tight uppercase"
          >
            <span className="text-[clamp(8rem,18vw,10rem)] leading-[0.75] font-light tracking-tighter">
              {day}{' '}
            </span>
            <span className="mt-3 block">
              {month}, {year}
            </span>
          </h1>
        </div>

        <div className="flex flex-1 flex-col justify-between space-y-6 border-t border-border pt-6 md:border-t-0 md:border-l md:pt-0 md:pl-10">
          <div>
            <p className="font-mono text-[10px] tracking-[0.3em] text-text-muted uppercase">Hari</p>

            <p className={cn('leading-snug font-medium', todayHoliday ? 'text-xl' : 'text-3xl')}>
              {weekday}
            </p>
          </div>

          {todayHoliday && (
            <div>
              <p className="font-mono text-[10px] tracking-[0.3em] text-text-muted uppercase">
                Libur Nasional
              </p>

              <p className="text-xl leading-snug font-medium">{todayHoliday.holidayName}</p>
            </div>
          )}

          <div>
            <p className="font-mono text-[10px] tracking-[0.3em] text-text-muted uppercase">
              Kondisi Saat Ini
            </p>

            <p className={cn('leading-snug font-medium', todayHoliday ? 'text-xl' : 'text-3xl')}>
              {statusDescription}
            </p>
          </div>
        </div>
      </div>

      <figure className="mt-8 flex flex-1 flex-col pb-0">
        <div className="group relative aspect-video min-h-50 w-full flex-1 overflow-hidden">
          <div className="relative size-full overflow-hidden">
            <ImageDisplay todayHoliday={todayHoliday} isWeekend={isWeekend} />
          </div>
        </div>

        <figcaption className="mt-auto flex items-center justify-between border-t border-border pt-3 font-mono text-[10px] tracking-[0.3em] text-text-muted uppercase">
          <div className="flex items-center gap-2 md:gap-4">
            <span className="font-bold">FIG. {day}</span>
            <span>/</span>
            <span>Apendiks Visual</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden md:inline">
              Status: {todayHoliday ? 'Hari Libur' : isWeekend ? 'Akhir Pekan' : 'Hari Kerja'}
            </span>
            <span className="hidden md:inline">•</span>
            <span>Edisi {currentDate.getFullYear()}</span>
          </div>
        </figcaption>
      </figure>
    </section>
  );
}
