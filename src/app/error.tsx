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
      <div className="w-full max-w-2xl space-y-5">
        <div>
          <span className="font-mono text-xs tracking-[0.16em] text-error uppercase">Error</span>

          <h1 className="text-4xl leading-tight tracking-[-0.04em] md:text-5xl">
            Terjadi Kesalahan!
          </h1>
        </div>

        <p className="text-sm leading-6 text-text-muted">
          Ada masalah saat memproses permintaan. Silakan coba beberapa saat lagi.
        </p>

        <Button onClick={() => reset()}>Muat Ulang</Button>

        {error.digest && (
          <div className="flex items-center gap-2">
            Error ID:
            <Badge className="p-1 font-mono" variant="error">
              {error.digest}
            </Badge>
          </div>
        )}
      </div>
    </div>
  );
}
