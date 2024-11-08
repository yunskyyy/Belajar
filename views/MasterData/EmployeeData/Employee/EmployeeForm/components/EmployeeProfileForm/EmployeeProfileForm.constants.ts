import type { RadioOption, SelectItem } from '@/types/inputs';

export const GENDER_OPTION: RadioOption[] = [
  {
    label: 'Male',
    value: 'Male',
  },
  {
    label: 'Female',
    value: 'Female',
  },
];

export const MARITAL_STATUS_OPTION: SelectItem[] = [
  {
    label: 'Belum Menikah',
    value: 'Belum Menikah',
  },
  {
    label: 'Menikah',
    value: 'Menikah',
  },
  {
    label: 'Cerai',
    value: 'Cerai',
  },
];

export const RELIGION_OPTION: SelectItem[] = [
  {
    label: 'Islam',
    value: 'Islam',
  },
  {
    label: 'Kristen',
    value: 'Kristen',
  },
  {
    label: 'Katolik',
    value: 'Katolik',
  },
  {
    label: 'Hindu',
    value: 'Hindu',
  },
  {
    label: 'Buddha',
    value: 'Buddha',
  },
  {
    label: 'Konghucu',
    value: 'Konghucu',
  },
  {
    label: 'Lainnya',
    value: 'Lainnya',
  },
];
