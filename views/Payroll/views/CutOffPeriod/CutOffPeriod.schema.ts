import { z } from 'zod';

import { FIELD_MESSAGE } from '@/constants/errorMessages';

const { REQUIRED } = FIELD_MESSAGE;

const cutOffPeriodFormSchema = z.object({
  name: z.string().min(1, { message: REQUIRED('Setting Name') }),
  startDt: z.string().min(1, { message: REQUIRED('Start Date') }),
  endDt: z.string().min(1, { message: REQUIRED('End Date') }),
  paymentScheduleDt: z.string().min(1, { message: REQUIRED('Payment Schedule') }),
});

export default cutOffPeriodFormSchema;
