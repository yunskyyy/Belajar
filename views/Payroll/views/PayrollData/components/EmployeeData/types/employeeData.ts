import type { AuditTrail } from '@/types/responses';

export interface EmployeeDatum extends AuditTrail {
  [key: string]: unknown;
  employeeId: string;
  employeeIdNumber: string;
  position: number;
  employeeName: string;
  organizationId: string;
  organizationName: string;
  items: ComponentItem[];
  isButtonDisable: boolean;
}

export interface ComponentItem {
  [key: string]: unknown;
  employeeComponentId: string;
  componentTypeId: string;
  componentTypeName: string;
  componentId: string;
  componentName: string;
  amount: string;
  amountNumber: number;
  newAmount: string;
  newAmountNumber: number;
  effectiveDate: string;
  effectiveDateOrigin: string;
  type: number;
  typeString: string;
  status: boolean;
}
