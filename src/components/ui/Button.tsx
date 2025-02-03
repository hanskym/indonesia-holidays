import * as React from 'react';

import { cn } from '@/lib/utils';

const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        'cursor-pointer rounded-2xl border-none bg-[#141414] px-4 py-2 text-center text-sm font-normal text-white sm:w-auto md:text-base',
        className,
      )}
      {...props}
    />
  ),
);
Button.displayName = 'Button';

export { Button };
