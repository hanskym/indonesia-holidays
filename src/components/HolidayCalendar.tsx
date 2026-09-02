import { Badge } from '@/components/ui/Badge';

import { formatDate } from '@/lib/format';
import { groupHolidaysByMonth } from '@/lib/parser';
import { HolidayEntry } from '@/lib/types';

interface HolidayCalendarProps {
  holidays: HolidayEntry[];
  year: number;
}

export default function HolidayCalendar({ holidays, year }: HolidayCalendarProps) {
  const holidaysByMonth = groupHolidaysByMonth(holidays, year);
  const totalHolidays = holidays.length;

  return (
    <section aria-label={`Kalender hari libur ${year}`} className="py-10 md:py-14">
      <div className="border-b border-border pb-10 md:pb-14">
        <p className="font-mono text-xs tracking-[0.16em] text-text-muted uppercase">
          Tinjauan Tahunan
        </p>

        <div className="mt-5 grid gap-8 md:grid-cols-[minmax(0,1fr)_360px] md:items-end">
          <h1 className="-ml-1 text-[clamp(6rem,15vw,13rem)] leading-[0.7] font-light tracking-tighter">
            {year}
          </h1>

          <div className="space-y-5">
            <p className="max-w-md text-base leading-7 text-balance text-text-muted">
              Kalender tahunan hari libur nasional dan cuti bersama Indonesia, disusun dalam arsip
              bulanan yang mudah dipindai.
            </p>

            <div className="border-t border-border pt-4 font-mono text-[10px] tracking-[0.14em] text-text-muted uppercase">
              <span className="block">Total Hari Libur dalam Setahun</span>

              <div className="mt-2 flex items-baseline gap-3">
                <span className="text-4xl leading-none tracking-tight text-text">
                  {totalHolidays}
                </span>
                <span>Hari</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid border-x border-border md:grid-cols-2 xl:grid-cols-3">
        {holidaysByMonth.map((data, index) => (
          <article
            key={`${year}-${index}`}
            className="border-b border-border p-6 md:even:border-l xl:nth-[3n]:border-l xl:nth-[3n+2]:border-l"
          >
            <header className="flex items-start justify-between gap-4 border-b border-border pb-5">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-xs tracking-[0.15em] text-text-muted">
                  {String(index + 1).padStart(2, '0')}
                </span>

                <h2 className="text-2xl font-normal tracking-tight uppercase">{data.month}</h2>
              </div>

              <span className="font-mono text-[10px] tracking-[0.14em] text-text-muted uppercase">
                {year}
              </span>
            </header>

            <div className="min-h-56 divide-y divide-border">
              {data.holidays.length > 0 ? (
                data.holidays.map((holiday: HolidayEntry) => (
                  <div
                    key={`${holiday.holidayDate.toString()}-${holiday.holidayName}`}
                    className="grid grid-cols-[54px_minmax(0,1fr)] gap-3 py-4"
                  >
                    <span className="font-mono text-xs tracking-[0.08em] text-text-muted uppercase">
                      {formatDate(holiday.holidayDate, 'dd MMM')}
                    </span>

                    <div className="min-w-0">
                      <p className="leading-snug font-medium tracking-tight">
                        {holiday.holidayName}
                      </p>

                      {holiday.isLeave && (
                        <Badge className="mt-1.5 font-mono text-[10px] tracking-[0.15em] uppercase">
                          * Cuti Bersama
                        </Badge>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="py-7 font-mono text-[10px] tracking-[0.14em] text-text-muted uppercase">
                  Tidak ada hari libur.
                </p>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
