import { toIDR } from '@/utils';

import type { PayrollData } from '../PayrollChart.types';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const payrollDataNormalizers = ({
  totalPayroll = 0,
  listPayrollMonth = [],
}: PayrollData): PayrollData => ({
  totalPayroll,
  totalPayrollString: toIDR(totalPayroll),
  listPayrollMonth: listPayrollMonth.map(({
    amount = 0,
    month,
  }) => ({
    amount,
    month: months[Number(month) - 1],
  })),
});

export default payrollDataNormalizers;
