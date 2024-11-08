import type { AuditTrail, BaseQueryParams, PaginationData } from '@/types/responses';

export interface PayrollComponentData extends AuditTrail {
  [key: string]: unknown;
  componentId: string;
  typeId: string;
  typeName: string;
  name: string;
  asTakeHomePay: boolean;
  asOvertime: boolean;
  asHolidayAllowance: boolean;
}

export type PayrollComponentList = PaginationData<PayrollComponentData>;

export interface PayrollComponentQueryParams extends BaseQueryParams {
  [key: string]: unknown;
  s: string;
  typeId: string;
}
