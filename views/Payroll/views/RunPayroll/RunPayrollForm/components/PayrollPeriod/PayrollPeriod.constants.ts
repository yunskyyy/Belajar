import { addMonths, format } from 'date-fns';

import type { SelectItem } from '@/types/inputs';

export const yearOption: SelectItem[] = new Array(4).fill({ label: '', value: '' }).map((_el, i) => ({
  label: String(new Date().getFullYear() + i),
  value: new Date().getFullYear() + i,
}));

export const monthOption: SelectItem[] = new Array(5).fill({ label: '', value: '' }).map((_el, i) => ({
  label: format(addMonths(new Date(), i - 1), 'MMMM'),
  value: new Date().getMonth() + i - 1,
}));
