'use client';

import React from 'react';

import Button from '@/components/base/Button';
import TextSkeleton from '@/components/base/TextSkeleton';
import Typography from '@/components/base/Typography';

import useAcceptInvitation from './AcceptInvitation.hooks';
import type { AcceptInvitationProps } from './AcceptInvitation.types';

const AcceptInvitation = (props: AcceptInvitationProps) => {
  const {
    isLoading,
    isSubmitting,
    onSubmit,
  } = useAcceptInvitation(props);

  return (
    <div className="w-[400px]">
      {!isLoading ? (
        <div className="flex flex-col gap-4">
          <Typography variant="headline" size="large" gutterBottom className="mb-1">
            Accept Invitation
          </Typography>
          <Typography variant="title" size="small" className="font-normal">
            You have been invited to this platform by your organization.
            Please click button below to accept the invitation.
          </Typography>
          <Button
            className="w-full"
            color="primary"
            size="large"
            type="button"
            loading={isSubmitting}
            onClick={onSubmit}
          >
            Accept Invitation
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <TextSkeleton width="xl" className="h-8 mb-2" />
          <div className="flex flex-col gap-2">
            <TextSkeleton width="xl" />
            <TextSkeleton width="lg" />
          </div>
          <TextSkeleton width="xl" className="h-14 w-full" />
        </div>
      )}
    </div>
  );
};

export default AcceptInvitation;
