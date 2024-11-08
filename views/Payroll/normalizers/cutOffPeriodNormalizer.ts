import {
  setMonth, setYear,
} from 'date-fns';

import { formatDateFull } from '@/utils';

import type { CutOffPeriod } from '../views/RunPayroll/RunPayrollForm/components/PayrollPeriod/PayrollPeriod.types';

const cutOffPeriodPayrollNormalizer = (data: CutOffPeriod): CutOffPeriod => ({
  cutOffPeriodId: data.cutOffPeriodId || '',
  startDt: data.startDt ? formatDateFull(data.startDt) : '',
  endDt: data.endDt ? formatDateFull(data.endDt) : '',
  name: data.name || '',
  organizationId: data.organizationId || '',
  paymentScheduleDt: data.paymentScheduleDt ? (() => {
    const paymentMonth = setMonth(
      setYear(new Date(data.paymentScheduleDt), new Date().getFullYear()),
      new Date().getMonth(),
    );
    return String(paymentMonth);
  })() : '',
  totalWorkDays: data.totalWorkDays || 0,
});

export default cutOffPeriodPayrollNormalizer;
