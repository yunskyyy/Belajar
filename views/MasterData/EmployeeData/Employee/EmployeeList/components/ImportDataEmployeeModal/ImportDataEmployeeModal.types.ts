export interface EmployeeDataImportModalProps {
  open?: boolean;
  isExact?: boolean;
  onClose?: () => void;
}

export interface EmployeeSheetData {
  [key: string]: string;
  'Employee ID': string;
  'Employee Name': string;
  'Effective Date': string;
  'Type': string;
}

export type EmployeeSheetKeys = Array<keyof EmployeeSheetData>;
