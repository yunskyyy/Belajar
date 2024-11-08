import { useState } from 'react';

import { ENDPOINT } from '@/constants/apiURL';
import useGetData from '@/hooks/useGetData';
import useQueryParams from '@/hooks/useQueryParams';
import { createQueryParams } from '@/utils';
import type { DataEmployeeRunThr } from '@/views/Payroll/types/runPayrollFormComponents';

import type { RunThrComponentProps } from '../../types/runThrType';

import detailRunThrNormalizer from './normalizers/detailRunThrNormalizer';
import listEmployeeRunThrNormalizer from './normalizers/listEmployeeRunThrNormalizer';
import { INIT_QUERY_PARAMS, LIST_EMPLOYEE_COLUMNS, TABLE_COLUMNS_EDIT_THR } from './EmployeeDataForm.constants';
import type { DetailRunThr, WidgetSummary } from './EmployeeDataForm.types';

const useEmployeeDataForm = (props: RunThrComponentProps) => {
  const { id = '' } = props;
  const [openForm, setOpenForm] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [modalEmployeeId, setModalEmployeeId] = useState('');
  const { RUN_THR_MGMT } = ENDPOINT;
  const {
    RUN_THR_BY_ID,
    RUN_THR_EMPLOYEE_BY_ID,
    RUN_THR_WIDGET,
  } = RUN_THR_MGMT;

  const {
    queryParams,
    onFilterChange,
    onSearchChange,
    onPageChange,
    onSortChange,
    onPageSizeChange,
  } = useQueryParams(INIT_QUERY_PARAMS, { replaceURL: false });

  const {
    data: detailRunThr,
    isLoading: isLoadingDetail,
    refetch: refetchDetail,
  } = useGetData<DetailRunThr>(
    ['detailRunThr'],
    RUN_THR_BY_ID(id),
    {
      normalizer: detailRunThrNormalizer,
    },
  );

  const {
    data: widgetSummary,
    isLoading: isLoadingWidget,
    refetch: refetchWidget,
  } = useGetData<WidgetSummary>(
    ['wdigetThr'],
    RUN_THR_WIDGET(id),
  );

  const {
    data: dataListEmployee,
    isLoading,
    refetch: refetchListEmployee,
  } = useGetData(
    ['listEmployeeRunThr', createQueryParams(queryParams)],
    RUN_THR_EMPLOYEE_BY_ID(id),
    {
      normalizer: listEmployeeRunThrNormalizer,
      params: queryParams,
    },
  );

  const handleOpenForm = () => {
    setOpenForm(true);
  };

  const handleOpenModalEdit = (component: DataEmployeeRunThr) => {
    setModalEmployeeId(component.id);
    setOpenModalEdit(true);
  };

  const handleCloseModalEdit = () => {
    setOpenModalEdit(false);
    refetchWidget();
    refetchListEmployee();
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    refetchDetail();
    refetchWidget();
    refetchListEmployee();
  };

  const handleChangeTab = (tabIndex: number) => setTabValue(tabIndex);

  const tableColumns = LIST_EMPLOYEE_COLUMNS;

  const tableColumsEdit = TABLE_COLUMNS_EDIT_THR;

  return {
    tableColumns,
    tableColumsEdit,
    handleOpenForm,
    handleCloseForm,
    openForm,
    openModalEdit,
    handleOpenModalEdit,
    handleCloseModalEdit,
    handleChangeTab,
    tabValue,
    detailRunThr,
    isLoadingDetail,
    dataListEmployee,
    isLoading,
    queryParams,
    onFilterChange,
    onSearchChange,
    onPageChange,
    onSortChange,
    onPageSizeChange,
    widgetSummary,
    isLoadingWidget,
    modalEmployeeId,
  };
};

export default useEmployeeDataForm;
