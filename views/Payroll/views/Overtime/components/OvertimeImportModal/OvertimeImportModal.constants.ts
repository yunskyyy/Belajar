import type { TableColumn } from '@/types/tables';

// eslint-disable-next-line import/prefer-default-export
export const TABLE_COLUMN: TableColumn[] = [
  {
    name: 'Overtime Date',
    dataKey: 'date',
    sortable: false,
  },
  {
    name: 'Employee ID',
    dataKey: 'employeeId',
    sortable: false,
  },
  {
    name: 'Project Code',
    dataKey: 'projectCode',
    sortable: false,
  },
  {
    name: 'Team Name',
    dataKey: 'teamCode',
    sortable: false,
  },
  {
    name: 'Overtime Hours',
    dataKey: 'totalHours',
    sortable: false,
  },
];
