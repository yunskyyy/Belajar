import { z } from 'zod';

import { FIELD_MESSAGE } from '@/constants/errorMessages';

const { INVALID_FORMAT, REQUIRED } = FIELD_MESSAGE;

export const schema = z.object({
  emailAddress: z.string().min(1, { message: REQUIRED('Email') })
    .email({ message: INVALID_FORMAT('Email') }),
});

export type ForgotPasswordSchema = z.infer<typeof schema>;
