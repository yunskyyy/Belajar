import type { z } from 'zod';

import type { SelectItem } from '@/types/inputs';
import type { AuditTrail, BaseQueryParams, PaginationData } from '@/types/responses';

import { budgetSettingSchema, editBudgetSettingSchema } from './AmountSetting.schemas';

export interface BudgetSettingData extends AuditTrail {
  [key: string]: unknown;
  budgetSettingId: string;
  type: number;
  typeName: string;
  projectId: string;
  projectName: string;
  projectCode: string;
  amount: number;
  amountIDR: string;
}

export type BudgetSettingList = PaginationData<BudgetSettingData>;

export interface BudgetSettingQueryParams extends BaseQueryParams {
  [key: string]: unknown;
  type: string;
  projectId: string;
}

export interface BudgetSettingTableProps {
  projectFilterOption: SelectItem[];
}

const schema = budgetSettingSchema.and(editBudgetSettingSchema);

export type BudgetSettingSchema = z.infer<typeof schema>;
