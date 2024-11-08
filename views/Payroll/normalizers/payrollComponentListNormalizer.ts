import { formatDate } from '@/utils';

import type { PayrollComponentData, PayrollComponentList } from '../types/payrollComponent';

const payrollComponentListNormalizer = (data: PayrollComponentList): PayrollComponentList => {
  const {
    items, hasNextPage, page, pageSize,
  } = data || {};

  const listData = (items || []).map(
    (el): PayrollComponentData => ({
      componentId: el.componentId || '',
      name: el.name || '',
      typeId: el.typeId || '',
      typeName: el.typeName || '',
      asOvertime: el.asOvertime || false,
      asHolidayAllowance: el.asHolidayAllowance || false,
      asTakeHomePay: el.asTakeHomePay || false,
      createdBy: el.createdBy || '',
      createdByName: el.createdByName || '',
      createdByFullName: el.createdByFullName || '',
      createdAt: el.createdAt ? formatDate(el.createdAt) : '',
      lastUpdatedBy: el.lastUpdatedBy || '',
      lastUpdatedByName: el.lastUpdatedByName || '',
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

export default payrollComponentListNormalizer;
