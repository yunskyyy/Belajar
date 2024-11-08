import { format } from 'date-fns';

import type { PayslipData, PayslipList } from '../PayslipPayroll.types';

const payslipListNormalizers = (data: PayslipList): PayslipList => {
  const {
    items, hasNextPage, page, pageSize,
  } = data || {};

  const listData = (items || []).map(
    (el): PayslipData => ({
      payrollDisbursementId: el.payrollDisbursementId || '',
      periodDate: el.periodDate ? format(new Date(el.periodDate), 'MMMM yyyy') : '',
      paymentScheduleDate: el.paymentScheduleDate ? format(new Date(el.paymentScheduleDate), 'dd/MM/yyyy') : '',
      description: el.description || '',
      totalEmployees: el.totalEmployees || 0,
      createdBy: el.createdBy || '',
      createdByFullName: el.createdByFullName || '',
      createdAt: el.createdAt ? new Date(el.createdAt).toLocaleDateString() : '',
      lastUpdatedBy: el.lastUpdatedBy || '',
      lastUpdatedByFullName: el.lastUpdatedByFullName || '',
      lastUpdatedAt: el.lastUpdatedAt ? new Date(el.lastUpdatedAt).toLocaleDateString() : '',
    }),
  );

  return {
    items: listData,
    hasNextPage,
    page,
    pageSize,
  };
};

export default payslipListNormalizers;
