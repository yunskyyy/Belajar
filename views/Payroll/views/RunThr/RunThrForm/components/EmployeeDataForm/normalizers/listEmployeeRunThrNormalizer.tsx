import { formatDuration } from 'date-fns';

import { formatDate, toIDR } from '@/utils';
import type { DataEmployeeRunThr, ListEmployeeRunThr } from '@/views/Payroll/types/runPayrollFormComponents';

const listEmployeeRunThrNormalizer = (data: ListEmployeeRunThr): ListEmployeeRunThr => {
  const {
    items, hasNextPage, page, pageSize,
  } = data || {};

  const listData = (items || []).map(
    (el): DataEmployeeRunThr => ({
      employee: el.employee || '',
      employeeId: el.employeeId || '',
      employeeName: el.employeeName || '',
      employeeNumber: el.employeeNumber || '',
      id: el.id || '',
      joinDate: el.joinDate || '',
      employeeComponents: el.employeeComponents || [],
      lengthOfService: el.lengthOfService || [],
      workingPeriode: el.lengthOfService
        ? formatDuration({
          years: el.lengthOfService[0],
          months: el.lengthOfService[1],
          days: el.lengthOfService[2],
        })
        : '',
      organizationName: el.organizationName || '',
      paymentScheduleDate: el.paymentScheduleDate || '',
      positionName: el.positionName || '',
      employeeComponentSummaries: el.employeeComponentSummaries || [],
      salary: toIDR(el.totalSalary || 0),
      allowance: toIDR(el.totalAllowance || 0),
      benefit: toIDR(el.totalBenefit || 0),
      total: el.total || 0,
      totalAllowance: el.totalAllowance || 0,
      totalBenefit: el.totalBenefit || 0,
      totalSalary: el.totalSalary || 0,
      totalPayment: <strong>{toIDR(el.total || 0) || ''}</strong>,
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

export default listEmployeeRunThrNormalizer;
