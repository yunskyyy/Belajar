import { Suspense } from 'react';
import type { Metadata } from 'next';

import type { ReactNode } from 'react';

import Loading from '@/app/(payroll-dashboard)/loading';
import { APP_TITLE } from '@/constants/config';
import OnsiteIncentive from '@/views/Payroll/views/OnsiteIncentive';

export const metadata: Metadata = {
  title: `${APP_TITLE} - Onsite & Incentive `,
};

const OnsiteIncentiveLayout = ({ children }: { children: ReactNode }) => (
  <Suspense fallback={<Loading />}>
    <OnsiteIncentive>
      {children}
    </OnsiteIncentive>
  </Suspense>
);

export default OnsiteIncentiveLayout;
