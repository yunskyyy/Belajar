import { z } from 'zod';

import { FIELD_MESSAGE } from '@/constants/errorMessages';

const { REQUIRED } = FIELD_MESSAGE;
const dataEmployeeSchema = z.object({
  employeeCode: z.string(),
  employeeName: z.string(),
  payrollDisbursementItemId: z.string(),
  employeeId: z.string(),
  runPayrollId: z.string(),
  componentsAllowance: z.array(z.object({
    id: z.string(),
    name: z.string(),
    type: z.string(),
    amount: z.number().min(1, { message: REQUIRED('Amount') }),
  })),
  componentsSalary: z.array(z.object({
    id: z.string(),
    name: z.string(),
    type: z.string(),
    amount: z.number().min(1, { message: REQUIRED('Amount') }),
  })),
  componentsBenefit: z.array(z.object({
    id: z.string(),
    name: z.string(),
    type: z.string(),
    amount: z.number().min(1, { message: REQUIRED('Amount') }),
  })),
  additionalEarnings: z.array(z.object({
    additionalEarningId: z.string(),
    id: z.string(),
    projectName: z.string(),
    projectId: z.string(),
    projectCode: z.string(),
    type: z.number(),
    date: z.string(),
    amount: z.number().min(1, { message: REQUIRED('Amount') }),
    schedulePaymentDate: z.string().optional(),
    isDeleted: z.boolean().optional(),
  })),
  deductions: z.array(z.object({
    id: z.string(),
    name: z.string(),
    amount: z.number().min(1, { message: REQUIRED('Amount') }),
    isDeleted: z.boolean().optional(),
  })).superRefine((items, ctx) => {
    const uniqueValues = new Map<string, number>();
    items.forEach((item, idx) => {
      const firstAppearanceIndex = uniqueValues.get(item.name);
      if (firstAppearanceIndex !== undefined) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Deduction name must be unique',
          path: [idx, 'name'],
        });
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Deduction name must be unique',
          path: [firstAppearanceIndex, 'name'],
        });
        return;
      }
      uniqueValues.set(item.name, idx);
    });
  }),
  pendings: z.array(z.object({
    payrollDisbursementItemComponentId: z.string(),
    exactAmount: z.number(),
  })),
});

export default dataEmployeeSchema;
