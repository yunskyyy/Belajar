import type { TableColumn } from '@/types/tables';

export const PAYROLL_DATA_MIME_TYPE = [
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'text/csv',
];

export const TABLE_COLUMN: TableColumn[] = [
  {
    name: 'Employee ID',
    dataKey: 'employeeId',
    sortable: false,
    width: 120,
    sticky: true,
    stickyPosition: 48,
  },
  {
    name: 'Employee Name',
    dataKey: 'employeeName',
    sortable: false,
    width: 120,
    sticky: true,
    stickyPosition: 200,
  },
  {
    name: 'Type',
    dataKey: 'type',
    sortable: false,
  },
  {
    name: 'Component Type',
    dataKey: 'componentType',
    sortable: false,
  },
  {
    name: 'Component Name',
    dataKey: 'componentName',
    sortable: false,
  },
  {
    name: 'Current Amount',
    dataKey: 'currentAmount',
    sortable: false,
  },
  {
    name: 'New Amount',
    dataKey: 'newAmount',
    sortable: false,
  },
  {
    name: 'Effective Date',
    dataKey: 'effectiveDate',
    sortable: false,
  },
];
