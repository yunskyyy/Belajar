import { format } from 'date-fns';

import { toIDR } from '@/utils';

import type { RunThrData, RunThrList } from '../RunThr.types';

const runThrListNormalizer = (data: RunThrList): RunThrList => {
  const {
    items, hasNextPage, page, pageSize,
  } = data || {};

  const listData = (items || []).map(
    (el): RunThrData => ({
      holidayAllowanceDisbursementId: el.holidayAllowanceDisbursementId || '',
      paymentScheduleDate: format(new Date(el.paymentScheduleDate), 'dd/MM/yyyy') || '',
      employeeName: el.employeeName || '',
      periodDate: format(new Date(el.periodDate), 'MMMM yyyy') || '',
      description: el.description || '',
      totalEmployees: el.totalEmployees || 0,
      createdBy: el.createdBy || '',
      totalAmount: <strong>{toIDR(Number(el.totalAmount) || 0)}</strong>,
      createdByName: el.createdByName || '',
      createdByFullName: el.createdByFullName || '',
      createdAt: el.createdAt ? new Date(el.createdAt).toLocaleDateString() : '',
      lastUpdatedBy: el.lastUpdatedBy || '',
      lastUpdatedByName: el.lastUpdatedByName || '',
      lastUpdatedByFullName: el.lastUpdatedByFullName || '',
      lastUpdatedAt: el.lastUpdatedAt ? new Date(el.lastUpdatedAt).toLocaleDateString() : '',
      disableDownload: el.status === 1,
      status: (el.status === 1 ? 0 : 1) || 0,
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

export default runThrListNormalizer;
