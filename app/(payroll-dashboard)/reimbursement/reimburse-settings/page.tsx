import type { Metadata } from 'next';

import { APP_TITLE } from '@/constants/config';
import ReimburseSettings from '@/views/Reimbursement/ReimburseSettings/ReimburseSettingsList';

export const metadata: Metadata = {
  title: `${APP_TITLE} - Reimburse Settings`,
};

const ReimburseComponentPage = () => (
  <ReimburseSettings />
);

export default ReimburseComponentPage;
