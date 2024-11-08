import { Suspense } from 'react';
import type { Metadata } from 'next';

import Loading from '@/app/(payroll-dashboard)/loading';
import { APP_TITLE } from '@/constants/config';
import EmployeeDetail from '@/views/MasterData/EmployeeData/Employee/EmployeeDetail';

export const metadata: Metadata = {
  title: `${APP_TITLE} - Detail Master Data Employee`,
};

const EmployeeDetailPage = ({ params: { id } }: { params: { id: string } }) => (
  <Suspense fallback={<Loading />}>
    <EmployeeDetail id={id} />
  </Suspense>
);

export default EmployeeDetailPage;
