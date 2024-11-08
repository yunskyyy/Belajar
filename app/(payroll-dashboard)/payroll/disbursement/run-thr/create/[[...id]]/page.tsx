import type { Metadata } from 'next';

import { APP_TITLE } from '@/constants/config';
import RunThrForm from '@/views/Payroll/views/RunThr/RunThrForm';

export const metadata: Metadata = {
  title: `${APP_TITLE} - Disbursement - Run THR Form`,
};

const RunThrFormPage = ({ params: { id } }: { params: { id: string } }) => (
  <RunThrForm runThrId={id} />
);

export default RunThrFormPage;
