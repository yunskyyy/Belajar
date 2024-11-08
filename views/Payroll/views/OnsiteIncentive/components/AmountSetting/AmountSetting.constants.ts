import { INITIAL_PAGESIZE } from '@/constants/config';
import type { TableColumn } from '@/types/tables';
import { BUDGET_SETTING_TYPES } from '@/views/Payroll/constants/budgetSettingType';

import type { BudgetSettingQueryParams, BudgetSettingTableProps } from './AmountSetting.types';

export const INIT_QUERY_PARAMS: BudgetSettingQueryParams = {
  type: '',
  projectId: '',
  orderBy: '',
  orderType: '',
  page: 1,
  size: INITIAL_PAGESIZE,
  s: '',
};

const budgetSettingTypeFilterOption = [...BUDGET_SETTING_TYPES];

budgetSettingTypeFilterOption.unshift({ label: 'All', value: '' });

export const TABLE_COLUMNS = (params: BudgetSettingTableProps): TableColumn[] => {
  const {
    projectFilterOption = [],
  } = params;
  return [
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
      name: 'Amount',
      dataKey: 'amountIDR',
      sortable: true,
      sortKey: 'Amount',
    },
  ];
};
