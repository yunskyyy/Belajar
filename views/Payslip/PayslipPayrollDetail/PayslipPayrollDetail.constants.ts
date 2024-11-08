import type { TableColumn } from '@/types/tables';

// eslint-disable-next-line import/prefer-default-export
export const TABLE_COLUMNS: TableColumn[] = [
  {
    name: 'Employee ID',
    dataKey: 'employeeNumber',
    sortable: true,
    sortKey: 'EmployeeNumber',
  },
  {
    name: 'Employee Name',
    dataKey: 'fullname',
    sortable: true,
    sortKey: 'Fullname',
    width: 150,
  },
];
