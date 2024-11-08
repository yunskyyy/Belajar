import { Suspense } from 'react';
import type { Metadata } from 'next';

import Loading from '@/app/(payroll-dashboard)/loading';
import { APP_TITLE } from '@/constants/config';
import ReimburseSettingsForm from '@/views/Reimbursement/ReimburseSettings/ReimburseSettingsForm';

export const metadata: Metadata = {
  title: `${APP_TITLE} - Edit Data Reimburse Setting`,
};

const ReimburseSettingEditFormPage = ({ params: { id } }: { params: { id: string } }) => (
  <Suspense fallback={<Loading />}>
    <ReimburseSettingsForm id={id} />
  </Suspense>
);
export default ReimburseSettingEditFormPage;
