import { ReactNode } from 'react';

import { cn } from '@/lib/utils/utils';

type Props = {
  children: ReactNode;
  className?: string;
};

export function MainLayout({ children, className }: Props) {
  return (
    <div className={cn('container mx-auto px-4 py-4 min-h-screen', className)}>
      {children}
    </div>
  );
}
