import type { TableColumn } from '@/types/tables';

export const TABLE_COLUMNS_EDIT_THR: TableColumn[] = [
  {
    name: 'Component Name',
    dataKey: 'componentName',
    sortable: false,
  },
  {
    name: 'Amount',
    dataKey: 'amount',
    sortable: false,
  },
];

export const LIST_EMPLOYEE_COLUMNS: TableColumn[] = [
  {
    name: 'Employee ID',
    dataKey: 'employeeId',
    sortable: true,
    sortKey: 'EmployeeId',
    width: 150,
    sticky: true,
    stickyPosition: 48,
  },
  {
    name: 'Employee Name',
    dataKey: 'employeeName',
    sortable: true,
    sortKey: 'EmployeeName',
    width: 200,
    sticky: true,
    stickyPosition: 200,
  },
  {
    name: 'Additional Earnings',
    dataKey: 'earning',
    sortable: true,
    sortKey: 'AdditionalEarnings',
    width: 150,
  },
  {
    name: 'Deduction',
    dataKey: 'componentDeduction',
    sortable: true,
    sortKey: 'Deduction',
    width: 150,
  },
  {
    name: 'Salary',
    dataKey: 'salary',
    sortable: true,
    sortKey: 'ComponentSalary',
    width: 150,
  },
  {
    name: 'Allowance',
    dataKey: 'allowance',
    sortable: true,
    sortKey: 'ComponentAllowance',
    width: 150,
  },
  {
    name: 'Benefit',
    dataKey: 'benefit',
    sortable: true,
    sortKey: 'ComponentBenefit',
    width: 150,
  },
  {
    name: 'Total',
    dataKey: 'totalSalary',
    sortable: true,
    sortKey: 'Total',
    dataType: 'element',
    width: 150,
  },
];

export const INIT_QUERY_PARAMS = {
  s: '',
  page: 1,
  size: 50,
  orderType: '',
  orderBy: '',
  divisionId: '',
  levelId: '',
  positionId: '',
  structuralId: '',
};
