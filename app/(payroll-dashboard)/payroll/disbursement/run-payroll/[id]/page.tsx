import { Suspense } from 'react';
import type { Metadata } from 'next';

import Loading from '@/app/(payroll-dashboard)/loading';
import { APP_TITLE } from '@/constants/config';
import RunPayrollDetail from '@/views/Payroll/views/RunPayroll/RunPayrollDetail';

export const metadata: Metadata = {
  title: `${APP_TITLE} - Detail Run Payroll `,
};

const RunPayrollDetailPage = ({ params: { id } }: { params: { id: string } }) => (
  <Suspense fallback={<Loading />}>
    <RunPayrollDetail id={id} />
  </Suspense>
);

export default RunPayrollDetailPage;
