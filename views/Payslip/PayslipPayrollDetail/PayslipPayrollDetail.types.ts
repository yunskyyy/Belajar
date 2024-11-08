import type { AuditTrail, PaginationData } from '@/types/responses';

export interface PayslipPayrollDetailProps {
  id: string;
}

export interface PayslipEmployeeData extends AuditTrail {
  [key: string]: unknown;
  employeeId: string;
  employeeNumber: string;
  fullname: string;
  positionName: string;
  organizationName: string;
  employeeName: string;
  position: number;
  userId: string;
}

export type PayslipEmployeeList = PaginationData<PayslipEmployeeData>;
