import type { BaseQueryParams, PaginationData } from '@/types/responses';

import type { EmployeeDatum } from '../types/employeeData';

export type EmployeeDataQueryParams = BaseQueryParams;

export type EmployeeDataResponse = PaginationData<EmployeeDatum>;

export interface PayrollSheetData {
  [key: string]: string;
  'Employee ID': string;
  'Employee Name': string;
  'Effective Date': string;
  'Type': string;
}

export interface PayrollBulkRequest {
  employeeCode: string;
  employeeName: string;
  componentId: string;
  componentTypeId: string;
  newAmount: number;
  amount: number;
  effectiveDate: string;
  type: string;
}
