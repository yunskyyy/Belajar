import type { z } from 'zod';

import type { SelectItem } from '@/types/inputs';

import type payrollComponentSchemas from './PayrollComponent.schemas';

export type PayrollComponentFormSchema = z.infer<typeof payrollComponentSchemas>;

export interface PayrollComponentTableProps {
  componentTypeFilterOption: SelectItem[];
}
