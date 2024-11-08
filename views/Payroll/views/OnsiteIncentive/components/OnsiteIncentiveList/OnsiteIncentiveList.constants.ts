import { INITIAL_PAGESIZE } from '@/constants/config';
import type { TableColumn } from '@/types/tables';
import { BUDGET_SETTING_TYPES } from '@/views/Payroll/constants/budgetSettingType';

import type { OnsiteIncentiveQueryParams, OnsiteIncentiveTableProps } from './OnsiteIncentiveList.types';

export const INIT_QUERY_PARAMS: OnsiteIncentiveQueryParams = {
  endDate: '',
  name: '',
  paymentScheduleDate: '',
  startDate: '',
  type: '',
  projectId: '',
  orderBy: '',
  orderType: '',
  page: 1,
  size: INITIAL_PAGESIZE,
};

const budgetSettingTypeFilterOption = [...BUDGET_SETTING_TYPES];

budgetSettingTypeFilterOption.unshift({ label: 'All', value: '' });

export const TABLE_COLUMNS = (params: OnsiteIncentiveTableProps): TableColumn[] => {
  const {
    projectFilterOption = [],
  } = params;
  return [
    {
      name: 'Employee ID',
      dataKey: 'employeeIdNumber',
      sortable: true,
      sortKey: 'EmployeeIncrementNumber',
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
      stickyPosition: 200,
    },
    {
      name: 'Type',
      dataKey: 'typeName',
      sortable: true,
      sortKey: 'Type',
      filterKey: 'type',
      filterOption: budgetSettingTypeFilterOption,
    },
    {
      name: 'Project Code',
      dataKey: 'projectCode',
      sortable: true,
      sortKey: 'ProjectCode',
      filterKey: 'projectId',
      filterOption: projectFilterOption,
      searchable: true,
    },
    {
      name: 'Start Date',
      dataKey: 'startDateDisplay',
      sortable: true,
      sortKey: 'StartDate',
      filterKey: 'startDate',
      filterType: 'date',
      width: 180,
    },
    {
      name: 'End Date',
      dataKey: 'endDateDisplay',
      sortable: true,
      sortKey: 'EndDate',
      filterKey: 'endDate',
      filterType: 'date',
      width: 180,
    },
    {
      name: 'Total Days',
      dataKey: 'totalDays',
      sortable: true,
      sortKey: 'TotalDays',
    },
    {
      name: 'Amount',
      dataKey: 'amountIDR',
      sortable: true,
      sortKey: 'Amount',
      width: 120,
    },
    {
      name: 'Payment Schedule',
      dataKey: 'paymentScheduleDate',
      sortable: true,
      sortKey: 'PaymentScheduleDate',
      filterKey: 'paymentScheduleDate',
      filterType: 'date',
      width: 150,
    },
  ];
};

export const INIT_FORM = {
  amount: 0,
  type: '0',
  startDate: '',
  endDate: '',
  projectId: '',
  employeeId: '',
  id: '',
};
