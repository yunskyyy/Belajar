import { toIDR } from '@/utils';

import type { EmployeeDataList, ListEmployeeData } from '../RunPayrollDetail.types';

const listEmployeeSummaryNormalizer = (data:EmployeeDataList) : EmployeeDataList => {
  const {
    items, hasNextPage, page, pageSize, totalData,
  } = data || {};

  const listData = (items || []).map(
    (el): ListEmployeeData => ({
      employee: el.employee || '',
      employeeName: el.employeeName || '',
      employeeId: el.employeeId || '',
      employeeNumber: el.employeeNumber || '',
      levelName: el.levelName || '',
      organizationName: el.organizationName || '',
      position: el.position || 0,
      positionName: el.positionName || '',
      divisionName: el.divisionName || '',
      componentsAllowance: el.componentsAllowance,
      allowance: toIDR(el.componentsAllowance || 0) || '-',
      componentsBenefit: el.componentsBenefit,
      benefit: toIDR(el.componentsBenefit || 0) || '-',
      componentsSalary: el.componentsSalary,
      salary: toIDR(el.componentsSalary || 0) || '-',
      total: el.total || 0,
      totalSalary: el.total ? <strong>{toIDR(el.total || 0)}</strong> : '-',
      additionalEarnings: el.additionalEarnings,
      earning: toIDR(el.additionalEarnings || 0),
      deduction: el.deduction || 0,
      componentDeduction: toIDR(el.deduction || 0),
      createdBy: el.createdBy || '',
      createdByName: el.createdByName || '',
      createdByFullName: el.createdByFullName || '',
      createdAt: el.createdAt ? new Date(el.createdAt).toLocaleDateString() : '',
      lastUpdatedBy: el.lastUpdatedBy || '',
      lastUpdatedByName: el.lastUpdatedByName || '',
      lastUpdatedByFullName: el.lastUpdatedByFullName || '',
      lastUpdatedAt: el.lastUpdatedAt ? new Date(el.lastUpdatedAt).toLocaleDateString() : '',
    }),
  );

  return {
    items: listData,
    hasNextPage,
    page,
    pageSize,
    totalData,
  };
};

export default listEmployeeSummaryNormalizer;
