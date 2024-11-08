import type { z } from 'zod';

import type { SelectItem } from '@/types/inputs';

import type employeeDataFormSchema from './EmployeeDataForm.schemas';

export type EmployeeDataFormSchema = z.infer<typeof employeeDataFormSchema>;

export interface EmployeeDataFormTableProps {
  componentTypeFilterOption: SelectItem[],
  componentNameFilterOption: SelectItem[],
}

export interface EmployeeDataFormFilter {
  [key: string]: string;
  type: string;
  componentTypeId: string;
  componentId: string;
}
