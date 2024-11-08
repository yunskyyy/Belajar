import type { IncentiveAmount } from '../OnsiteIncentiveList.types';

const incentiveAmountNormalizer = (data: IncentiveAmount): number => (
  data.amount || 0
);

export default incentiveAmountNormalizer;
