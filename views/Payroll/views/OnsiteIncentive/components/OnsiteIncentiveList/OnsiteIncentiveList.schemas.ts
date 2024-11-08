import { z } from 'zod';

import { FIELD_MESSAGE } from '@/constants/errorMessages';

const { REQUIRED } = FIELD_MESSAGE;

const onsiteIncentiveSchema = z.object({
  id: z.string().optional(),
  type: z.string().trim().min(1, { message: REQUIRED('Type') }),
  employeeId: z.string().min(1, { message: REQUIRED('Employee ID') }),
  projectId: z.string().min(1, { message: REQUIRED('Project Code') }),
  startDate: z.string().min(1, { message: REQUIRED('Start Date') }),
  endDate: z.string().min(1, { message: REQUIRED('End Date') }),
  employee: z.object({
    label: z.string(),
    value: z.string(),
  }, { required_error: REQUIRED('Employee ID'), invalid_type_error: REQUIRED('Employee ID') }),
  project: z.object({
    label: z.string(),
    value: z.string(),
  }, { required_error: REQUIRED('Project Code'), invalid_type_error: REQUIRED('Project Code') }),
});

export default onsiteIncentiveSchema;
