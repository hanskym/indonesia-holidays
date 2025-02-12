import { Roboto_Flex, Roboto_Mono } from 'next/font/google';

/**
 * ! Bug: Turbopack error when using Roboto Flex font #74432
 * Issue: https://github.com/vercel/next.js/issues/74432
 */

export const uiFontSans = Roboto_Flex({
  variable: '--ui-font-sans',
  subsets: ['latin'],
});

export const uiFontMono = Roboto_Mono({
  variable: '--ui-font-mono',
  subsets: ['latin'],
});
