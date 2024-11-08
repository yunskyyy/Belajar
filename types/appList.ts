import type { ReactNode } from 'react';

export interface App {
  icon: ReactNode;
  name: string;
  url: string;
}

export type AppList = App[];
