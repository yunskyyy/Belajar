import { useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';

import { ENDPOINT } from '@/constants/apiURL';
import useGetData from '@/hooks/useGetData';
import useQueryParams from '@/hooks/useQueryParams';
import { createQueryParams } from '@/utils';
import cutOffPeriodPayrollNormalizer from '@/views/Payroll/normalizers/cutOffPeriodNormalizer';
import type { ComponentData, RunPayrollComponentProps } from '@/views/Payroll/types/runPayrollFormComponents';
import type {
  CutOffPeriod,
} from '@/views/Payroll/views/RunPayroll/RunPayrollForm/components/PayrollPeriod/PayrollPeriod.types';

import detailRunPayrollNormalizer from '../../normalizers/detailRunPayrollNormalizer';
import type { DetailRunPayroll } from '../../types/detailRunPayroll';

import listEmployeeNormalizer from './normalizers/listEmployeeDataFormNormalizer';
import { INIT_QUERY_PARAMS, LIST_EMPLOYEE_COLUMNS, TABLE_COLUMNS_EDIT_THR } from './EmployeeDataForm.constants';
import type { WidgetSummary } from './EmployeeDataForm.types';

const useEmployeeDataForm = (props: RunPayrollComponentProps) => {
  const { id = '' } = props;
  const pathname = usePathname();
  const [openForm, setOpenForm] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalComponent, setOpenModalComponent] = useState(false);
  const isPayroll = useMemo(() => pathname.includes('run-payroll'), [pathname]);
  const [modalEmployeeId, setModalEmployeeId] = useState('');

  const { DISBURSEMENT_MGMT } = ENDPOINT;
  const {
    LIST_EMPLOYEE_BY_ID,
    WIDGET_SUMMARY,
    RUN_PAYROLL_BY_ID,
    COMPONENT_EXISTING,
    CUT_OFF_PERIOD,
  } = DISBURSEMENT_MGMT;

  const {
    queryParams,
    onPageSizeChange,
    onPageChange,
    onSearchChange,
    onSortChange,
  } = useQueryParams(INIT_QUERY_PARAMS, { replaceURL: false });

  const {
    data: widgetSummary,
    isFetching: summaryLoading,
    refetch: refetchWidget,
  } = useGetData<WidgetSummary>(
    ['widgetSummary'],
    WIDGET_SUMMARY(id),
  );

  const {
    data: listEmployee,
    isFetching: employeeLoading,
    refetch: refetchListEmployee,
  } = useGetData(
    ['listEmployee', createQueryParams(queryParams)],
    LIST_EMPLOYEE_BY_ID(id),
    {
      params: queryParams,
      normalizer: listEmployeeNormalizer,
    },
  );

  const tableColumns = LIST_EMPLOYEE_COLUMNS;

  const tableColumsEdit = TABLE_COLUMNS_EDIT_THR;

  const {
    data: dataRunPayroll, isFetching: dataRunPayrollLoading,
    refetch: refetchDetail,
  } = useGetData<DetailRunPayroll>(
    ['detail-Payroll'],
    RUN_PAYROLL_BY_ID(String(id)),
    {
      normalizer: detailRunPayrollNormalizer,
    },
  );

  const {
    totalEmployees = 0,
    periodDate = '',
  } = dataRunPayroll || {};

  const {
    data: cutOffPeriod,
  } = useGetData<CutOffPeriod>(
    ['cutOffPeriod-Payroll'],
    CUT_OFF_PERIOD,
    {
      params: {
        period: periodDate,
      },
      options: {
        enabled: !!periodDate,
      },
      normalizer: cutOffPeriodPayrollNormalizer,
    },
  );

  const {
    data: componentExisting,
    refetch: refetchComponentExisting,
  } = useGetData<ComponentData[]>(
    ['componentExisting'],
    COMPONENT_EXISTING(id),
    {
      options: {
        enabled: totalEmployees > 0,
      },
    },
  );

  const handleOpenModalComponent = () => {
    setOpenModalComponent(true);
  };

  const handleOpenForm = () => {
    setOpenForm(true);
  };

  const handleOpenModalEdit = (employeeId:string) => {
    setOpenModalEdit(true);
    setModalEmployeeId(employeeId);
  };

  const handleCloseModalEdit = () => {
    setOpenModalEdit(false);
    refetchListEmployee();
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  const handleCloseModalComponent = () => {
    setOpenModalComponent(false);
  };

  const invalidateQueries = () => {
    refetchListEmployee();
    refetchWidget();
    refetchDetail();
    refetchComponentExisting();
  };

  return {
    componentExisting,
    dataRunPayroll,
    dataRunPayrollLoading,
    employeeLoading,
    isPayroll,
    listEmployee,
    modalEmployeeId,
    openForm,
    openModalComponent,
    openModalEdit,
    queryParams,
    summaryLoading,
    tableColumns,
    tableColumsEdit,
    widgetSummary,
    cutOffPeriod,
    handleCloseForm,
    handleCloseModalComponent,
    handleCloseModalEdit,
    handleOpenForm,
    handleOpenModalComponent,
    handleOpenModalEdit,
    invalidateQueries,
    onPageChange,
    onPageSizeChange,
    onSearchChange,
    onSortChange,
  };
};

export default useEmployeeDataForm;
