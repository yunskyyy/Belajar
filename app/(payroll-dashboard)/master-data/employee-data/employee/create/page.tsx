import { Suspense } from 'react';
import type { Metadata } from 'next';

import Loading from '@/app/(payroll-dashboard)/loading';
import { APP_TITLE } from '@/constants/config';
import EmployeeForm from '@/views/MasterData/EmployeeData/Employee/EmployeeForm';

export const metadata: Metadata = {
  title: `${APP_TITLE} - Create Data Employee`,
};

const EmployeeCreateFormPage = () => (
  <Suspense fallback={<Loading />}>
    <EmployeeForm />
  </Suspense>
);

export default EmployeeCreateFormPage;
