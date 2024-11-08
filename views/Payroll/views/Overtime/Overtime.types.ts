import type { SelectItem } from '@/types/inputs';
import type { AuditTrail, BaseQueryParams, PaginationData } from '@/types/responses';

export interface OvertimeData extends AuditTrail {
  [key: string]: unknown;
  overtimeExpenseId: string;
  employeeId: string;
  employeeIdNumber: string;
  employeeName: string;
  amount: number;
  amountIDR: string;
  date: string;
  hours: number;
  projectId: string;
  projectCode: string;
  projectName: string;
  schedulePaymentDate: string;
  teamId: string;
  teamName: string;
  type: string;
}

export type OvertimeList = PaginationData<OvertimeData>;

export interface OvertimeTableProps {
  projectCodeFilterOption: SelectItem[];
  teamNameFilterOption: SelectItem[];
}

export interface OvertimeQueryParams extends BaseQueryParams {
  [key: string]: unknown;
  startDt: string;
  endDt: string;
  name: string;
  typeId: string;
}

export interface OvertimeSheetData {
  [key: string]: unknown;
  Month: number | string;
  Year: number;
  'Employee ID': string;
  'Employee Name': string;
  'Project Code': string;
  'Team Name': string;
  'Overtime Hours': number;
}

export interface OvertimeBulkRequest {
  [key: string]: unknown;
  month: number;
  year: number;
  employeeId: string;
  projectCode: string;
  teamCode: string;
  totalHours: number;
}
