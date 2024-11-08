import type { Metadata } from 'next';

import { APP_TITLE } from '@/constants/config';
import Dashboard from '@/views/Payroll/views/Dashboard';

export const metadata: Metadata = {
  title: `${APP_TITLE} - Payroll Dashboard`,
};

const DashboardPage = () => (
  <Dashboard />
);

export default DashboardPage;
