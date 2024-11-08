import type { ReactNode } from 'react';

import type { AuditTrail, PaginationData } from '@/types/responses';

export interface ListEmployeeData extends AuditTrail {
  [key: string]: unknown;
  employee: string,
  employeeId: string,
  employeeName: string,
  employeeNumber: string,
  levelName: string,
  organizationName: string,
  position: number,
  positionName: string,
  divisionName: string,
  componentsAllowance: number;
  componentsBenefit: number;
  componentsSalary: number;
  additionalEarnings: number;
  earning: string;
  deduction: number;
  componentDeduction: string;
  allowance: string;
  benefit: string;
  salary: string;
  totalSalary: ReactNode;
  total: number;
}

export type EmployeeDataList = PaginationData<ListEmployeeData>;

export interface WidgetSummary {
  additionalEarnings: number,
  deduction: number,
  salary: number,
  benefit: number,
  allowance: number,
  total: number,
}
