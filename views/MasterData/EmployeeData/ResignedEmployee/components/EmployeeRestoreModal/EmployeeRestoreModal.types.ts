import type { z } from 'zod';

import type restoreSchema from './EmployeeRestoreModal.schema';

export interface EmployeeRestoreModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  employeeId: string;
  employeeName: string;
}

export type RestoreFormSchema = z.infer<typeof restoreSchema>;
