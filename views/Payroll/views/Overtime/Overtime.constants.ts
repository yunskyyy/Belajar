import { INITIAL_PAGESIZE } from '@/constants/config';
import OvertimeExpenseType from '@/enums/OvertimeExpenseType';
import type { TableColumn } from '@/types/tables';
import { formatDateApi } from '@/utils';

import type { OvertimeQueryParams, OvertimeTableProps } from './Overtime.types';

const overtimeTypeValues = Object.keys(OvertimeExpenseType).filter((v) => !Number.isNaN(Number(v)));
const OVERTIME_OPTION = overtimeTypeValues.map((val) => ({
  label: OvertimeExpenseType[Number(val)],
  value: val,
}));

OVERTIME_OPTION.unshift({ label: 'All', value: '' });

export const TABLE_COLUMNS = (params: OvertimeTableProps): TableColumn[] => {
  const {
    projectCodeFilterOption,
    teamNameFilterOption,
  } = params;

  return [
    {
      name: 'Overtime Date',
      dataKey: 'date',
      sortable: true,
      sortKey: 'OvertimeDt',
      sticky: true,
      stickyPosition: 48,
      width: 150,
    },
    {
      name: 'Employee ID',
      dataKey: 'employeeIdNumber',
      sortable: true,
      sortKey: 'EmployeeIncrementNumber',
      sticky: true,
      stickyPosition: 230,
    },
    {
      name: 'Employee Name',
      dataKey: 'employeeName',
      sortable: true,
      sortKey: 'EmployeeName',
      width: 100,
    },
    {
      name: 'Project Code',
      dataKey: 'projectCode',
      sortable: true,
      sortKey: 'ProjectCode',
      filterKey: 'projectId',
      filterOption: projectCodeFilterOption,
      searchable: true,
    },
    {
      name: 'Team Name',
      dataKey: 'teamName',
      sortable: true,
      sortKey: 'TeamName',
      filterKey: 'teamId',
      filterOption: teamNameFilterOption,
      width: 150,
    },
    {
      name: 'Overtime Hours',
      dataKey: 'hours',
      sortable: true,
      sortKey: 'Hours',
    },
    {
      name: 'Overtime Type',
      dataKey: 'type',
      sortable: true,
      sortKey: 'Type',
      filterKey: 'type',
      filterOption: OVERTIME_OPTION,
    },
    {
      name: 'Amount',
      dataKey: 'amountIDR',
      sortable: true,
      sortKey: 'Amount',
    },
    {
      name: 'Payment Schedule',
      dataKey: 'schedulePaymentDate',
      sortable: true,
      sortKey: 'SchedulePaymentDate',
    },
  ];
};

export const INIT_QUERY_PARAMS: OvertimeQueryParams = {
  endDt: '',
  name: '',
  orderBy: '',
  orderType: '',
  page: 1,
  size: INITIAL_PAGESIZE,
  startDt: '',
  typeId: '',
};

export const INIT_FORM = {
  overtimeExpenseId: '',
  date: formatDateApi(new Date()),
  amount: 0,
  employeeId: '',
  projectId: '',
  teamId: '',
};

export const OVERTIME_TEMPLATE_COLUMNS = [
  'Month',
  'Year',
  'Employee ID',
  'Employee Name',
  'Project Code',
  'Team Name',
  'Overtime Hours',
];
