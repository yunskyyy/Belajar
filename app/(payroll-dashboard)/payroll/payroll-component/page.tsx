import type { Metadata } from 'next';

import { APP_TITLE } from '@/constants/config';
import PayrollComponent from '@/views/Payroll/views/PayrollComponent';

export const metadata: Metadata = {
  title: `${APP_TITLE} - Payroll Component`,
};

const PayrollComponentPage = () => (
  <PayrollComponent />
);

export default PayrollComponentPage;
