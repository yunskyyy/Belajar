import { toIDR } from '@/utils';

import type { OnsiteIncentiveData } from '../Dashboard.types';

const onsiteIncentiveNormalizer = ({
  totalAmount = 0,
  items = [],
}: OnsiteIncentiveData): OnsiteIncentiveData => ({
  totalAmount,
  totalAmountString: toIDR(totalAmount),
  items: items.map(({
    projectCode = '',
    totalAmount: itemAmount = 0,
    types: {
      onsite = 0,
      incentive = 0,
    },
  }) => ({
    projectCode,
    totalAmount: itemAmount,
    types: { onsite, incentive },
  })),
});

export default onsiteIncentiveNormalizer;
