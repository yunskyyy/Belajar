import { useState } from 'react';

import { ENDPOINT } from '@/constants/apiURL';
import useGetData from '@/hooks/useGetData';
import useQueryParams from '@/hooks/useQueryParams';
import type { SelectItem } from '@/types/inputs';
import type { SearchOptions } from '@/types/responses';
import { createQueryParams } from '@/utils';

import type { EmployeeDataResponse } from './MassChanges.types';

const useEmployeeData = () => {
  const {
    queryParams,
    onFilterChange,
    onPageChange,
    onPageSizeChange,
    onSearchChange: handleSearch,
    onSortChange,
  } = useQueryParams();

  const { PAYROLLS } = ENDPOINT;
  const [selectedId, setSelectedId] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const {
    data: employeeData,
    isLoading,
  } = useGetData<EmployeeDataResponse>(
    ['massChangesList', createQueryParams(queryParams)],
    PAYROLLS.MASS_CHANGES,
    {
      params: queryParams,
    },
  );

  const {
    isFetching: templateLoading, refetch: getTemplateData,
  } = useGetData<SelectItem[], SearchOptions>(
    ['templateData'],
    PAYROLLS.DOWNLOAD,
    {
      options: {
        enabled: false,
      },
    },
  );

  const handleDownloadTemplate = () => {
    // TODO: completing download flow when API ready
    getTemplateData().then(() => {});
  };

  const handleEdit = (id: string) => {
    setSelectedId(id);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return {
    employeeData,
    isLoading,
    openModal,
    selectedId,
    templateLoading,
    queryParams,
    handleCloseModal,
    handleEdit,
    handleSearch,
    handleDownloadTemplate,
    onFilterChange,
    onPageChange,
    onPageSizeChange,
    onSortChange,
  };
};

export default useEmployeeData;
