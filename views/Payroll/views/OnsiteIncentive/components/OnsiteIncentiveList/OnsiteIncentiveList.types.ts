import type { z } from 'zod';

import type { SelectItem } from '@/types/inputs';
import type { AuditTrail, BaseQueryParams, PaginationData } from '@/types/responses';

import type overtimeIncentiveSchema from './OnsiteIncentiveList.schemas';

export interface OnsiteIncentiveData extends AuditTrail {
  [key: string]: unknown;
  onsiteExpenseId: string;
  employeeId: string;
  position: number;
  employeeIdNumber: string;
  employeeName: string;
  projectCode: string;
  projectId: string;
  projectName: string;
  type: number;
  typeName: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  amount: number;
  amountIDR: string;
  paymentScheduleDate: string;
}

export type OnsiteIncentives = PaginationData<OnsiteIncentiveData>;

export interface OnsiteIncentiveQueryParams extends BaseQueryParams {
  [key: string]: unknown;
  name: string;
  type: string;
  projectId: string;
  startDate: string;
  endDate: string;
  paymentScheduleDate: string;
}

export interface OnsiteIncentiveTableProps {
  projectFilterOption: SelectItem[];
}

export type OnsiteIncentiveSchema = z.infer<typeof overtimeIncentiveSchema>;

export interface IncentiveAmount extends AuditTrail {
  amount: number;
  projectId: string;
  projectName: string;
  type: number;
}
