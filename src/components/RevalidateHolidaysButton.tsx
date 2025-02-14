'use client';

import * as React from 'react';

import { Button } from '@/components/ui/Button';
import { Icons } from '@/components/ui/Icons';

import { revalidateTag } from '@/lib/revalidate';

type RevalidationStatus = 'idle' | 'success' | 'error';

export function RevalidateHolidaysButton() {
  const [isRevalidating, setIsRevalidating] = React.useState<boolean>(false);
  const [revalidationStatus, setRevalidationStatus] = React.useState<RevalidationStatus>('idle');

  const handleRevalidate = async (): Promise<void> => {
    setIsRevalidating(true);
    setRevalidationStatus('idle');

    try {
      const holidaysResult = await revalidateTag('holidays-data');

      if (holidaysResult) {
        setRevalidationStatus('success');
      } else {
        setRevalidationStatus('error');
      }
    } catch (error) {
      setRevalidationStatus('error');
      console.error('Revalidation failed:', error);
    } finally {
      setIsRevalidating(false);
    }
  };

  return (
    <Button
      className="size-fit rounded-full p-1"
      onClick={handleRevalidate}
      disabled={isRevalidating}
      variant={
        revalidationStatus === 'success'
          ? 'success'
          : revalidationStatus === 'error'
            ? 'error'
            : 'default'
      }
      aria-label="Muat Ulang Data"
    >
      {revalidationStatus === 'success' ? (
        <Icons.success />
      ) : revalidationStatus === 'error' ? (
        <Icons.error />
      ) : (
        <Icons.reload className={isRevalidating ? 'animate-loading' : undefined} />
      )}
    </Button>
  );
}
