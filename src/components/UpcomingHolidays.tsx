import { Link } from 'next-view-transitions';

import { Badge } from '@/components/ui/Badge';
import { buttonVariants } from '@/components/ui/Button';

import { formatDate } from '@/lib/format';
import { UpcomingHoliday } from '@/lib/types';
import { cn } from '@/lib/utils';

interface UpcomingHolidaysProps {
  holidaysToShow: UpcomingHoliday[];
  year: number;
}

export default function UpcomingHolidays({ holidaysToShow, year }: UpcomingHolidaysProps) {
  return (
    <section className="flex h-full min-h-0 flex-col lg:pl-10">
      <header className="flex items-end justify-between border-b border-border pb-3">
        <div className="lg:-mt-1.5">
          <span className="font-mono text-[10px] tracking-[0.3em] text-text-muted uppercase">
            Agenda
          </span>

          <h2
            id="upcoming-holidays"
            className="mt-1 text-xl leading-none font-normal tracking-tight uppercase md:text-2xl lg:text-3xl"
          >
            Libur Mendatang
          </h2>
        </div>

        <Link
          href={`/year/${year}`}
          className={cn(
            buttonVariants({ className: 'font-mono uppercase md:text-xs lg:text-sm', size: 'sm' }),
          )}
        >
          Arsip {year}
        </Link>
      </header>

      <div className="scrollbar-width:thin flex max-h-186 min-h-0 flex-1 flex-col divide-y divide-border overflow-y-auto">
        {holidaysToShow.length > 0 ? (
          holidaysToShow.map((holiday, index) => (
            <article
              key={holiday.holidayDate.toString()}
              className="grid grid-cols-[28px_minmax(0,1fr)_auto] items-start gap-3 py-4 pr-1 md:grid-cols-[36px_minmax(0,1fr)_auto] md:py-5"
            >
              <span className="pt-0.5 font-mono text-[10px] tracking-[0.3em] text-text-muted">
                {String(index + 1).padStart(2, '0')}
              </span>

              <div className="min-w-0 pr-2">
                <h3 className="text-base leading-snug font-medium tracking-tight md:text-lg lg:text-xl">
                  {holiday.holidayName}
                </h3>

                <p className="mt-1 font-mono text-[10px] tracking-widest text-text-muted uppercase">
                  {formatDate(holiday.holidayDate, 'EEEE, dd MMMM yyyy')}
                </p>

                {holiday.isLeave && (
                  <Badge className="mt-1.5 font-mono text-[10px] tracking-[0.15em] uppercase">
                    * Cuti Bersama
                  </Badge>
                )}
              </div>

              <div className="pt-0.5 text-right font-mono">
                <span className="block text-lg leading-none tracking-tighter md:text-2xl">
                  {holiday.daysUntil}
                </span>

                <span className="mt-1 block text-[8px] tracking-[0.15em] text-text-muted uppercase md:text-[10px]">
                  Hari Lagi
                </span>
              </div>
            </article>
          ))
        ) : (
          <div className="flex min-h-64 flex-1 items-center justify-center">
            <div className="text-center">
              <p className="font-mono text-[10px] tracking-[0.3em] text-text-muted uppercase">
                Tidak Ada Libur Mendatang
              </p>

              <p className="mt-2 text-2xl leading-none font-medium tracking-tight">
                Agenda Berikutnya Belum Tersedia
              </p>
            </div>
          </div>
        )}
      </div>

      <footer className="mt-auto flex items-center justify-between border-t border-border pt-3 font-mono text-[10px] tracking-[0.3em] text-text-muted uppercase">
        <span>Total: {holidaysToShow.length} Agenda</span>
        <span>Libur Mendatang</span>
      </footer>
    </section>
  );
}
