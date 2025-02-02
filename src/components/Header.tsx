import Link from 'next/link';

export default function Header() {
  return (
    <header className="mx-auto py-4 text-center">
      <div className="space-y-4">
        <Link className="text-xl font-semibold hover:opacity-60" href="/">
          Libur
        </Link>
        <p>Kalender Libur Indonesia</p>
      </div>
    </header>
  );
}
