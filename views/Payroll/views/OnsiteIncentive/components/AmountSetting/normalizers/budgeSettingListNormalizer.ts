import BudgetSettingType from '@/enums/budgetSettingType';
import { formatDate, toIDR } from '@/utils';

import type { BudgetSettingData, BudgetSettingList } from '../AmountSetting.types';

const budgeSettingListNormalizer = (data: BudgetSettingList): BudgetSettingList => {
  const {
    items, hasNextPage, page, pageSize,
  } = data || {};

  const listData = (items || []).map(
    (el): BudgetSettingData => ({
      budgetSettingId: el.budgetSettingId || '',
      type: el.type || 0,
      typeName: BudgetSettingType[el.type],
      amount: el.amount || 0,
      amountIDR: toIDR(el.amount || 0),
      projectId: el.projectId || '',
      projectCode: el.projectCode || '',
      projectName: el.projectName || '',
      createdBy: el.createdBy || '',
      createdByFullName: el.createdByFullName || '',
      createdAt: el.createdAt ? formatDate(el.createdAt) : '',
      lastUpdatedBy: el.lastUpdatedBy || '',
      lastUpdatedByFullName: el.lastUpdatedByFullName || '',
      lastUpdatedAt: el.lastUpdatedAt ? formatDate(el.lastUpdatedAt) : '',
    }),
  );

  return {
    items: listData,
    hasNextPage,
    page,
    pageSize,
  };
};

export default budgeSettingListNormalizer;
