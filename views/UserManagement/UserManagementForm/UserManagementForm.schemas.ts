import { z } from 'zod';

import { FIELD_MESSAGE } from '@/constants/errorMessages';

const { INVALID_FORMAT, REQUIRED } = FIELD_MESSAGE;

const userFormSchema = z.object({
  email: z.string().min(1, { message: REQUIRED('Email') })
    .email({ message: INVALID_FORMAT('Email') }),
  fullName: z.string().min(1, { message: REQUIRED('Fullname') }),
});

export default userFormSchema;
