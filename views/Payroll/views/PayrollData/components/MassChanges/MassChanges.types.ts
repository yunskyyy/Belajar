import type { SelectItem } from '@/types/inputs';
import type { BaseQueryParams, PaginationData } from '@/types/responses';

export type EmployeeDataQueryParams = BaseQueryParams;

export interface EmployeeDataTableProps {
  componentTypeOption: SelectItem[];
  componentNameOption: SelectItem[];
}

export interface EmployeeDatum {
  [key: string]: unknown;
  employeeId: string;
  employeeIdNumber: string;
  position: number;
  employeeName: string;
  organizationId: string;
  organizationName: string;
  items: ComponentItem[];
}

export interface ComponentItem {
  employeeComponentId: string;
  componentTypeId: string;
  componentTypeName: string;
  componentId: string;
  componentName: string;
  amount: string;
  newAmount: string;
  effectiveDate: string;
}

export type EmployeeDataResponse = PaginationData<EmployeeDatum>;
