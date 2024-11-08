import { z } from 'zod';

import { FIELD_MESSAGE } from '@/constants/errorMessages';

const { REQUIRED } = FIELD_MESSAGE;

const payrollPeriodeSchema = z.object({
  month: z.number({ required_error: REQUIRED('Month') }),
  year: z.number({ required_error: REQUIRED('Year') }),
  paymentScheduleDate: z.string().min(1, { message: REQUIRED('Payment Schedule') }),
  description: z.string(),
  payrollDisbursementId: z.string().optional(),
  cutOffPeriodStartDt: z.string().optional(),
  cutOffPeriodEndDt: z.string().optional(),

});

export default payrollPeriodeSchema;
