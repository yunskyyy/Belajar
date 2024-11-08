import { useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';

import type { ChangeEvent, KeyboardEvent } from 'react';

import { ENDPOINT } from '@/constants/apiURL';
import useGetData from '@/hooks/useGetData';
import { usePostData } from '@/hooks/useMutateData';
import useToaster from '@/hooks/useToaster';
import { selectOptionNormalizer } from '@/normalizers';
import type { SelectItem } from '@/types/inputs';
import type { SearchOptions } from '@/types/responses';
import { createQueryParams, formatDateApi, noop } from '@/utils';
import employeeNormalizer from '@/views/Payroll/normalizers/employeeDataFormNormalizer';
import type { ModalEmployeeProps } from '@/views/Payroll/types/modalEmployee';
import type {
  EmployeeData,
  ItemEmployeeData,
  ListItemEmployeeData,
} from '@/views/Payroll/types/runPayrollFormComponents';

import employeeDataNormalizer from './normalizers/employeeDataNormalizer';
import { INIT_QUERY_PARAMS } from './ModalSelectEmployee.constants';
import type { EmployeeDataQueryParams } from './ModalSelectEmployee.types';

const useModalSelectEmployee = (props: ModalEmployeeProps) => {
  const toaster = useToaster();
  const {
    id = '',
    onCancel = noop,
    onCloseModal = noop,
    startDate = '',
    endDate = '',
  } = props;
  const [search, setSearch] = useState('');
  const pathname = usePathname();
  const isPayroll = useMemo(() => pathname.includes('run-payroll'), [pathname]);
  const [searchSelected, setSearchSelected] = useState('');
  const [employeeSelected, setEmployeeSelected] = useState<EmployeeData[]>([]);
  const [employeeSearch, setEmployeeSearch] = useState<EmployeeData[]>([]);
  const { DISBURSEMENT_MGMT, RUN_THR_MGMT } = ENDPOINT;
  const [
    queryParams,
    setQueryParams,
  ] = useState<EmployeeDataQueryParams>({
    ...INIT_QUERY_PARAMS,
    startPeriodDt: formatDateApi(new Date(startDate)),
    endPeriodDt: formatDateApi(new Date(endDate)),
  });
  const {
    DIVISION_SEARCH,
    EMPLOYEE_EXISTING,
    EMPLOYEES_SEARCH,
    LIST_EMPLOYEE_BY_ID,
    POSITION_SEARCH,
    STRUCTURAL_SEARCH,
  } = DISBURSEMENT_MGMT;

  const { SELECT_EMPLOYEES, EMPLOYEES_SEARCH: THR_EMPLOYEE_SEARCH } = RUN_THR_MGMT;

  const {
    data: employeeData,
    isLoading: employeeLoading,
  } = useGetData<EmployeeData[]>(
    ['employeeModalData', id],
    isPayroll ? EMPLOYEE_EXISTING(id) : SELECT_EMPLOYEES(id),
    {
      params: queryParams,
      normalizer: employeeDataNormalizer,
    },
  );

  useEffect(() => {
    if (employeeData) {
      setEmployeeSearch(employeeData);
      setEmployeeSelected(employeeData);
      setQueryParams((prevState) => ({
        ...prevState,
        excludeIds: employeeData.map((employee) => employee.employeeId),
      }));
    }
  }, [employeeData]);

  const {
    data: employeeSearchData,
    isLoading: employeeSearchLoading,
  } = useGetData<ListItemEmployeeData, ItemEmployeeData>(
    ['searchEmployee', createQueryParams(queryParams)],
    isPayroll ? EMPLOYEES_SEARCH : THR_EMPLOYEE_SEARCH,
    {
      params: queryParams,
      normalizer: employeeNormalizer,
    },
  );

  const onFilterChange = (value: Record<string, unknown>) => {
    setQueryParams({
      ...queryParams,
      ...value,
    });
  };

  const { data: divisionOption = [] } = useGetData<SelectItem[], SearchOptions>(
    ['divisionOption'],
    DIVISION_SEARCH,
    {
      normalizer: selectOptionNormalizer,
    },
  );

  const { data: positionOption = [] } = useGetData<SelectItem[], SearchOptions>(
    ['positionOption'],
    POSITION_SEARCH,
    {
      normalizer: selectOptionNormalizer,
    },
  );

  const { data: structuralOption = [] } = useGetData<SelectItem[], SearchOptions>(
    ['structuralOption'],
    STRUCTURAL_SEARCH,
    {
      normalizer: selectOptionNormalizer,
    },
  );

  const handleFilterChange = (key: string, value: string) => {
    onFilterChange({ [key]: value });
  };

  const handleSelectEmployee = (employee: EmployeeData) => {
    setEmployeeSelected((prevEmployeeSelected) => [...prevEmployeeSelected, employee]);
    setEmployeeSearch((prevEmployeeSelected) => [...prevEmployeeSelected, employee]);
    queryParams.excludeIds = [...queryParams.excludeIds, employee.employeeId];
  };

  const filterSelectedEmployee = (data?: EmployeeData[]) => {
    const employee = [...data || employeeSelected];
    setEmployeeSearch(employee.filter((el) => el.employeeName.toLocaleLowerCase()
      .includes(searchSelected.toLocaleLowerCase())));
  };

  const handleDeleteSelectedEmployee = (employee: EmployeeData) => {
    const filtered = queryParams.excludeIds
      .filter((employeeId) => employeeId !== employee.employeeId);
    const filteredEmployee = employeeSelected.filter((el) => el.employeeId !== employee.employeeId);
    setEmployeeSelected(filteredEmployee);
    filterSelectedEmployee(filteredEmployee);
    queryParams.excludeIds = filtered;
  };

  const {
    mutate: mutateSelectEmployees, isLoading: isSubmitting,
  } = usePostData(
    ['selectEmployees'],
    isPayroll ? LIST_EMPLOYEE_BY_ID(id) : SELECT_EMPLOYEES(id),
    {
      options: {
        onSuccess: () => {
          queryParams.excludeIds = [];
          onCloseModal();
        },
        onError: (error) => {
          const { response } = error || {};
          const { data } = response || {};
          const { message } = data || {};
          toaster.error(message || 'Terjadi kesalahan pada server');
        },
      },
    },
  );

  const handleSaveSelectEmployees = () => {
    mutateSelectEmployees(queryParams.excludeIds);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const submitSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onFilterChange({ s: String(search) });
    }
  };

  const handleSearchSelected = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchSelected(e.target.value);
  };

  const submitSearchSelected = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      filterSelectedEmployee();
    }
  };

  const handleAddAllEmployee = () => {
    if (employeeSearchData) {
      queryParams.excludeIds = [
        ...queryParams.excludeIds,
        ...employeeSearchData.listData.map((employee) => employee.employeeId),
      ];
      setEmployeeSelected((prevState) => [...prevState, ...employeeSearchData.listData]);
      setEmployeeSearch((prevState) => [...prevState, ...employeeSearchData.listData]);
    }
  };

  const handleResetSelected = () => {
    queryParams.excludeIds = [];
    setEmployeeSelected([]);
    setEmployeeSearch([]);
    setSearch('');
  };

  const handleCloseModal = () => {
    queryParams.excludeIds = [];
    onCancel();
  };

  return {
    divisionOption,
    employeeLoading,
    employeeSearch,
    employeeSearchData,
    employeeSearchLoading,
    employeeSelected,
    isSubmitting,
    structuralOption,
    positionOption,
    queryParams,
    handleAddAllEmployee,
    handleCloseModal,
    handleDeleteSelectedEmployee,
    handleFilterChange,
    handleResetSelected,
    handleSaveSelectEmployees,
    handleSearch,
    handleSelectEmployee,
    handleSearchSelected,
    submitSearch,
    submitSearchSelected,
  };
};

export default useModalSelectEmployee;
