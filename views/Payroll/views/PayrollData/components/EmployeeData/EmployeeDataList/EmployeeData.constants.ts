import { INITIAL_PAGESIZE } from '@/constants/config';
import type { TableColumn } from '@/types/tables';

import type { EmployeeDataQueryParams } from './EmployeeData.types';

export const INIT_QUERY_PARAMS: EmployeeDataQueryParams = {
  orderBy: '',
  orderType: '',
  page: 1,
  size: INITIAL_PAGESIZE,
};

export const TABLE_COLUMNS: TableColumn[] = [
  {
    name: 'Employee ID',
    dataKey: 'employeeIdNumber',
    sortable: true,
    sortKey: 'EmployeeIdNumber',
    width: 120,
    sticky: true,
    stickyPosition: 48,
  },
  {
    name: 'Employee Name',
    dataKey: 'employeeName',
    sortable: true,
    sortKey: 'EmployeeName',
    width: 120,
    sticky: true,
    stickyPosition: 180,
  },
  {
    name: 'Component Type',
    dataKey: 'componentTypeName',
    isArrayColumn: true,
    sortable: false,
  },
  {
    name: 'Component Name',
    dataKey: 'componentName',
    isArrayColumn: true,
    sortable: false,
  },
  {
    name: 'Current Amount',
    dataKey: 'amount',
    isArrayColumn: true,
    sortable: false,
    width: 120,
  },
  {
    name: 'New Amount',
    dataKey: 'newAmount',
    isArrayColumn: true,
    sortable: false,
    width: 120,
  },
  {
    name: 'Effective Date',
    dataKey: 'effectiveDate',
    isArrayColumn: true,
    sortable: false,
  },
];

export const PAYROLL_TEMPLATE_COLUMNS = [
  'Employee ID',
  'Employee Name',
  'Type',
  'Effective Date',
];
