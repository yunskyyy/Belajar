import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { utils, writeFile } from 'xlsx';

import { ENDPOINT } from '@/constants/apiURL';
import { autofitColumns } from '@/helpers';
import useGetData from '@/hooks/useGetData';
import useQueryParams from '@/hooks/useQueryParams';
import { filterOptionNormalizer } from '@/normalizers';
import type { SelectItem } from '@/types/inputs';
import type { SearchOptions } from '@/types/responses';
import type { TableColumn } from '@/types/tables';
import { createQueryParams, formatDate } from '@/utils';

import type { Employee } from '../types/employee';

import employeeListNormalizer from './normalizers/employeeListNormalizer';
import employeesNormalizer from './normalizers/employeesNormalizer';
import { TABLE_COLUMNS } from './EmployeeList.constants';
import type {
  EmployeeExportData,
  EmployeeExportQuery,
  EmployeeList,
} from './EmployeeList.types';

const useEmployeeList = () => {
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
    EMPLOYEE,
    EMPLOYEE_EXPORT,
    LEVEL_SEARCH,
    POSITION_SEARCH,
    STRUCTURAL_SEARCH,
    STATUS_SEARCH_NORESIGN,
  } = EMPLOYEE_MGMT;

  const [openExportModal, setOpenExportModal] = useState(false);
  const [openImportModal, setOpenImportModal] = useState(false);
  const [exportQuery, setExportQuery] = useState<EmployeeExportQuery>({
    divisionId: '', employmentStatusId: '', levelId: '', positionId: '', structuralId: '',
  });
  const [resignEmployee, setResignEmployee] = useState<Employee>();
  const [openResignModal, setOpenResignModal] = useState(false);

  const {
    data: employeeData,
    isLoading,
    refetch,
  } = useGetData<EmployeeList>(
    ['employeeList', createQueryParams(queryParams)],
    EMPLOYEE,
    {
      params: queryParams,
      normalizer: employeeListNormalizer,
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

  const { data: statusFilterOption = [] } = useGetData<SelectItem[], SearchOptions>(
    ['statusFilterOption'],
    STATUS_SEARCH_NORESIGN,
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

  const {
    isFetching: exportLoading,
    refetch: exportRefetch,
  } = useGetData<EmployeeExportData[], Employee[]>(
    ['exportEmployeeData'],
    EMPLOYEE_EXPORT,
    {
      params: exportQuery,
      normalizer: employeesNormalizer,
      options: {
        enabled: false,
      },
    },
  );

  const tableColumns: TableColumn[] = TABLE_COLUMNS({
    divisionFilterOption,
    levelFilterOption,
    positionFilterOption,
    statusFilterOption,
    structuralFilterOption,
  });

  const handleNavigateToDetail = (id: string) => {
    router.push(`employee/${id}`);
  };

  const handleEdit = (id: string) => {
    router.push(`/master-data/employee-data/employee/edit/${id}`);
  };

  const handleCloseExportModal = () => {
    setOpenExportModal(false);
  };

  const handleCloseImportModal = () => {
    setOpenImportModal(false);
  };

  const handleOpenImportModal = () => {
    setOpenImportModal(true);
  };

  const handleOpenExport = () => {
    const {
      positionId = '',
      levelId = '',
      employmentStatusId = '',
      divisionId = '',
      structuralId = '',
    } = queryParams;
    setExportQuery({
      positionId,
      levelId,
      employmentStatusId,
      divisionId,
      structuralId,
    });
    setOpenExportModal(true);
  };

  const handleExportFilterChange = (key: keyof EmployeeExportQuery, value: string) => {
    setExportQuery((prevState) => ({ ...prevState, ...{ [key]: value } }));
  };

  const handleExport = () => {
    exportRefetch().then((response) => {
      const { data: exportData = [] } = response;
      const worksheet = utils.json_to_sheet(exportData);
      const workbook = utils.book_new();
      worksheet['!cols'] = autofitColumns<EmployeeExportData>(exportData);
      utils.book_append_sheet(workbook, worksheet, 'Data Karyawan');
      writeFile(workbook, `Data Karyawan ${formatDate(String(new Date()))}.xlsx`, { compression: true });
    });
  };

  const handleResign = async (data: Employee) => {
    setResignEmployee(data);
    setOpenResignModal(true);
  };

  const handleCloseResignModal = () => {
    refetch();
    setOpenResignModal(false);
  };

  return {
    divisionFilterOption,
    employeeData,
    exportLoading,
    exportQuery,
    levelFilterOption,
    isLoading,
    openExportModal,
    positionFilterOption,
    statusFilterOption,
    structuralFilterOption,
    tableColumns,
    queryParams,
    openImportModal,
    resignEmployee,
    openResignModal,
    handleCloseExportModal,
    handleResign,
    handleEdit,
    handleExport,
    handleExportFilterChange,
    handleNavigateToDetail,
    handleOpenExport,
    handleSearch,
    onFilterChange,
    onPageChange,
    onPageSizeChange,
    onSortChange,
    handleCloseImportModal,
    handleOpenImportModal,
    handleCloseResignModal,
  };
};

export default useEmployeeList;
