import type { PayrollSheetData } from '../../EmployeeData.types';

export interface PayrollImportModalProps {
  open?: boolean;
  isExact?: boolean;
  onClose?: () => void;
}
export interface PayrollImportSummary {
  dataSuccess: SummaryData[];
  dataFailed: SummaryData[];
}

export interface SummaryData {
  [key: string]: unknown;
  employeeId: string;
  employeeName: string;
  componentType: string;
  componentName: string;
  currentAmount: number;
  newAmount: number;
  effectiveDate: string;
  type: string;
}

export type PayrollSheetKeys = Array<keyof PayrollSheetData>;
