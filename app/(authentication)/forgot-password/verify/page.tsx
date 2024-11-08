import React from 'react';
import type { Metadata } from 'next';

import Typography from '@/components/base/Typography';
import { APP_TITLE } from '@/constants/config';
import type { RoutePage } from '@/types/route';
import ForgotPasswordVerification from '@/views/ForgotPassword/ForgotPasswordVerification';

export const metadata: Metadata = {
  title: `${APP_TITLE} - Verify Forgot Password Request`,
};

const ForgotPasswordVerificationPage = ({ searchParams }: RoutePage) => {
  const { identifierId } = searchParams;
  if (identifierId) {
    return (
      <ForgotPasswordVerification identifierId={String(identifierId)} />
    );
  }
  return (
    <div className="w-[400px]">
      <div className="flex flex-col gap-4">
        <Typography variant="headline" size="large" gutterBottom className="mb-1">
          Forgot Password Verification
        </Typography>
        <Typography variant="title" size="small" className="font-normal">
          No Identifier ID provided in the URL,
          please check the link that was sent by us to your email.
        </Typography>
      </div>
    </div>
  );
};

export default ForgotPasswordVerificationPage;
