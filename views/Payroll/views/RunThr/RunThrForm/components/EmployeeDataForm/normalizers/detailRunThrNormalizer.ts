import { format } from 'date-fns';

import { formatDateFull } from '@/utils';

import type { DetailRunThr } from '../EmployeeDataForm.types';

const detailRunThrNormalizer = (data: DetailRunThr): DetailRunThr => ({
  paymentScheduleDate: formatDateFull(data.paymentScheduleDate) || '-',
  periodDate: format(new Date(data.periodDate), 'MMMM yyyy') || '-',
  description: data.description || '',
  totalEmployees: data.totalEmployees || 0,
});

export default detailRunThrNormalizer;
