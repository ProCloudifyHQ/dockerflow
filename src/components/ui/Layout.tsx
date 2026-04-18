import React from 'react';
import { cn } from '../../lib/utils';

export const Card = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div 
    className={cn('rounded-xl border bg-card text-card-foreground shadow-xs overflow-hidden', className)} 
    {...props}
  >
    {children}
  </div>
);

export const CardHeader = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <div className={cn('flex flex-col space-y-1.5 p-6 border-b border-border/50', className)}>
    {children}
  </div>
);

export const CardContent = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <div className={cn('p-6', className)}>
    {children}
  </div>
);

export const CardFooter = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <div className={cn('flex items-center p-6 bg-muted/50 border-t border-border/50', className)}>
    {children}
  </div>
);

export const Badge = ({ className, variant = 'neutral', children }: { className?: string; variant?: 'success' | 'warning' | 'error' | 'info' | 'neutral'; children: React.ReactNode; key?: React.Key }) => {
  const variants = {
    success: 'border-transparent bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-500/25',
    warning: 'border-transparent bg-amber-500/15 text-amber-700 dark:text-amber-400 hover:bg-amber-500/25',
    error: 'border-transparent bg-destructive/15 text-destructive hover:bg-destructive/25',
    info: 'border-transparent bg-blue-500/15 text-blue-700 dark:text-blue-400 hover:bg-blue-500/25',
    neutral: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
  };

  return (
    <span className={cn('inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-semibold overflow-hidden transition-colors', variants[variant], className)}>
      {children}
    </span>
  );
};

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm bg-background',
      className
    )}
    {...props}
  />
));
