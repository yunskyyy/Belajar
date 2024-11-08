import type { Metadata } from 'next';

import { APP_TITLE } from '@/constants/config';
import AmountSetting from '@/views/Payroll/views/OnsiteIncentive/components/AmountSetting';

export const metadata: Metadata = {
  title: `${APP_TITLE} - Onsite & Incentive - Amount Setting`,
};

const AmountSettingPage = () => (
  <AmountSetting />
);

export default AmountSettingPage;
