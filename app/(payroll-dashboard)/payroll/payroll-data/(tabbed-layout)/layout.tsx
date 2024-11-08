import type { Metadata } from 'next';

import type { ReactNode } from 'react';

import { APP_TITLE } from '@/constants/config';
import PayrollData from '@/views/Payroll/views/PayrollData';

export const metadata: Metadata = {
  title: `${APP_TITLE} - Payroll Data`,
};

const PayrollDataLayout = ({ children }: { children: ReactNode }) => (
  <PayrollData>
    {children}
  </PayrollData>
);

export default PayrollDataLayout;
