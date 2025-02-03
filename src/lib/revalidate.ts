'use server';

import { revalidateTag as revalidate } from 'next/cache';

export async function revalidateTag(tag: string): Promise<boolean> {
  try {
    revalidate(tag);
    return true;
  } catch (e) {
    console.error('Revalidation error:', e);
    return false;
  }
}
