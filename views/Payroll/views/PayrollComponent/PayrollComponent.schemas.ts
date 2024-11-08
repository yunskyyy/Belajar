import { z } from 'zod';

import { FIELD_MESSAGE } from '@/constants/errorMessages';

const { REQUIRED } = FIELD_MESSAGE;
const payrollComponentFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().nonempty({ message: REQUIRED('Component Name') }),
  componentTypeId: z.string({ required_error: REQUIRED('Component Type') }),
  asTakeHomePay: z.boolean().optional(),
  asOverTime: z.boolean().optional(),
  asHolidayAllowance: z.boolean().optional(),
});

export default payrollComponentFormSchema;
