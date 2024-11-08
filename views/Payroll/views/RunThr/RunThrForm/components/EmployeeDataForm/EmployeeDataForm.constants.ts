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
    sortKey: 'Position',
    width: 150,
  },
  {
    name: 'Employee Name',
    dataKey: 'employeeName',
    sortable: true,
    sortKey: 'EmployeeName',
    width: 250,
  },
  {
    name: 'Length of Service',
    dataKey: 'workingPeriode',
    sortable: true,
    sortKey: 'JoinDate',
    width: 200,
  },
  {
    name: 'Salary',
    dataKey: 'salary',
    sortable: true,
    sortKey: 'TotalSalary',
    width: 150,
  },
  {
    name: 'Allowance',
    dataKey: 'allowance',
    sortable: true,
    sortKey: 'TotalAllowance',
    width: 150,
  },
  {
    name: 'Benefit',
    dataKey: 'benefit',
    sortable: true,
    sortKey: 'TotalBenefit',
    width: 150,
  },
  {
    name: 'Total',
    dataKey: 'totalPayment',
    sortable: true,
    sortKey: 'Total',
    dataType: 'element',
    width: 150,
  },
];

export const THR_COMPONENT_TYPE = {
  SALARY: 'Salary',
  ALLOWANCE: 'Allowance',
  BENEFIT: 'Benefit',
};

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

export const HIDEABLE_COLUMNS = ['salary', 'benefit', 'allowance'] as const;
