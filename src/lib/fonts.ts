import { Roboto_Mono, Roboto_Serif } from 'next/font/google';

export const uiFontSerif = Roboto_Serif({
  variable: '--ui-font-serif',
  subsets: ['latin'],
});

export const uiFontMono = Roboto_Mono({
  variable: '--ui-font-mono',
  subsets: ['latin'],
});
