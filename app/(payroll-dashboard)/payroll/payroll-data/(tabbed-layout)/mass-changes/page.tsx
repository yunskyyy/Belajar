import type { Metadata } from 'next';

import { APP_TITLE } from '@/constants/config';
import MassChanges from '@/views/Payroll/views/PayrollData/components/MassChanges';

export const metadata: Metadata = {
  title: `${APP_TITLE} - Payroll Data - Employee`,
};

const PayrollDataPage = () => (
  <MassChanges />
);

export default PayrollDataPage;
