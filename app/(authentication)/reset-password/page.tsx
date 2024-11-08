import React from 'react';
import type { Metadata } from 'next';

import Typography from '@/components/base/Typography';
import { APP_TITLE } from '@/constants/config';
import type { RoutePage } from '@/types/route';
import NewPassword from '@/views/ForgotPassword/NewPassword';

export const metadata: Metadata = {
  title: `${APP_TITLE} - Create New Password`,
};

const ResetPasswordPage = ({ searchParams }: RoutePage) => {
  const { code = '' } = searchParams;
  if (code) {
    return (
      <NewPassword code={String(code).replaceAll(' ', '+')} type="admin-reset-password" />
    );
  }
  return (
    <div className="w-[400px]">
      <div className="flex flex-col gap-4">
        <Typography variant="headline" size="large" gutterBottom className="mb-1">
          New Password
        </Typography>
        <Typography variant="title" size="small" className="font-normal">
          No Identifier ID provided in the URL,
          please check the link that was sent by us to your email.
        </Typography>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
