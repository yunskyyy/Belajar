import type { Metadata } from 'next';

import { APP_TITLE } from '@/constants/config';
import CutOffPeriod from '@/views/Payroll/views/CutOffPeriod';

export const metadata: Metadata = {
  title: `${APP_TITLE} - Cut Off Period`,
};

const CutOffPeriodPage = () => (
  <CutOffPeriod />
);

export default CutOffPeriodPage;
