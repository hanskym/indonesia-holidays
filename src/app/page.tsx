import { format } from 'date-fns';
import { id } from 'date-fns/locale';

import type { GetHolidayEntriesResponse } from '@/types/holiday';

import { NEXT_BASE_URL } from '@/lib/constants';
import { getTodayHoliday, getUpcomingHolidays } from '@/lib/parser';

export default async function Home() {
  const response = await fetch(`${NEXT_BASE_URL}/api/holidays`, {
    cache: 'no-store',
  });
  const { data } = await response.json();
  const holidays: GetHolidayEntriesResponse = data;

  const todayHoliday = await getTodayHoliday(holidays);
  const nextHolidays = await getUpcomingHolidays(holidays, 4);

  const upcomingHolidays = todayHoliday ? nextHolidays.slice(0, 3) : nextHolidays.slice(1, 4);
  const nextHoliday = todayHoliday ? nextHolidays[0] : nextHolidays[0];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans leading-normal tracking-normal">
      {/* Header */}
      <header className="bg-black text-white py-4">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Libur</h1>
            <nav>
              <ul className="flex space-x-8">
                <li>
                  <a href="#" className="hover:text-gray-300 transition-colors">
                    Tentang
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          {/* Hero Section */}
          <section className="max-w-2xl mx-auto text-center mb-16">
            <h1 className="text-2xl font-semibold mb-6">
              {format(new Date(), 'EEEE, dd MMMM yyyy', { locale: id })}
            </h1>
            {todayHoliday ? (
              <>
                <h2 className="text-5xl font-semibold mb-6">Hari Ini Libur!</h2>
                <p className="text-xl text-gray-800 mb-12">{todayHoliday.holiday_name}</p>
              </>
            ) : nextHoliday ? (
              <>
                <h2 className="text-5xl font-semibold mb-6">Libur Nasional Berikutnya</h2>
                <p className="text-xl text-gray-800 mb-12">
                  {nextHoliday.holiday_name} -{' '}
                  {format(new Date(nextHoliday.holiday_date), 'EEEE, dd MMMM yyyy', { locale: id })}
                  <br />
                  <span className="text-gray-600 text-base">{nextHoliday.daysUntil} hari lagi</span>
                </p>
              </>
            ) : (
              <h2 className="text-5xl font-semibold mb-6">Tidak ada hari libur mendatang</h2>
            )}
          </section>

          {/* Cards Section */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {upcomingHolidays.map((holiday, index) => (
              <div key={holiday.holiday_date.toString()} className="group">
                <div className="rounded-none border border-gray-200 bg-white p-6 h-full transition-all duration-300 hover:border-black">
                  <div className="text-4xl font-semibold text-gray-800 mb-4">
                    {(index + 1).toString().padStart(2, '0')}
                  </div>
                  <h3 className="text-2xl font-medium mb-4">{holiday.holiday_name}</h3>
                  <p className="text-gray-600 mb-2">
                    {format(new Date(holiday.holiday_date), 'EEEE, dd MMMM yyyy', { locale: id })}
                  </p>
                  <p className="text-black font-normal">{holiday.daysUntil} hari lagi</p>
                </div>
              </div>
            ))}
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-gray-600">&copy; 2025 Kalender Libur Indonesia</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
