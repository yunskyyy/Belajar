import { toIDR } from '@/utils';

import type { OvertimeData } from '../Dashboard.types';

const overtimeDataNormalizer = ({
  totalAmount = 0,
  items = [],
}: OvertimeData): OvertimeData => ({
  totalAmount,
  totalAmountString: toIDR(totalAmount),
  items: items.map(({
    totalAmount: itemAmount = 0,
    projectCode = '',
  }) => ({
    totalAmount: itemAmount,
    projectCode,
  })),
});

export default overtimeDataNormalizer;
