import { useFormContext } from 'react-hook-form';

import { ENDPOINT } from '@/constants/apiURL';
import useGetData from '@/hooks/useGetData';
import { filterOptionNormalizer } from '@/normalizers';
import type { SelectItem } from '@/types/inputs';
import type { SearchOptions } from '@/types/responses';

import type { ReimburseSettingsFormSchema } from '../../ReimburseSettingsForm.types';

const useSettingsForm = () => {
  const { REIMBURSEMENT } = ENDPOINT;
  const { REIMBURSE_SETTINGS } = REIMBURSEMENT;
  const { TYPES, CATEGORIES } = REIMBURSE_SETTINGS;

  const {
    data: categoryOption = [],
  } = useGetData<SelectItem[], SearchOptions>(
    ['categoryOption'],
    CATEGORIES,
    {
      normalizer: filterOptionNormalizer,
    },
  );

  const {
    data: typeOption = [],
  } = useGetData<SelectItem[], SearchOptions>(
    ['typeOption'],
    TYPES,
    {
      normalizer: filterOptionNormalizer,
    },
  );

  const {
    control,
  } = useFormContext<ReimburseSettingsFormSchema>();

  return {
    categoryOption,
    typeOption,
    control,
  };
};

export default useSettingsForm;
