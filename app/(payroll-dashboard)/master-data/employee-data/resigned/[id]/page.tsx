import { Suspense } from 'react';
import type { Metadata } from 'next';

import Loading from '@/app/(payroll-dashboard)/loading';
import { APP_TITLE } from '@/constants/config';
import EmployeeResignedDetail from '@/views/MasterData/EmployeeData/ResignedEmployee/EmployeeResignedDetail';

export const metadata: Metadata = {
  title: `${APP_TITLE} - Detail Master Data Employee`,
};

const EmployeeResignedDetailPage = ({ params: { id } }: { params: { id: string } }) => (
  <Suspense fallback={<Loading />}>
    <EmployeeResignedDetail id={id} />
  </Suspense>
);

export default EmployeeResignedDetailPage;
