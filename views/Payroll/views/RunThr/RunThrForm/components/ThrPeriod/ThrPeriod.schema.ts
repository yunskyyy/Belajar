import { z } from 'zod';

import { FIELD_MESSAGE } from '@/constants/errorMessages';

const { REQUIRED } = FIELD_MESSAGE;

const thrPeriodSchema = z.object({
  holidayAllowanceDisbursementId: z.string().optional(),
  month: z.number({ required_error: REQUIRED('Month') }),
  year: z.number({ required_error: REQUIRED('Year') }),
  paymentScheduleDate: z.string({ required_error: 'Payment Schedule is required' })
    .min(1, { message: 'Payment Schedule is required' }),
  description: z.string(),
});

export default thrPeriodSchema;
