import { Suspense } from 'react';
import type { Metadata } from 'next';

import Loading from '@/app/(payroll-dashboard)/loading';
import { APP_TITLE } from '@/constants/config';
import LevelList from '@/views/MasterData/Level/LevelList';

export const metadata: Metadata = {
  title: `${APP_TITLE} - Master Data Level`,
};

const LevelListPage = () => (
  <Suspense fallback={<Loading />}>
    <LevelList />
  </Suspense>
);

export default LevelListPage;
