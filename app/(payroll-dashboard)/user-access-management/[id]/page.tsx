import { Suspense } from 'react';
import type { Metadata } from 'next';

import { APP_TITLE } from '@/constants/config';
import UserManagementDetail from '@/views/UserManagement/UserManagementDetail';

import Loading from '../../loading';

export const metadata: Metadata = {
  title: `${APP_TITLE} - User Access Management Detail`,
};

const UserManagementDetailPage = ({ params: { id } }: { params: { id: string } }) => (
  <Suspense fallback={<Loading />}>
    <UserManagementDetail id={id} />
  </Suspense>
);

export default UserManagementDetailPage;
