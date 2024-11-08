import type { TableColumn } from '@/types/tables';

import type { PayrollComponentTableProps } from './PayrollComponent.types';

// eslint-disable-next-line import/prefer-default-export
export const TABLE_COLUMNS = (params: PayrollComponentTableProps): TableColumn[] => {
  const {
    componentTypeFilterOption = [],
  } = params;
  return [
    {
      name: 'Component Type',
      dataKey: 'typeName',
      sortable: true,
      sortKey: 'TypeName',
      filterKey: 'typeId',
      filterOption: componentTypeFilterOption,
    },
    {
      name: 'Component Name',
      dataKey: 'name',
      sortable: true,
      sortKey: 'Name',
    },
  ];
};
