import { useState } from 'react';

import { useFormContext } from 'react-hook-form';

import { ENDPOINT } from '@/constants/apiURL';
import useGetData from '@/hooks/useGetData';
import { selectOptionNormalizer } from '@/normalizers';
import type { SelectItem } from '@/types/inputs';
import type { SearchOptions } from '@/types/responses';

import type { EmployeeFormSchema } from '../../EmployeeForm.types';

import {
  splitName,
} from './EmployeeProfileForm.helpers';

const useEmployeeProfileForm = () => {
  const { EMPLOYEE_MGMT } = ENDPOINT;
  const { USER_SEARCH_ALL } = EMPLOYEE_MGMT;

  const [emailAutocompleteValue, setEmailAutocompleteValue] = useState('');
  const [showResidentialAddress, setShowResidentialAddress] = useState(false);

  const {
    control,
    formState: { errors },
    getValues,
    register,
    setValue,
  } = useFormContext<EmployeeFormSchema>();

  const { data: userOption } = useGetData<SelectItem[], SearchOptions>(
    ['userSearch', emailAutocompleteValue],
    USER_SEARCH_ALL,
    {
      params: { s: emailAutocompleteValue },
      normalizer: selectOptionNormalizer,
      options: {
        enabled: !!emailAutocompleteValue,
      },
    },
  );

  const handleChangeShowAddress = (value: boolean) => {
    setShowResidentialAddress(value);
    if (value) {
      setValue('residentialAddress', '');
    } else {
      setValue('residentialAddress', getValues('citizenAddress'));
    }
  };

  const handleEmailInputChange = (value: string) => {
    setEmailAutocompleteValue(value);
  };

  const handleEmailValueChange = (label: string, value: string) => {
    const regex = /\(([^()]+)\)/g;
    const matches = regex.exec(label);
    if (matches && matches.length) {
      const fullName = matches[1];
      const { firstName = '', lastName = '' } = splitName(String(fullName));
      setValue('emailAddress', label.split(' ')[0]);
      setValue('firstName', firstName, { shouldTouch: true });
      setValue('lastName', lastName, { shouldTouch: true });
      setValue('userId', value);
    }
  };

  return {
    control,
    errors,
    emailAutocompleteValue,
    getValues,
    register,
    setValue,
    showResidentialAddress,
    userOption,
    handleChangeShowAddress,
    handleEmailInputChange,
    handleEmailValueChange,
  };
};

export default useEmployeeProfileForm;
