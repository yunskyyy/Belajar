import type { z } from 'zod';

import type employeeFormSchema from './EmployeeForm.schemas';

export type EmployeeFormSchema = z.infer<typeof employeeFormSchema>;

export interface EmployeeFormProps {
  id?: string;
}

export interface ApprovalLine {
  id: number;
  rule: number;
  approvals: Array<{ label: string; value: string }>;
  employeeApprovals: string[];
}
