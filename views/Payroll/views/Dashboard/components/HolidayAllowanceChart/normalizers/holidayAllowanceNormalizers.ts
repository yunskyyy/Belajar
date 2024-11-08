import { toIDR } from '@/utils';

import type { HolidayAllowanceData } from '../HolidayAllowanceChart.types';

const holidayAllowanceNormalizers = ({
  newAmount = 0,
  percentageChange = 0,
  items = [],
  totalAmount = 0,
  oldAmount = 0,
}: HolidayAllowanceData): HolidayAllowanceData => ({
  newAmount,
  oldAmount,
  totalAmount,
  totalAmountString: toIDR(totalAmount),
  percentageChange,
  percentageString: percentageChange.toFixed(),
  isRising: newAmount > oldAmount,
  items: items.map(({
    totalAmount: itemAmount = 0,
    year = 0,
  }) => ({
    totalAmount: itemAmount,
    year,
  })),
});

export default holidayAllowanceNormalizers;
