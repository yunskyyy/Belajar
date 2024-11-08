import React from 'react';
import type { Metadata } from 'next';

import Typography from '@/components/base/Typography';
import { APP_TITLE } from '@/constants/config';
import type { RoutePage } from '@/types/route';
import AcceptInvitation from '@/views/AcceptInvitation';

export const metadata: Metadata = {
  title: `${APP_TITLE} - Accept Invitation`,
};

const ActivationPage = ({ searchParams }: RoutePage) => {
  const { code } = searchParams;
  if (code) {
    return (
      <AcceptInvitation code={String(code)} />
    );
  }
  return (
    <div className="w-[400px]">
      <div className="flex flex-col gap-4">
        <Typography variant="headline" size="large" gutterBottom className="mb-1">
          Accept Invitation
        </Typography>
        <Typography variant="title" size="small" className="font-normal">
          Failed to activate account.
        </Typography>
        <Typography variant="title" size="small" className="font-normal">
          No activation code provided in the URL, please check the link from the activation email.
        </Typography>
      </div>
    </div>
  );
};

export default ActivationPage;
