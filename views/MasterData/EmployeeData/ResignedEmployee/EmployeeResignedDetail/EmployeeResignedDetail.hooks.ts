import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { ENDPOINT } from '@/constants/apiURL';
import useGetData from '@/hooks/useGetData';
import RULE_APPROVAL_OPTION from '@/views/MasterData/EmployeeData/EmployeeData.constants';

import type { Employee } from '../types/employee';

import employeeNormalizer from './normalizers/employeeResignedNormalizer';

const useEmployeeResignedDetail = (id = '') => {
  const router = useRouter();
  const { EMPLOYEE_MGMT } = ENDPOINT;
  const { EMPLOYEE_BY_ID } = EMPLOYEE_MGMT;
  const [openRestoreModal, setOpenRestoreModal] = useState(false);
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
    router.push('/master-data/employee-data/resigned');
  };

  const handleOpenModalRestore = () => {
    setOpenRestoreModal(true);
  };

  const handleCloseRestoreModal = () => {
    setOpenRestoreModal(false);
  };

  return {
    data,
    isLoading,
    openRestoreModal,
    matchingOption,
    handleBack,
    handleCloseRestoreModal,
    handleOpenModalRestore,
  };
};

export default useEmployeeResignedDetail;
