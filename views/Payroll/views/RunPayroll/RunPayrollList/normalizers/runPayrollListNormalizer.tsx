import { format } from 'date-fns';

import { toIDR } from '@/utils';

import type { RunPayrollData, RunPayrollList } from '../RunPayrollList.types';

const runPayrollListNormalizer = (data: RunPayrollList): RunPayrollList => {
  const {
    items, hasNextPage, page, pageSize,
  } = data || {};

  const listData = (items || []).map(
    (el): RunPayrollData => ({
      payrollDisbursementId: el.payrollDisbursementId || '',
      periodDate: el.periodDate ? format(new Date(el.periodDate), 'MMMM yyyy') : '',
      paymentScheduleDate: el.paymentScheduleDate ? format(new Date(el.paymentScheduleDate), 'dd/MM/yyyy') : '',
      createdBy: el.createdBy || '',
      createdByName: el.createdByName || '',
      createdByFullName: el.createdByFullName || '',
      createdAt: el.createdAt ? new Date(el.createdAt).toLocaleDateString() : '',
      lastUpdatedBy: el.lastUpdatedBy || '',
      lastUpdatedByName: el.lastUpdatedByName || '',
      lastUpdatedByFullName: el.lastUpdatedByFullName || '',
      lastUpdatedAt: el.lastUpdatedAt ? new Date(el.lastUpdatedAt).toLocaleDateString() : '',
      totalAmount: <strong>{toIDR(Number(el.totalAmount || 0))}</strong>,
      status: el.status || 0,
      totalEmployees: el.totalEmployees || 0,
      disableDownload: el.status === 0,
      download: 'Download',
    }),
  );

  return {
    items: listData,
    hasNextPage,
    page,
    pageSize,
  };
};

export default runPayrollListNormalizer;
