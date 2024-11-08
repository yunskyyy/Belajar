import type { z } from 'zod';

import type thrPeriodSchema from './ThrPeriod.schema';

export interface ThrPeriod {
  holidayAllowanceDisbursementId: string;
  paymentScheduleDate: string;
  month: number;
  year: number;
  periodDate: string;
  description: string;
}

export interface PostThrPeriod {
  id: string;
}

export type ThrPeriodSchema = z.infer<typeof thrPeriodSchema>;
