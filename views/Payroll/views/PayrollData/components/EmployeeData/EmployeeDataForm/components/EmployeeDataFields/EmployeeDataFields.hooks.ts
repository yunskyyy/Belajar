import { useState } from 'react';

import { useFormContext, useWatch } from 'react-hook-form';

import { ENDPOINT } from '@/constants/apiURL';
import useGetData from '@/hooks/useGetData';
import { selectOptionNormalizer } from '@/normalizers';
import type { SelectItem } from '@/types/inputs';
import type { SearchOptions } from '@/types/responses';

import type { EmployeeDataFormSchema } from '../../EmployeeDataForm.types';

const useEmployeeDataFields = () => {
  const {
    PAYROLLS: {
      COMPONENT_SEARCH,
      COMPONENT_TYPE_SEARCH,
    },
  } = ENDPOINT;

  const [componentSearchValue, setComponentSearchValue] = useState('');

  const {
    control,
    setValue,
  } = useFormContext<EmployeeDataFormSchema>();

  const {
    componentTypeId = '',
    componentId,
  } = useWatch({ control });

  const { data: componentTypeOption = [] } = useGetData<SelectItem[], SearchOptions>(
    ['componentTypeOption'],
    COMPONENT_TYPE_SEARCH,
    {
      normalizer: selectOptionNormalizer,
    },
  );

  const {
    data: componentNameOption = [],
  } = useGetData<SelectItem[], SearchOptions>(
    ['componentNameOption', componentTypeId, componentSearchValue],
    COMPONENT_SEARCH,
    {
      params: {
        typeId: componentTypeId,
        s: componentSearchValue,
      },
      normalizer: selectOptionNormalizer,
    },
  );

  const handleComponentSearchChange = (value: string) => {
    setComponentSearchValue(value);
  };

  return {
    componentId,
    componentNameOption,
    componentSearchValue,
    componentTypeId,
    componentTypeOption,
    control,
    setValue,
    handleComponentSearchChange,
  };
};

export default useEmployeeDataFields;
