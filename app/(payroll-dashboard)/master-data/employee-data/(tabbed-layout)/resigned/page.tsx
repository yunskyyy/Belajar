import type { Metadata } from 'next';

import { APP_TITLE } from '@/constants/config';
import EmployeeResignedList from '@/views/MasterData/EmployeeData/ResignedEmployee';

export const metadata: Metadata = {
  title: `${APP_TITLE} - Master Data Employee`,
};

const EmployeeResignedPage = () => (
  <EmployeeResignedList />
);

export default EmployeeResignedPage;
