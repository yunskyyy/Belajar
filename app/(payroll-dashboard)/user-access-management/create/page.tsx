import { Suspense } from 'react';
import type { Metadata } from 'next';

import { APP_TITLE } from '@/constants/config';
import UserManagementForm from '@/views/UserManagement/UserManagementForm';

import Loading from '../../loading';

export const metadata: Metadata = {
  title: `${APP_TITLE} - Create User`,
};

const UserManagementCreatePage = () => (
  <Suspense fallback={<Loading />}>
    <UserManagementForm />
  </Suspense>
);

export default UserManagementCreatePage;
