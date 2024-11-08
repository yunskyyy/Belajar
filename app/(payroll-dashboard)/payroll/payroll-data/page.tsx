import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { APP_TITLE } from '@/constants/config';

export const metadata: Metadata = {
  title: `${APP_TITLE} - Payroll Data`,
};

const PayrollDataPage = () => (
  redirect('payroll-data/employee')
);

export default PayrollDataPage;
