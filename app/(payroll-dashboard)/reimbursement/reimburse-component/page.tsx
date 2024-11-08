import type { Metadata } from 'next';

import { APP_TITLE } from '@/constants/config';
import ReimburseComponent from '@/views/Reimbursement/ReimburseComponent';

export const metadata: Metadata = {
  title: `${APP_TITLE} - Reimburse Component`,
};

const ReimburseComponentPage = () => (
  <ReimburseComponent />
);

export default ReimburseComponentPage;
