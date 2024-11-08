import { z } from 'zod';

import { FIELD_MESSAGE } from '@/constants/errorMessages';

const { REQUIRED } = FIELD_MESSAGE;
const employeeDataFormSchema = z.object({
  employeeComponentId: z.string().optional(),
  componentId: z.string({ required_error: REQUIRED('Component Name') }),
  componentNameObject: z.object({
    label: z.string().min(1),
    value: z.string().min(1),
  }, { required_error: REQUIRED('Component Name') })
    .refine(
      (component) => component.label !== '' && component.value !== '',
      { message: REQUIRED('Component Name') },
    ),
  componentName: z.string().optional(),
  componentTypeId: z.string({ required_error: REQUIRED('Component Type') }),
  amount: z.string().optional(),
  newAmount: z.string().min(1, { message: REQUIRED('New Amount') }),
  effectiveDate: z.string().min(1, { message: REQUIRED('Effective Date') }),
  type: z.string().min(1, { message: REQUIRED('Type') }),
}).superRefine((arg, ctx) => {
  if (!(Number(arg.newAmount) > 0) && arg.type === '0') {
    ctx.addIssue({
      code: 'custom',
      message: 'New Amount must be greater than 0',
      path: ['newAmount'],
    });
  }
});

export default employeeDataFormSchema;
