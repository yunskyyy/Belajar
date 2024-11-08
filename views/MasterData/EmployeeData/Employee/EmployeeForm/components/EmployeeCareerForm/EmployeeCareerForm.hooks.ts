import { useFormContext } from 'react-hook-form';

import { ENDPOINT } from '@/constants/apiURL';
import useGetData from '@/hooks/useGetData';
import { selectOptionNormalizer } from '@/normalizers';
import type { SelectItem } from '@/types/inputs';
import type { SearchOptions } from '@/types/responses';

import type { EmployeeFormSchema } from '../../EmployeeForm.types';

const useEmployeeCareerForm = () => {
  const { EMPLOYEE_MGMT } = ENDPOINT;
  const {
    DIVISION_SEARCH,
    POSITION_SEARCH,
    STRUCTURAL_SEARCH,
    LEVEL_SEARCH,
    STATUS_SEARCH_NORESIGN,
  } = EMPLOYEE_MGMT;

  const {
    control,
    getValues,
    setValue,
  } = useFormContext<EmployeeFormSchema>();

  const { data: divisionOption = [] } = useGetData<SelectItem[], SearchOptions>(
    ['divisionOption'],
    DIVISION_SEARCH,
    {
      normalizer: selectOptionNormalizer,
    },
  );

  const {
    data: positionOption = [],
    refetch: refetchPosition,
  } = useGetData<SelectItem[], SearchOptions>(
    ['positionOption', getValues('divisionId')],
    POSITION_SEARCH,
    {
      normalizer: selectOptionNormalizer,
      params: {
        divisionId: getValues('divisionId'),
      },
    },
  );

  const { data: structuralOption = [] } = useGetData<SelectItem[], SearchOptions>(
    ['structuralOption'],
    STRUCTURAL_SEARCH,
    {
      normalizer: selectOptionNormalizer,
    },
  );

  const { data: levelOption = [] } = useGetData<SelectItem[], SearchOptions>(
    ['levelOption'],
    LEVEL_SEARCH,
    {
      normalizer: selectOptionNormalizer,
    },
  );

  const { data: employmentStatusOption = [] } = useGetData<SelectItem[], SearchOptions>(
    ['employmentStatusOption'],
    STATUS_SEARCH_NORESIGN,
    {
      normalizer: selectOptionNormalizer,
    },
  );

  return {
    control,
    divisionOption,
    employmentStatusOption,
    levelOption,
    positionOption,
    refetchPosition,
    setValue,
    structuralOption,
  };
};

export default useEmployeeCareerForm;
