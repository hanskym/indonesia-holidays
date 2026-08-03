import { Icons } from '@/components/ui/Icons';

import { cn } from '@/lib/utils';

interface DataFetchErrorProps {
  title?: string;
  description?: string;
  className?: string;
}

export default function DataFetchError({
  title = 'Data Hari Libur Tidak Tersedia',
  description = 'Sumber data pihak ketiga sedang tidak dapat diakses. Silakan coba lagi beberapa saat lagi.',
  className,
}: DataFetchErrorProps) {
  return (
    <div
      className={cn(
        'relative flex min-h-[80dvh] flex-col items-center justify-center gap-6 overflow-hidden rounded-xl border border-border bg-card p-8 text-center',
        className,
      )}
    >
      <div className="relative flex aspect-square size-12 rounded-full border border-error/40 bg-error/10 text-error before:absolute before:-inset-2 before:rounded-full before:border before:border-border">
        <Icons.error className="m-auto size-6" />
      </div>

      <div className="max-w-md space-y-2">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-sm text-text-muted">{description}</p>
      </div>
    </div>
  );
}
