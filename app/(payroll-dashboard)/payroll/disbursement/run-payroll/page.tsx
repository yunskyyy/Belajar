import type { Metadata } from 'next';

import { APP_TITLE } from '@/constants/config';
import RunPayrollList from '@/views/Payroll/views/RunPayroll/RunPayrollList';

export const metadata: Metadata = {
  title: `${APP_TITLE} - Run Payroll`,
};

const RunPayrollListPage = () => (
  <RunPayrollList />
);

export default RunPayrollListPage;
