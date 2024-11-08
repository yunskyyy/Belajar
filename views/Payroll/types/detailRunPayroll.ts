import type { EmployeeData } from '@/views/Payroll/types/runPayrollFormComponents';

export interface DetailRunPayroll {
  holidayAllowanceDisbursementId: string;
  payrollDisbursementId: string;
  cutOffPeriodStartDt: string;
  cutOffPeriodEndDt: string;
  paymentScheduleDate: string;
  periodDate: string;
  description: string;
  employeeData: EmployeeData[];
  totalAmount: string;
  totalCutoffWeekdays?: number;
  totalEmployees: number;
  totalWorkDays?: number;
  totalHolidayDays?: number;
}
