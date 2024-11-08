import { z } from 'zod';

import { FIELD_MESSAGE } from '@/constants/errorMessages';

const { REQUIRED } = FIELD_MESSAGE;

const restoreSchema = z.object({
  date: z
    .string()
    .nonempty({ message: REQUIRED('Restore Date') })
    .refine((value) => {
      const today = new Date();
      const inputDate = new Date(value);
      inputDate.setHours(0, 0, 0, 0);
      today.setHours(0, 0, 0, 0);
      return inputDate >= today;
    }, { message: 'Restore Date must be today or in the future' }),
});

export default restoreSchema;
