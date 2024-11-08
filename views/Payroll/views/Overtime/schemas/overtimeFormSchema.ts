import { z } from 'zod';

import { FIELD_MESSAGE } from '@/constants/errorMessages';

const { REQUIRED } = FIELD_MESSAGE;

const overtimeFormSchemas = z.object({
  overtimeExpenseId: z.string().optional(),
  date: z.string({ required_error: REQUIRED('Overtime Date') }).min(1, { message: REQUIRED('Overtime Date') }),
  employeeId: z.string().min(1, { message: REQUIRED('Employee ID') }),
  projectId: z.string().min(1, { message: REQUIRED('Project Code') }),
  teamId: z.string().min(1, { message: REQUIRED('Team Name') }),
  totalHours: z.number({ required_error: REQUIRED('Hours'), invalid_type_error: REQUIRED('Hours') })
    .min(0, { message: 'Total hours must be greater than 0' })
    .max(100, { message: 'Total hours must be less than or equal to 100' })
    .refine((val) => val >= 0.5, { message: 'Minimum input is 0.5' }),
  amount: z.number().min(1, { message: 'Please check overtime amount' }),
  employee: z.object({
    label: z.string(),
    value: z.string(),
  }, { required_error: REQUIRED('Employee ID') }),
  project: z.object({
    label: z.string(),
    value: z.string(),
  }, { required_error: REQUIRED('Project Code') }),
});

export default overtimeFormSchemas;
