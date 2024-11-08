import { useFormContext } from 'react-hook-form';

import { ENDPOINT } from '@/constants/apiURL';
import useGetData from '@/hooks/useGetData';
import { selectOptionNormalizer } from '@/normalizers';
import type { SelectItem } from '@/types/inputs';
import type { SearchOptions } from '@/types/responses';

import type { EmployeeFormSchema } from '../../EmployeeForm.types';

const usePayrollInformationForm = () => {
  const {
    control,
  } = useFormContext<EmployeeFormSchema>();

  const { EMPLOYEE_MGMT: { BANK_SEARCH } } = ENDPOINT;

  const {
    data: bankOption = [],
  } = useGetData<SelectItem[], SearchOptions>(
    ['bankOption'],
    BANK_SEARCH,
    {
      normalizer: selectOptionNormalizer,
    },
  );

  return {
    bankOption,
    control,
  };
};

export default usePayrollInformationForm;
