export interface OvertimeImportModalProps {
  open?: boolean;
  onClose?: (revalidate?: boolean) => void;
}
export interface OvertimeImportSummary {
  dataSuccess: SummaryData[];
  dataFailed: SummaryData[];
}

export interface SummaryData {
  [key: string]: unknown;
  id: string;
  month: number;
  year: number;
  date: string;
  employeeId: string;
  employeeName: string;
  projectCode: string;
  teamCode: string;
  totalHours: number;
}
