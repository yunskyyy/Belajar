import { z } from 'zod';

import { FIELD_MESSAGE } from '@/constants/errorMessages';

const { REQUIRED } = FIELD_MESSAGE;

const resignSchema = z.object({
  resignDate: z
    .string()
    .nonempty({ message: REQUIRED('Resign Date') }),
});

export default resignSchema;
