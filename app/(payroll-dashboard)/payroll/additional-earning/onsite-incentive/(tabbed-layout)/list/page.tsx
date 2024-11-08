import type { Metadata } from 'next';

import { APP_TITLE } from '@/constants/config';
import OnsiteIncentiveList from '@/views/Payroll/views/OnsiteIncentive/components/OnsiteIncentiveList';

export const metadata: Metadata = {
  title: `${APP_TITLE} - Onsite & Incentive - List`,
};

const OnsiteIncentiveListPage = () => (
  <OnsiteIncentiveList />
);

export default OnsiteIncentiveListPage;
