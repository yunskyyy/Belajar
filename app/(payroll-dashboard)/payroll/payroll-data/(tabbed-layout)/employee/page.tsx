import type { Metadata } from 'next';

import { APP_TITLE } from '@/constants/config';
import EmployeeData from '@/views/Payroll/views/PayrollData/components/EmployeeData/EmployeeDataList';

export const metadata: Metadata = {
  title: `${APP_TITLE} - Payroll Data - Employee`,
};

const EmployeeDataPage = () => (
  <EmployeeData />
);

export default EmployeeDataPage;
