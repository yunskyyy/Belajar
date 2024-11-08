import { useRouter } from 'next/navigation';

import { ENDPOINT } from '@/constants/apiURL';
import useGetData from '@/hooks/useGetData';
import useQueryParams from '@/hooks/useQueryParams';
import { createQueryParams } from '@/utils';

import listEmployeeSummaryNormalizer from './normalizers/listEmployeeDataSummaryNormalizer';
import { INIT_QUERY_PARAMS, LIST_EMPLOYEE_COLUMNS } from './RunPayrollDetail.constants';
import type { WidgetSummary } from './RunPayrollDetail.types';

const useRunPayrollDetail = ({ id }: { id:string }) => {
  const { DISBURSEMENT_MGMT } = ENDPOINT;
  const { LIST_EMPLOYEE_BY_ID, WIDGET_SUMMARY } = DISBURSEMENT_MGMT;

  const router = useRouter();

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
  } = useGetData<WidgetSummary>(
    ['widgetSummary'],
    WIDGET_SUMMARY(id),
  );

  const {
    data: listEmployee,
    isFetching: employeeLoading,
  } = useGetData(
    ['listEmployee', createQueryParams(queryParams)],
    LIST_EMPLOYEE_BY_ID(id),
    {
      params: queryParams,
      normalizer: listEmployeeSummaryNormalizer,
    },
  );

  const tableColumns = LIST_EMPLOYEE_COLUMNS;
  const handleBack = () => {
    router.push('/payroll/disbursement/run-payroll');
  };

  return {
    widgetSummary,
    summaryLoading,
    tableColumns,
    listEmployee,
    employeeLoading,
    queryParams,
    handleBack,
    onPageSizeChange,
    onPageChange,
    onSearchChange,
    onSortChange,
  };
};

export default useRunPayrollDetail;
