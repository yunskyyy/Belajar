import { format } from 'date-fns';

import OvertimeExpenseType from '@/enums/OvertimeExpenseType';
import { formatDate, toIDR } from '@/utils';

import type { OvertimeData, OvertimeList } from '../Overtime.types';

const overtimeListNormalizer = (data: OvertimeList): OvertimeList => {
  const {
    items, hasNextPage, page, pageSize,
  } = data || {};

  const listData = (items || []).map(
    (el): OvertimeData => ({
      overtimeExpenseId: el.overtimeExpenseId || '',
      employeeId: el.employeeId || '',
      employeeIdNumber: el.employeeIdNumber || '',
      employeeName: el.employeeName || '',
      projectId: el.projectId || '',
      projectCode: el.projectCode || '',
      projectName: el.projectName || '',
      amount: el.amount || 0,
      amountIDR: toIDR(Number(el.amount)),
      date: el.date ? format(new Date(el.date), 'dd MMMM yyyy') : '',
      teamId: el.teamId || '',
      teamName: el.teamName || '',
      hours: el.hours || 0,
      type: OvertimeExpenseType[Number(el.type) || 0],
      schedulePaymentDate: el.schedulePaymentDate ? formatDate(el.schedulePaymentDate) : '',
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

export default overtimeListNormalizer;
