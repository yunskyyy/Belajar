import RunThrStatus from '@/enums/RunThrStatus';
import type { TableColumn } from '@/types/tables';

/* eslint-disable import/prefer-default-export */
const runPayrollStatusValue = Object.keys(RunThrStatus).filter((v) => !Number.isNaN(Number(v)));
const STATUS_OPTION = runPayrollStatusValue.map((val) => ({
  label: RunThrStatus[Number(val)],
  value: val,
}));

STATUS_OPTION.unshift({ label: 'All', value: '' });

export const TABLE_COLUMNS: TableColumn[] = [
  {
    name: 'THR Period',
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
    name: 'THR Detail',
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
