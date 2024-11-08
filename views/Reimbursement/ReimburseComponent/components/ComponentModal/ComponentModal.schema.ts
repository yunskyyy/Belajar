import { z } from 'zod';

import { FIELD_MESSAGE } from '@/constants/errorMessages';

const { REQUIRED } = FIELD_MESSAGE;

const ReimbursementType = {
  description: z.string().optional(),
  reimbursementTypeId: z.string().optional(),
  name: z.string().nonempty({ message: REQUIRED('Type') }),
};

const componentSchema = z.object({
  name: z.string().nonempty({ message: REQUIRED('Category') }),
  types: z.array(z.object(ReimbursementType)),
});

export default componentSchema;
