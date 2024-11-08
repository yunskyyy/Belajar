import { Suspense } from 'react';
import type { Metadata } from 'next';

import Loading from '@/app/(payroll-dashboard)/loading';
import { APP_TITLE } from '@/constants/config';
import PayslipPayrollDetail from '@/views/Payslip/PayslipPayrollDetail';

export const metadata: Metadata = {
  title: `${APP_TITLE} - Payslip - Payslip Payroll Detail`,
};

const PayslipPayrollDetailPage = ({ params: { id } }: { params: { id: string } }) => (
  <Suspense fallback={<Loading />}>
    <PayslipPayrollDetail id={id} />
  </Suspense>
);

export default PayslipPayrollDetailPage;
