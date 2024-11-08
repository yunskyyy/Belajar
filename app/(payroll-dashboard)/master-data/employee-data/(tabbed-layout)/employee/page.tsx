import type { Metadata } from 'next';

import { APP_TITLE } from '@/constants/config';
import EmployeeList from '@/views/MasterData/EmployeeData/Employee/EmployeeList';

export const metadata: Metadata = {
  title: `${APP_TITLE} - Master Data Employee`,
};

const EmployeePage = () => (
  <EmployeeList />
);

export default EmployeePage;
