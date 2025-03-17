'use client';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[80dvh] flex-col items-center justify-center space-y-8">
      <div className="text-center">
        <h2 className="text-xl font-semibold">
          <span className="sr-only">Error</span>Terjadi Kesalahan!
        </h2>
        <p className="mt-4">
          Ada masalah saat memproses permintaan. Silakan coba beberapa saat lagi.
        </p>
      </div>

      <Button onClick={() => reset()}>Muat Ulang</Button>

      <div className="flex items-center justify-center gap-2">
        Error ID:
        <Badge className="p-1" variant="error">
          {error.digest}
        </Badge>
      </div>
    </div>
  );
}
