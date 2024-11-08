import type { AuditTrail, PaginationData } from '@/types/responses';

export interface PayslipData extends AuditTrail {
  [key: string]: unknown;
  payrollDisbursementId: string;
  periodDate: string;
  paymentScheduleDate: string;
  description: string;
  totalEmployees: number;
}

export type PayslipList = PaginationData<PayslipData>;
