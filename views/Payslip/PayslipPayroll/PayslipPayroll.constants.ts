import type { TableColumn } from '@/types/tables';

// eslint-disable-next-line import/prefer-default-export
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
];
