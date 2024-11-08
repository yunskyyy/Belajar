import { Suspense } from 'react';
import type { Metadata } from 'next';

import Loading from '@/app/(payroll-dashboard)/loading';
import { APP_TITLE } from '@/constants/config';
import PayslipViewer from '@/views/Payslip/PayslipViewer';

export const metadata: Metadata = {
  title: `${APP_TITLE} - Payslip - Payslip Payroll Detail - Payslip Viewer`,
};

const PayslipPayrollDetailPage = ({ params: { id, employeeId } }: { params: {
  id: string, employeeId: string
} }) => (
  <Suspense fallback={<Loading />}>
    <PayslipViewer id={id} employeeId={employeeId} />
  </Suspense>
);

export default PayslipPayrollDetailPage;
