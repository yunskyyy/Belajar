import type { ThrPeriod } from '../ThrPeriod.types';

const thrPeriodNormalizer = (data: ThrPeriod): ThrPeriod => ({
  holidayAllowanceDisbursementId: data.holidayAllowanceDisbursementId || '',
  paymentScheduleDate: data.paymentScheduleDate || '-',
  month: data.periodDate ? new Date(data.periodDate).getMonth() : 0,
  year: data.periodDate ? new Date(data.periodDate).getFullYear() : 0,
  periodDate: data.periodDate || '-',
  description: data.description || '',
});

export default thrPeriodNormalizer;
