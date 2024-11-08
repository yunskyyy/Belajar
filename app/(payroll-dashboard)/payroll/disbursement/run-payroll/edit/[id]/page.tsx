import { Suspense } from 'react';
import type { Metadata } from 'next';

import Loading from '@/app/(payroll-dashboard)/loading';
import { APP_TITLE } from '@/constants/config';
import RunPayrollForm from '@/views/Payroll/views/RunPayroll/RunPayrollForm';

export const metadata: Metadata = {
  title: `${APP_TITLE} - Edit Run Payroll`,
};

const RunPayrollEdit = ({ params: { id } }: { params: { id: string } }) => (
  <Suspense fallback={<Loading />}>
    <RunPayrollForm payrollId={id} />
  </Suspense>
);

export default RunPayrollEdit;
