import {
  format,
} from 'date-fns';

import type { CutOffPeriod } from '../PayrollPeriod.types';

const cutOffPeriodPayrollNormalizer = (data: CutOffPeriod): CutOffPeriod => ({
  cutOffPeriodId: data.cutOffPeriodId || '',
  startDt: data.startDt ? format(new Date(data.startDt), 'dd/MM/yyyy') : '',
  endDt: data.endDt ? format(new Date(data.endDt), 'dd/MM/yyyy') : '',
  name: data.name || '',
  organizationId: data.organizationId || '',
  paymentScheduleDt: data.paymentScheduleDt ? data.paymentScheduleDt : '',
  totalWorkDays: data.totalWorkDays || 0,
});

export default cutOffPeriodPayrollNormalizer;
