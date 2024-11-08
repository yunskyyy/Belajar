import type { z } from 'zod';

import type loginSchema from './Login.schemas';

export interface LoginResponse {
  accessToken: string,
  expiry: number,
  refreshToken: string,
  userId: string,
}

export type LoginSchema = z.infer<typeof loginSchema>;
