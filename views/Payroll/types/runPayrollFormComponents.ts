import type { ReactNode } from 'react';

import type { PaginationData } from '@/types/responses';

export interface RunPayrollComponentProps {
  onNextStep?: (id:string) => void;
  onPrevStep?: () => void;
  id?: string;
  isEdit?: boolean;
}

export interface EmployeeData {
  [key: string]: unknown;
  employeeId: string,
  employeeName: string,
  employeeNumber: string,
  levelName: string,
  organizationName: string,
  position: number,
  positionName: string,
  divisionName: string,
}

export interface ComponentData {
  [key:string]: unknown
  key: string;
  value: string;
}

export interface ListItemEmployeeData {
  listData: EmployeeData[];
  total: number
}

export interface ItemEmployeeData {
  item: EmployeeData[];
  total: number
}

export interface DataEmployeeRunThr {
  [key: string]: unknown;
  id: string;
  employee: string;
  employeeId: string;
  joinDate: string;
  lengthOfService: number[]
  employeeNumber: string;
  positionName: string;
  organizationName: string;
  employeeName: string;
  total: number;
  totalAllowance: number;
  totalBenefit: number;
  totalSalary: number;
  totalPayment: ReactNode;
  paymentScheduleDate: string;
  employeeComponents: ComponentDetail[];
  employeeComponentSummaries: ComponentSummary[];
  createdAt: string;
  createdBy: string;
  createdByName: string;
  createdByFullName: string;
  lastUpdatedBy: string;
  lastUpdatedByName: string;
  lastUpdatedByFullName: string;
  lastUpdatedAt: string;
}

export interface ComponentDetail {
  componentId: string;
  componentName: string;
  componentTypeName: string;
  employeeComponentId: string;
  exactAmount: number;
  id: string;
  pendingAmount: string;
}

export interface ComponentSummary {
  componentTypeName: string ;
  totalAmount: number;
}

export type ListEmployeeRunThr = PaginationData<DataEmployeeRunThr>;
