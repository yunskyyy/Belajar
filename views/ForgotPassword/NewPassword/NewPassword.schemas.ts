import { z } from 'zod';

export const schema = z.object({
  id: z.string().optional(),
  password: z.string().min(8, { message: 'Minimal password length is 8 characters' }),
  confirmationPassword: z.string().min(8, { message: 'Minimal password length is 8 characters' }),
}).superRefine(({ password, confirmationPassword }, ctx) => {
  if (confirmationPassword !== password) {
    ctx.addIssue({
      code: 'custom',
      message: 'The passwords did not match',
      path: ['confirmationPassword'],
    });
  }
});

export type NewPasswordSchema = z.infer<typeof schema>;
