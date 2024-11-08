import { format } from 'date-fns';

import type { PayrollPeriod } from '../views/RunPayroll/RunPayrollForm/components/PayrollPeriod/PayrollPeriod.types';

const payrollPeriodNormalizer = (data: PayrollPeriod): PayrollPeriod => ({
  cutOffPeriodStartDt: data.cutOffPeriodStartDt ? format(new Date(data.cutOffPeriodStartDt), 'dd/MM/yyyy') : '',
  cutOffPeriodEndDt: data.cutOffPeriodEndDt ? format(new Date(data.cutOffPeriodEndDt), 'dd/MM/yyyy') : '',
  payrollDisbursementId: data.payrollDisbursementId || '',
  paymentScheduleDate: data.paymentScheduleDate || '-',
  month: data.periodDate ? new Date(data.periodDate).getMonth() : 0,
  year: data.periodDate ? new Date(data.periodDate).getFullYear() : 0,
  periodDate: data.periodDate || '-',
  description: data.description || '',
});

export default payrollPeriodNormalizer;
