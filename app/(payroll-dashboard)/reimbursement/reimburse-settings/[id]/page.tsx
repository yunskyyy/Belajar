import { Suspense } from 'react';
import type { Metadata } from 'next';

import Loading from '@/app/(payroll-dashboard)/loading';
import { APP_TITLE } from '@/constants/config';
import ReimburseSettingsDetail
  from '@/views/Reimbursement/ReimburseSettings/ReimburseSettingsDetail';

export const metadata: Metadata = {
  title: `${APP_TITLE} - Detail Reimburse Settings`,
};

const ReimburseSettingDetailPage = ({ params: { id } }: { params: { id: string } }) => (
  <Suspense fallback={<Loading />}>
    <ReimburseSettingsDetail id={id} />
  </Suspense>
);

export default ReimburseSettingDetailPage;
