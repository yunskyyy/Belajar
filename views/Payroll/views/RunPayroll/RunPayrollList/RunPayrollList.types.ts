import type { ReactNode } from 'react';

import type { SelectItem } from '@/types/inputs';
import type { BaseQueryParams, PaginationData } from '@/types/responses';

export interface RunPayrollData {
  [key: string]: unknown;
  payrollDisbursementId: string;
  periodDate: string;
  paymentScheduleDate: string;
  createdBy: string;
  createdByName: string;
  createdByFullName: string;
  createdAt: string;
  disableDownload: boolean;
  lastUpdatedBy: string;
  lastUpdatedByName: string;
  lastUpdatedByFullName: string;
  lastUpdatedAt: string;
  status: number;
  totalAmount: ReactNode;
  totalEmployees: number;
}

export interface RunPayrollQueryParams extends BaseQueryParams {
  [key: string]: unknown;
}

export type RunPayrollList = PaginationData<RunPayrollData>;

export interface RunPayrollTableProps {
  thrPeriodFilterOption: SelectItem[];
  paymentScheduleFilterOption: SelectItem[];
  statusFilterOption: SelectItem[];
}
