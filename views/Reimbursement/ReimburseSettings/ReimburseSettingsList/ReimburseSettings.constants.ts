import type { TableColumn } from '@/types/tables';

import type {
  ReimburseSettingsTableProps,
} from './ReimburseSettings.types';

// eslint-disable-next-line import/prefer-default-export
export const TABLE_COLUMNS = (params: ReimburseSettingsTableProps): TableColumn[] => {
  const {
    categoryFilterOption = [],
    typeFilterOption = [],
  } = params;
  return [
    {
      name: 'Category',
      dataKey: 'categoryName',
      sortable: true,
      sortKey: 'name',
      filterKey: 'categoryId',
      filterOption: categoryFilterOption,
    },
    {
      name: 'Types',
      dataKey: 'typeName',
      sortable: true,
      sortKey: 'typeName',
      filterKey: 'typeId',
      filterOption: typeFilterOption,
    },
    {
      name: 'Effective Date',
      dataKey: 'effectiveDate',
      sortable: true,
      sortKey: 'effectiveDate',
      filterKey: 'effectiveDate',
      filterType: 'date',
    },
    {
      name: 'Approver Line 1',
      dataKey: 'approvalLine1',
      sortable: true,
      sortKey: 'approvalLine1',
    },
    {
      name: 'Approver Line 2',
      dataKey: 'approvalLine2',
      sortable: true,
      sortKey: 'approvalLine2',
    },
  ];
};
