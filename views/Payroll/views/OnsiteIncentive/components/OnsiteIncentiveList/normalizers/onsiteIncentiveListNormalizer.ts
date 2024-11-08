import BudgetSettingType from '@/enums/budgetSettingType';
import { formatDate, toIDR } from '@/utils';

import type { OnsiteIncentiveData, OnsiteIncentives } from '../OnsiteIncentiveList.types';

const onsiteIncentiveListNormalizer = (data: OnsiteIncentives): OnsiteIncentives => {
  const {
    items, hasNextPage, page, pageSize,
  } = data || {};

  const listData = (items || []).map(
    (el): OnsiteIncentiveData => ({
      onsiteExpenseId: el.onsiteExpenseId || '',
      employeeId: el.employeeId || '',
      employeeIdNumber: el.employeeIdNumber || '',
      employeeName: el.employeeName || '',
      position: el.position || 0,
      type: el.type || 0,
      typeName: BudgetSettingType[el.type],
      amount: el.amount || 0,
      amountIDR: toIDR(el.amount || 0),
      projectId: el.projectId || '',
      projectCode: el.projectCode || '',
      projectName: el.projectName || '',
      startDate: el.startDate ? el.startDate : '',
      endDate: el.endDate ? el.endDate : '',
      startDateDisplay: el.startDate ? formatDate(el.startDate) : '',
      endDateDisplay: el.endDate ? formatDate(el.endDate) : '',
      paymentScheduleDate: el.paymentScheduleDate ? formatDate(el.paymentScheduleDate) : '',
      totalDays: el.totalDays || 0,
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

export default onsiteIncentiveListNormalizer;
