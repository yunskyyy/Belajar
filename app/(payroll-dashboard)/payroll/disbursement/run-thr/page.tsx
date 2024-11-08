import type { Metadata } from 'next';

import { APP_TITLE } from '@/constants/config';
import RunThr from '@/views/Payroll/views/RunThr/RunThrList';

export const metadata: Metadata = {
  title: `${APP_TITLE} - Disbursement - Run THR`,
};

const RunThrPage = () => (
  <RunThr />
);

export default RunThrPage;
