import { formatDateFull, toIDR } from '@/utils';

import type { DetailRunPayroll } from '../types/detailRunPayroll';

const detailRunPayrollNormalizer = (data: DetailRunPayroll): DetailRunPayroll => {
  const totalCutOffWeekdays = ((data.totalWorkDays || 0) - (data.totalHolidayDays || 0)) || 0;
  return {
    cutOffPeriodStartDt: data.cutOffPeriodStartDt ? formatDateFull(data.cutOffPeriodStartDt) : '',
    cutOffPeriodEndDt: data.cutOffPeriodEndDt ? formatDateFull(data.cutOffPeriodEndDt) : '',
    payrollDisbursementId: data.payrollDisbursementId || '',
    holidayAllowanceDisbursementId: data.holidayAllowanceDisbursementId || '',
    paymentScheduleDate: data.paymentScheduleDate ? formatDateFull(data.paymentScheduleDate) : '',
    periodDate: data.periodDate || '',
    description: data.description || '',
    employeeData: data.employeeData,
    totalAmount: toIDR(Number(data.totalAmount)),
    totalCutoffWeekdays: totalCutOffWeekdays >= 0 ? totalCutOffWeekdays : 0,
    totalEmployees: data.totalEmployees || 0,
  };
};

export default detailRunPayrollNormalizer;
