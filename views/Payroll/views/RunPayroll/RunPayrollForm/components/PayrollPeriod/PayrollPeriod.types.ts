import type { z } from 'zod';

import type payrollPeriodeSchema from './PayrollPeriod.schema';

export type PayrollPeriodeSchema = z.infer<typeof payrollPeriodeSchema>;

export interface CutOffPeriod {
  cutOffPeriodId: string;
  organizationId: string;
  name: string;
  startDt: string;
  endDt: string;
  paymentScheduleDt: string
  totalWorkDays: number;
}

export interface CutOffPeriodObj {
  data: CutOffPeriod
}

export interface PostPeriod {
  id:string;
}

export interface PayrollPeriod {
  payrollDisbursementId: string;
  cutOffPeriodStartDt: string;
  cutOffPeriodEndDt: string;
  paymentScheduleDate: string;
  month: number;
  year: number;
  periodDate: string;
  description: string;
}
