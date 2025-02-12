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
    <div className="container mx-auto flex min-h-[75dvh] flex-col items-center justify-center px-4">
      <div className="space-y-8 text-center">
        <div>
          <h2 className="text-xl font-semibold">
            <span className="sr-only">Error</span>Terjadi Kesalahan!
          </h2>
          <p className="mt-4">
            Ada masalah saat memproses permintaan. Silakan coba beberapa saat lagi.
          </p>
        </div>

        <Button onClick={() => reset()}>Muat Ulang</Button>

        <div className="mt-6 flex items-center justify-center gap-2">
          Error ID:
          <Badge className="p-1" variant="error">
            {error.digest}
          </Badge>
        </div>
      </div>
    </div>
  );
}
