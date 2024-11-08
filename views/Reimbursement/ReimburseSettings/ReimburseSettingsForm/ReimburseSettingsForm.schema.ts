import { z } from 'zod';

import { FIELD_MESSAGE } from '@/constants/errorMessages';

const { REQUIRED } = FIELD_MESSAGE;

export const approvalLineSchema = z.object({
  id: z.number().optional(),
  approvals: z.object({
    label: z.string().min(1),
    value: z.string().min(1),
  }, { required_error: REQUIRED('Approver') }).refine(
    (approval) => approval.label !== '' && approval.value !== '',
    { message: REQUIRED('Approver') },
  ),
  employeeId: z.string().refine((val) => val !== '', {
    message: REQUIRED('Approver'),
  }),
  line: z.number(),
});

export const approvalLineOptionalSchema = z.object({
  id: z.number().optional(),
  approvals: z.object({
    label: z.string(),
    value: z.string(),
  }).nullable(),
  line: z.number().optional(),
  employeeId: z.string().nullable(),
});

export const projectSchema = z.object({
  reimbursementSettingProjectId: z.string().optional(),
  projectId: z.string().optional(),
  project: z.object({
    label: z.string().optional(),
    value: z.string().optional(),
  }).nullable(),
  budgetLimit: z.number().optional().nullable(),
  countToPerson: z.boolean().optional(),
})
  .superRefine((arg, ctx) => {
    if (arg.projectId && !(Number(arg.budgetLimit) > 0)) {
      ctx.addIssue({
        code: 'custom',
        message: 'Minimum amount is Rp.1 if you want to input',
        path: ['budgetLimit'],
      });
    }
  });

const reimburseSettingSchema = z.object({
  reimbursementSettingId: z.string().optional(),
  reimbursementCategoryId: z.string().nonempty({ message: REQUIRED('Category') }),
  reimbursementTypeId: z.string().nonempty({ message: REQUIRED('Type') }),
  effectiveDate: z.string().nonempty({ message: REQUIRED('Effective Date') }),
  approvalLines: z.array(approvalLineSchema),
  approvalLinesOptional: z.array(approvalLineOptionalSchema),
  projects: z.array(projectSchema.nullable()),
});

export default reimburseSettingSchema;
