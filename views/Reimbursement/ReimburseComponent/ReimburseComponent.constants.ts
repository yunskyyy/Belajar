import type { TableColumn } from '@/types/tables';

// eslint-disable-next-line import/prefer-default-export
export const TABLE_COLUMNS: TableColumn[] = [
  {
    name: 'Category',
    dataKey: 'categoryName',
    sortable: true,
    sortKey: 'name',
  },
  {
    name: 'Types',
    dataKey: 'types',
    sortable: true,
    sortKey: 'reimbursementTypes',
  },
];
