import { formatDate } from '@/utils';

import type { CutOffPeriodData, CutOffPeriodDataResponse } from '../CutOffPeriod.types';

const cutOffPeriodNormalizer = (data: CutOffPeriodDataResponse): CutOffPeriodData => ({
  cutOffPeriodId: data.cutOffPeriodId || '',
  organizationId: data.organizationId || '',
  name: data.name || '',
  nameDisplay: data.name || '-',
  startDt: data.startDt || '',
  startDtDisplay: data.startDt ? formatDate(data.startDt) : '-',
  endDt: data.endDt || '',
  endDtDisplay: data.endDt ? formatDate(data.endDt) : '-',
  paymentScheduleDt: data.paymentScheduleDt || '',
  paymentScheduleDtDisplay: data.paymentScheduleDt ? formatDate(data.paymentScheduleDt) : '-',
});

export default cutOffPeriodNormalizer;
