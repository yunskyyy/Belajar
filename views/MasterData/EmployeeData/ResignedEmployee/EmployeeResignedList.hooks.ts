import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { ENDPOINT } from '@/constants/apiURL';
import useGetData from '@/hooks/useGetData';
import useQueryParams from '@/hooks/useQueryParams';
import { filterOptionNormalizer } from '@/normalizers';
import type { SelectItem } from '@/types/inputs';
import type { SearchOptions } from '@/types/responses';
import type { TableColumn } from '@/types/tables';
import { createQueryParams } from '@/utils';

import employeeResignedListNormalizer from './normalizers/employeeResignedListNormalizer';
import { TABLE_COLUMNS } from './EmployeeResignedList.constants';
import type {
  Employee, EmployeeList,
} from './EmployeeResignedList.types';

const useEmployeeResignedList = () => {
  const router = useRouter();
  const {
    queryParams,
    onFilterChange,
    onPageChange,
    onPageSizeChange,
    onSearchChange: handleSearch,
    onSortChange,
  } = useQueryParams();

  const { EMPLOYEE_MGMT } = ENDPOINT;
  const {
    DIVISION_SEARCH,
    LEVEL_SEARCH,
    POSITION_SEARCH,
    STRUCTURAL_SEARCH,
    EMPLOYEE_RESIGNS,
  } = EMPLOYEE_MGMT;

  const [openRestoreModal, setOpenRestoreModal] = useState(false);

  const [restoreEmployeeData, setRestoreEmployeeData] = useState<Employee>();

  const {
    data: employeeData,
    isLoading,
    refetch,
  } = useGetData<EmployeeList>(
    ['employeeResignedfList', createQueryParams(queryParams)],
    EMPLOYEE_RESIGNS,
    {
      params: queryParams,
      normalizer: employeeResignedListNormalizer,
    },
  );

  const { data: divisionFilterOption = [] } = useGetData<SelectItem[], SearchOptions>(
    ['divisionFilterOption'],
    DIVISION_SEARCH,
    {
      normalizer: filterOptionNormalizer,
    },
  );

  const { data: levelFilterOption = [] } = useGetData<SelectItem[], SearchOptions>(
    ['levelFilterOption'],
    LEVEL_SEARCH,
    {
      normalizer: filterOptionNormalizer,
    },
  );

  const { data: positionFilterOption = [] } = useGetData<SelectItem[], SearchOptions>(
    ['positionFilterOption'],
    POSITION_SEARCH,
    {
      normalizer: filterOptionNormalizer,
    },
  );

  const { data: structuralFilterOption = [] } = useGetData<SelectItem[], SearchOptions>(
    ['structuralFilterOption'],
    STRUCTURAL_SEARCH,
    {
      normalizer: filterOptionNormalizer,
    },
  );

  const tableColumns: TableColumn[] = TABLE_COLUMNS({
    divisionFilterOption,
    levelFilterOption,
    positionFilterOption,
    structuralFilterOption,
  });

  const handleNavigateToDetail = (id: string) => {
    router.push(`resigned/${id}`);
  };

  const handleCloseRestoreModal = () => {
    refetch();
    setOpenRestoreModal(false);
  };

  const handleOpenModalRestore = (data: Employee) => {
    setRestoreEmployeeData(data);
    setOpenRestoreModal(true);
  };

  return {
    employeeData,
    isLoading,
    tableColumns,
    queryParams,
    openRestoreModal,
    restoreEmployeeData,
    handleNavigateToDetail,
    handleSearch,
    onFilterChange,
    onPageChange,
    onPageSizeChange,
    onSortChange,
    handleCloseRestoreModal,
    handleOpenModalRestore,
  };
};

export default useEmployeeResignedList;
