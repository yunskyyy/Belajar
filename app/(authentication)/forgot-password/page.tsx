import type { Metadata } from 'next';

import { APP_TITLE } from '@/constants/config';
import ForgotPassword from '@/views/ForgotPassword';

export const metadata: Metadata = {
  title: `${APP_TITLE} - ForgotPassword`,
};

const ForgotPasswordPage = () => (
  <ForgotPassword />
);

export default ForgotPasswordPage;
