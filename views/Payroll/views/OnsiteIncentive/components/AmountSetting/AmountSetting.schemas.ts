import { z } from 'zod';

import { FIELD_MESSAGE } from '@/constants/errorMessages';

const { REQUIRED } = FIELD_MESSAGE;

const baseSchema = z.object({
  id: z.string().optional(),
  type: z.string().trim().min(1, { message: REQUIRED('Type') }),
  amount: z.string().trim().min(1, { message: REQUIRED('Budget') }),
});

export const budgetSettingSchema = z.object({
  projectIds: z.array(z.string()).optional(),
  projects: z.array(z.object({
    label: z.string(),
    value: z.string(),
  }), { required_error: REQUIRED('Project Code') })
    .min(1, { message: REQUIRED('Project Code') }),
}).merge(baseSchema);

export const editBudgetSettingSchema = z.object({
  projectId: z.string().optional(),
  project: z.object({
    label: z.string(),
    value: z.string(),
  }, { invalid_type_error: REQUIRED('Project Code') }),
}).merge(baseSchema);
