import { INITIAL_PAGESIZE } from '@/constants/config';
import type { TableColumn } from '@/types/tables';

import type { PositionQueryParams, PositionTableProps } from './PositionList.types';

export const INIT_QUERY_PARAMS: PositionQueryParams = {
  divId: '',
  orderBy: '',
  orderType: '',
  page: 1,
  size: INITIAL_PAGESIZE,
  s: '',
};

export const TABLE_COLUMNS = (params: PositionTableProps): TableColumn[] => {
  const {
    divisionFilterOption,
  } = params;
  return [
    {
      name: 'Division',
      dataKey: 'divisionName',
      sortable: true,
      sortKey: 'DivisionName',
      filterKey: 'divId',
      filterOption: divisionFilterOption,
    },
    {
      name: 'Position',
      dataKey: 'name',
      sortable: true,
      sortKey: 'Name',
    },
  ];
};
