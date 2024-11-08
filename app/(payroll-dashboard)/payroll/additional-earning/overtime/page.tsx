import type { Metadata } from 'next';

import { APP_TITLE } from '@/constants/config';
import Overtime from '@/views/Payroll/views/Overtime';

export const metadata: Metadata = {
  title: `${APP_TITLE} - Overtime`,
};

const OvertimePage = () => (
  <Overtime />
);

export default OvertimePage;
