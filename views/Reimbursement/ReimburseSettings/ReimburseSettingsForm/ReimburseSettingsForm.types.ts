import type { z } from 'zod';

import type {
  approvalLineOptionalSchema,
  approvalLineSchema, projectSchema,
} from './ReimburseSettingsForm.schema';
import type reimburseSettingsFormSchema
  from './ReimburseSettingsForm.schema';

export type ReimburseSettingsFormParams = {
  id?: string
};

export type ReimburseSettingsFormSchema = z.infer<typeof reimburseSettingsFormSchema>;
export type ApprovalLineSchema = z.infer<typeof approvalLineSchema>;
export type ApprovalLineOptionalSchema = z.infer<typeof approvalLineOptionalSchema>;
export type ProjectSchema = z.infer<typeof projectSchema>;
