import type { ReactNode } from 'react';

import type { AuditTrail } from '@/types/responses';

export interface WidgetSummary {
  additionalEarnings: number,
  deduction: number,
  salary: number,
  benefit: number,
  allowance: number,
  total: number,
}

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

export interface PaginationData<T> {
  items: T[],
  hasNextPage: boolean,
  page: number
  pageSize: number
  totalData: number,
}

export type EmployeeDataList = PaginationData<ListEmployeeData>;
