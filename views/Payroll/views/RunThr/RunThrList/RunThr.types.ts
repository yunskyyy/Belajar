import type { ReactNode } from 'react';

import type { SelectItem } from '@/types/inputs';
import type { PaginationData } from '@/types/responses';

export interface RunThrData {
  [key: string]: unknown;
  holidayAllowanceDisbursementId: string;
  paymentScheduleDate: string;
  periodDate: string;
  description: string;
  status: number;
  totalAmount: ReactNode;
  totalEmployees: number;
  createdBy: string;
  createdByName: string;
  createdByFullName: string;
  createdAt: string;
  lastUpdatedBy: string;
  lastUpdatedByName: string;
  lastUpdatedByFullName: string;
  lastUpdatedAt: string;
}

export type RunThrList = PaginationData<RunThrData>;

export interface RunThrTableProps {
  thrPeriodFilterOption: SelectItem[];
  paymentScheduleFilterOption: SelectItem[];
  statusFilterOption: SelectItem[];
}
