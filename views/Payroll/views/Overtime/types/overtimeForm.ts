import type { z } from 'zod';

import type overtimeFormSchemas from '../schemas/overtimeFormSchema';

export type OvertimeFormSchemas = z.infer<typeof overtimeFormSchemas>;
