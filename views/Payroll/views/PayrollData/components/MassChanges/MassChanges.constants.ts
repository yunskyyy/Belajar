import { INITIAL_PAGESIZE } from '@/constants/config';
import type { TableColumn } from '@/types/tables';

import type { EmployeeDataQueryParams } from './MassChanges.types';

export const INIT_QUERY_PARAMS: EmployeeDataQueryParams = {
  orderBy: '',
  orderType: '',
  page: 1,
  size: INITIAL_PAGESIZE,
};

export const TABLE_COLUMNS: TableColumn[] = [
  {
    name: 'Change ID',
    dataKey: 'changeIdNumber',
    sortable: true,
    sortKey: 'changeIdNumber',
    width: 120,
    sticky: true,
    stickyPosition: 48,
  },
  {
    name: 'Type',
    dataKey: 'type',
    sortable: true,
    sortKey: 'Type',
    width: 120,
    sticky: true,
    stickyPosition: 200,
  },
  {
    name: 'Effective Date',
    dataKey: 'effectiveDate',
    sortable: true,
    sortKey: 'EffectiveDate',
  },
  {
    name: 'Created By',
    dataKey: 'createdByName',
    sortable: true,
    sortKey: 'CreatedByName',
  },
  {
    name: 'Description',
    dataKey: 'amount',
    sortable: true,
    width: 120,
    sortKey: 'CurrentAmount',
  },
  {
    name: 'Total Employees',
    dataKey: 'totalEmployees',
    sortable: true,
    width: 120,
    sortKey: 'TotalEmployees',
  },
  {
    name: 'Component Changes',
    dataKey: 'componentChanges',
    sortable: true,
    width: 120,
    sortKey: 'ComponentChanges',
  },
];
