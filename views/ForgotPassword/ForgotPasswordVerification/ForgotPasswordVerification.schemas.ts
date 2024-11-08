import { z } from 'zod';

export const schema = z.object({
  id: z.string().min(1),
  code: z.string().min(5, { message: 'Verification code is not valid' }),
});

export type ForgotPasswordVerificationSchema = z.infer<typeof schema>;
