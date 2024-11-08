import type { ReactNode } from 'react';

export interface TableProps {
  children: ReactNode;
  className?: string;
  stickyHeader?: boolean;
}
