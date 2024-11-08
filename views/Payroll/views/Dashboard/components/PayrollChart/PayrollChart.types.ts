export interface PayrollData {
  totalPayroll: number;
  totalPayrollString: string;
  listPayrollMonth: ListPayrollMonth[];
}

export interface ListPayrollMonth {
  month: string;
  amount: number;
}
