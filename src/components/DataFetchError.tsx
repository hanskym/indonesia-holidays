import { cn } from '@/lib/utils';

interface DataFetchErrorProps {
  title?: string;
  description?: string;
  className?: string;
}

export default function DataFetchError({
  title = 'Data Hari Libur Tidak Tersedia',
  description = 'Informasi dari penyedia data pihak ketiga sedang tidak dapat dimuat. Silakan coba kembali beberapa saat lagi.',
  className,
}: DataFetchErrorProps) {
  return (
    <div className={cn('flex min-h-[80dvh] flex-col items-center justify-center', className)}>
      <div className="w-full max-w-2xl space-y-5">
        <div>
          <span className="font-mono text-xs tracking-[0.16em] text-error uppercase">ERROR</span>

          <h2 className="text-4xl leading-tight tracking-[-0.04em] md:text-5xl">{title}</h2>
        </div>

        <p className="text-sm leading-6 text-text-muted">{description}</p>
      </div>
    </div>
  );
}
