import { Link } from 'next-view-transitions';

export default function Header() {
  return (
    <header className="mx-auto py-4 text-center">
      <div className="space-y-4">
        <Link className="text-xl font-semibold hover:text-text/80" href="/">
          Libur
        </Link>

        <p>Kalender Libur Indonesia</p>
      </div>
    </header>
  );
}
