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
    amount: z.number().min(1, { message: REQUIRED('Amount') }),
  })),
  componentsSalary: z.array(z.object({
    id: z.string(),
    name: z.string(),
    amount: z.number().min(1, { message: REQUIRED('Amount') }),
  })),
  componentsBenefit: z.array(z.object({
    id: z.string(),
    name: z.string(),
    amount: z.number().min(1, { message: REQUIRED('Amount') }),
  })),
  pendings: z.array(z.object({
    payrollDisbursementItemComponentId: z.string(),
    exactAmount: z.number(),
  })),
});

export default dataEmployeeSchema;
