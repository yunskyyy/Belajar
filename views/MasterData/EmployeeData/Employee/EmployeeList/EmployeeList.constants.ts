import { INITIAL_PAGESIZE } from '@/constants/config';
import type { TableColumn } from '@/types/tables';

import type { EmployeeQueryParams, EmployeeTableProps } from './EmployeeList.types';

export const INIT_QUERY_PARAMS: EmployeeQueryParams = {
  s: '',
  divisionId: '',
  employmentStatusId: '',
  levelId: '',
  orderBy: '',
  orderType: '',
  positionId: '',
  structuralId: '',
  page: 1,
  size: INITIAL_PAGESIZE,
};

export const TABLE_COLUMNS = (params: EmployeeTableProps): TableColumn[] => {
  const {
    divisionFilterOption = [],
    levelFilterOption = [],
    positionFilterOption = [],
    statusFilterOption = [],
    structuralFilterOption = [],
  } = params;
  return [
    {
      name: 'Employee ID',
      dataKey: 'employeeIdNumber',
      sortable: true,
      sortKey: 'EmployeeIdNumber',
      width: 100,
      sticky: true,
      stickyPosition: 48,
    },
    {
      name: 'Employee Name',
      dataKey: 'fullname',
      dataType: 'action-detail',
      sortable: true,
      sortKey: 'Fullname',
      width: 200,
      sticky: true,
      stickyPosition: 180,
    },
    {
      name: 'Division',
      dataKey: 'divisionName',
      sortable: true,
      sortKey: 'DivisionName',
      filterKey: 'divisionId',
      filterOption: divisionFilterOption,
    },
    {
      name: 'Position',
      dataKey: 'positionName',
      sortable: true,
      sortKey: 'PositionName',
      filterKey: 'positionId',
      filterOption: positionFilterOption,
    },
    {
      name: 'Structural Title',
      dataKey: 'structuralName',
      sortable: true,
      width: 150,
      sortKey: 'StructuralName',
      filterKey: 'structuralId',
      filterOption: structuralFilterOption,
    },
    {
      name: 'Level',
      dataKey: 'levelName',
      sortable: true,
      sortKey: 'LevelName',
      filterKey: 'levelId',
      filterOption: levelFilterOption,
    },
    {
      name: 'Employment Status',
      dataKey: 'employmentStatusName',
      sortable: true,
      sortKey: 'EmploymentStatusName',
      filterKey: 'employmentStatusId',
      filterOption: statusFilterOption,
    },
  ];
};
