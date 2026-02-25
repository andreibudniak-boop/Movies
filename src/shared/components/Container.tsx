import type { PropsWithChildren } from 'react';
import { cn } from '../lib/utils';

interface ContainerProps extends PropsWithChildren {
  className?: string;
}

export function Container({ children, className }: ContainerProps) {
  return <div className={cn('max-w-[1400px] m-auto', className)}>{children}</div>;
}
