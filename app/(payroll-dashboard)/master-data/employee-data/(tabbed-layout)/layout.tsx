import type { Metadata } from 'next';

import type { ReactNode } from 'react';

import { APP_TITLE } from '@/constants/config';
import EmployeeData from '@/views/MasterData/EmployeeData/EmployeeData';

export const metadata: Metadata = {
  title: `${APP_TITLE} - Master Data Employee`,
};

const EmployeeDataLayout = ({ children }: { children: ReactNode }) => (
  <EmployeeData>
    {children}
  </EmployeeData>
);

export default EmployeeDataLayout;
