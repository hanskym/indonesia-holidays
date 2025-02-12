import * as React from 'react';

import { cn } from '@/lib/utils';

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex size-full flex-col rounded-2xl border-2 border-border bg-surface p-2 text-text transition-all duration-300 hover:border-2 hover:border-black',
        className,
      )}
      {...props}
    />
  ),
);
Card.displayName = 'Card';

const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => (
  <div className={cn('flex-grow space-y-8 rounded-t-lg bg-card-content p-6', className)} {...props}>
    {children}
  </div>
);
CardContent.displayName = 'CardContent';

const CardTitle: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, children }) => (
  <div className={cn('flex flex-nowrap gap-4 font-bold', className)}>{children}</div>
);
CardTitle.displayName = 'CardTitle';

const CardDescription: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
}) => <div className={cn('space-y-2', className)}>{children}</div>;
CardDescription.displayName = 'CardDescription';

const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, children }) => (
  <div className={cn('flex p-3 text-sm font-medium', className)}>{children}</div>
);
CardFooter.displayName = 'CardFooter';

export { Card, CardDescription, CardTitle, CardContent, CardFooter };
