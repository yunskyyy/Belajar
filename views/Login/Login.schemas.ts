import { z } from 'zod';

import { FIELD_MESSAGE } from '@/constants/errorMessages';

const { INVALID_FORMAT, REQUIRED } = FIELD_MESSAGE;

const loginSchema = z.object({
  username: z.string().min(1, { message: REQUIRED('Email') })
    .email({ message: INVALID_FORMAT('Email') }),
  password: z.string().min(1, { message: REQUIRED('Password') }),
});

export default loginSchema;
