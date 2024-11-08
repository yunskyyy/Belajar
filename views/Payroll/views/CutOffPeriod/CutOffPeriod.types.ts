import type { z } from 'zod';

import type cutOffPeriodFormSchema from './CutOffPeriod.schema';

export interface CutOffPeriodDataResponse {
  cutOffPeriodId: string,
  organizationId: string,
  name: string,
  startDt: string,
  endDt: string,
  paymentScheduleDt: string,
}

export interface CutOffPeriodData {
  cutOffPeriodId: string,
  organizationId: string,
  name: string,
  nameDisplay: string,
  startDt: string,
  startDtDisplay: string,
  endDt: string,
  endDtDisplay: string,
  paymentScheduleDt: string,
  paymentScheduleDtDisplay: string,
}

export type CutOffPeriodFormSchema = z.infer<typeof cutOffPeriodFormSchema>;
