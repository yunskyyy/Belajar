import { Suspense } from 'react';
import type { Metadata } from 'next';

import Loading from '@/app/(payroll-dashboard)/loading';
import { APP_TITLE } from '@/constants/config';
import RunThrForm from '@/views/Payroll/views/RunThr/RunThrForm';

export const metadata: Metadata = {
  title: `${APP_TITLE} - Disbursement - Run THR Form`,
};

const RunThrEdit = ({ params: { id }, searchParams }: {
  params: { id: string };
  searchParams: { [key: string]: string } }) => {
  const { step } = searchParams;
  return (
    <Suspense fallback={<Loading />}>
      <RunThrForm runThrId={id} initialStep={step ? Number(step) : undefined} />
    </Suspense>
  );
};

export default RunThrEdit;
