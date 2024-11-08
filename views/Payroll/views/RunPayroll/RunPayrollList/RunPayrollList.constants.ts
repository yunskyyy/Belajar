import { INITIAL_PAGESIZE } from '@/constants/config';
import RunPayrollStatus from '@/enums/RunPayrollStatus';
import type { TableColumn } from '@/types/tables';

import type { RunPayrollQueryParams } from './RunPayrollList.types';

const runThrStatusValue = Object.keys(RunPayrollStatus).filter((v) => !Number.isNaN(Number(v)));
const STATUS_OPTION = runThrStatusValue.map((val) => ({
  label: RunPayrollStatus[Number(val)],
  value: val,
}));

STATUS_OPTION.unshift({ label: 'All', value: '' });

export const TABLE_COLUMNS: TableColumn[] = [
  {
    name: 'Payroll Period',
    dataKey: 'periodDate',
    sortable: true,
    sortKey: 'PeriodDate',
    filterKey: 'period',
    filterType: 'date',
    dateViews: ['month', 'year'],
    width: 150,
  },
  {
    name: 'Payment Schedule',
    dataKey: 'paymentScheduleDate',
    sortable: true,
    sortKey: 'PaymentScheduleDate',
    filterKey: 'schedule',
    filterType: 'date',
    width: 150,
  },
  {
    name: 'Employees',
    dataKey: 'totalEmployees',
    sortable: true,
    sortKey: 'TotalEmployees',
    width: 75,
  },
  {
    name: 'Amount',
    dataKey: 'totalAmount',
    sortable: true,
    sortKey: 'TotalAmount',
    dataType: 'element',
    width: 150,
  },
  {
    name: 'Salary Detail',
    dataType: 'action-detail',
    disableKey: 'disableDownload',
    dataKey: 'download',
    sortable: false,
  },
  {
    name: 'Status',
    dataType: 'status',
    dataKey: 'status',
    sortable: true,
    sortKey: 'Status',
    filterKey: 'status',
    filterOption: STATUS_OPTION,
  },
];

export const INIT_QUERY_PARAMS: RunPayrollQueryParams = {
  orderBy: '',
  orderType: '',
  page: 1,
  size: INITIAL_PAGESIZE,
};
