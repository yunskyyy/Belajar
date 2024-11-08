import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { APP_TITLE } from '@/constants/config';

export const metadata: Metadata = {
  title: `${APP_TITLE} - Onsite & Incentive`,
};

const PayrollDataPage = () => (
  redirect('onsite-incentive/list')
);

export default PayrollDataPage;
