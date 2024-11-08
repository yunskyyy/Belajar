import format from 'date-fns/format';

import { toIDR } from '@/utils';

import type { UpcomingPayrollData } from '../UpcomingPayroll.types';

const upcomingPayrollNormalizer = ({
  date,
  totalAmount = 0,
}: UpcomingPayrollData): UpcomingPayrollData => ({
  date: date ? format(new Date(date), 'MMMM yyyy').toUpperCase() : '',
  totalAmount,
  totalAmountIDR: toIDR(totalAmount),
});

export default upcomingPayrollNormalizer;
