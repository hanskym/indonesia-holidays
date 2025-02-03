'use client';

export default function Footer() {
  return (
    <footer className="p-4">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
          <p>&copy; {new Date().getFullYear()} Libur</p>
          <p>
            Sumber data:{' '}
            <a
              href="https://dayoffapi.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="dayoff-API"
            >
              dayoff-API
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
