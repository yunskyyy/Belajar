import { INITIAL_PAGESIZE } from '@/constants/config';
import type { TableColumn } from '@/types/tables';

import type { LevelQueryParams, LevelTableProps } from './LevelList.types';

export const INIT_QUERY_PARAMS: LevelQueryParams = {
  posId: '',
  levId: '',
  orderBy: '',
  orderType: '',
  page: 1,
  size: INITIAL_PAGESIZE,
  s: '',
};
export const TABLE_COLUMNS = (params: LevelTableProps): TableColumn[] => {
  const {
    levelTypeFilterOption = [],
  } = params;
  return [
    {
      name: 'Level Type',
      dataKey: 'levelType',
      sortable: true,
      sortKey: 'LevelType',
      filterKey: 'levelTypeId',
      filterOption: levelTypeFilterOption,
    },
    {
      name: 'Level',
      dataKey: 'name',
      sortable: true,
      sortKey: 'Name',
    },
  ];
};
