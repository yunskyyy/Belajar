import type { z } from 'zod';

import type { Employee } from '../../../types/employee';

import type restoreSchema from './EmployeeResignModal.schema';

export interface EmployeeResignModalProps {
  open: boolean;
  onClose: () => void;
  employee?: Employee;
}

export type ResignFormSchema = z.infer<typeof restoreSchema>;
