import { Suspense } from 'react';
import type { Metadata } from 'next';

import Loading from '@/app/(payroll-dashboard)/loading';
import { APP_TITLE } from '@/constants/config';
import ReimburseSettingsForm from '@/views/Reimbursement/ReimburseSettings/ReimburseSettingsForm';

export const metadata: Metadata = {
  title: `${APP_TITLE} - Create Data Reimburse Setting`,
};

const ReimburseSettingCreateFormPage = () => (
  <Suspense fallback={<Loading />}>
    <ReimburseSettingsForm />
  </Suspense>
);
export default ReimburseSettingCreateFormPage;
