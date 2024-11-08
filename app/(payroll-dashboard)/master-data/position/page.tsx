import { Suspense } from 'react';
import type { Metadata } from 'next';

import Loading from '@/app/(payroll-dashboard)/loading';
import { APP_TITLE } from '@/constants/config';
import PositionList from '@/views/MasterData/Position/PositionList';

export const metadata: Metadata = {
  title: `${APP_TITLE} - Master Data Position`,
};

const PositionListPage = () => (
  <Suspense fallback={<Loading />}>
    <PositionList />
  </Suspense>
);

export default PositionListPage;
