import type { z } from 'zod';

import type userFormSchema from './UserManagementForm.schemas';

export type UserFormSchema = z.infer<typeof userFormSchema>;
