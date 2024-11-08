import { useRouter } from 'next/navigation';

import { ENDPOINT } from '@/constants/apiURL';
import useGetData from '@/hooks/useGetData';
import RULE_APPROVAL_OPTION from '@/views/MasterData/EmployeeData/EmployeeData.constants';

import type { Employee } from '../types/employee';

import employeeNormalizer from './normalizers/employeeNormalizer';

const useEmployeeDetail = (id = '') => {
  const router = useRouter();
  const { EMPLOYEE_MGMT } = ENDPOINT;
  const { EMPLOYEE_BY_ID } = EMPLOYEE_MGMT;

  const {
    data,
    isLoading,
  } = useGetData<Employee>(
    ['employeeDetail'],
    EMPLOYEE_BY_ID(String(id)),
    {
      options: {
        enabled: !!id,
      },
      normalizer: employeeNormalizer,
    },
  );

  const matchingOption = (rule:string) => RULE_APPROVAL_OPTION.find(
    (option) => option.value === rule,
  )?.label;

  const handleBack = () => {
    router.push('/master-data/employee-data/employee');
  };

  return {
    data,
    isLoading,
    handleBack,
    matchingOption,
  };
};

export default useEmployeeDetail;
