import { Suspense } from 'react';
import type { Metadata } from 'next';

import Loading from '@/app/(payroll-dashboard)/loading';
import { APP_TITLE } from '@/constants/config';
import EmployeeDataForm from '@/views/Payroll/views/PayrollData/components/EmployeeData/EmployeeDataForm';

export const metadata: Metadata = {
  title: `${APP_TITLE} - Edit Payroll Data - Employee`,
};

const EmployeeDataEditPage = ({ params: { id } }: { params: { id: string } }) => (
  <Suspense fallback={<Loading />}>
    <EmployeeDataForm id={id} />
  </Suspense>
);

export default EmployeeDataEditPage;
