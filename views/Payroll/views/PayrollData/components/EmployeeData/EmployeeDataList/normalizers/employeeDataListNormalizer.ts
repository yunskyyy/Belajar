import { differenceInDays } from 'date-fns';

import PayrollDataType from '@/enums/payrollDataType';
import { formatDate, toIDR } from '@/utils';

import type { EmployeeDataResponse } from '../EmployeeData.types';

const employeeDataListNormalizer = (data: EmployeeDataResponse) => {
  const {
    items, hasNextPage, page, pageSize,
  } = data || {};

  const listData = (items || []).map(
    (el) => ({
      employeeId: el.employeeId || '',
      employeeIdNumber: el.employeeIdNumber || '',
      employeeName: el.employeeName || '',
      organizationId: el.organizationId || '',
      organizationName: el.organizationName || '',
      position: el.position || 0,
      items: (el.items || []).map((item) => ({
        amountNumber: Number(item.amount) || 0,
        employeeComponentId: item.employeeComponentId || '',
        componentId: item.componentId || '',
        componentTypeId: item.componentTypeId || '',
        componentName: item.componentName || '',
        componentTypeName: item.componentTypeName || '',
        amount: item.amount ? toIDR(Number(item.amount)) : '-',
        effectiveDate: item.effectiveDate ? formatDate(String(item.effectiveDate)) : '',
        effectiveDateOrigin: item.effectiveDate ? item.effectiveDate : '',
        newAmount: item.newAmount ? toIDR(Number(item.newAmount)) : '-',
        newAmountNumber: Number(item.newAmount) || 0,
        type: item.type || 0,
        typeString: PayrollDataType[item.type || 0],
        status: differenceInDays(new Date(item.effectiveDate), new Date()) <= 0,
      })),
      createdBy: el.createdBy || '',
      createdByName: el.createdByName || '',
      createdByFullName: el.createdByFullName || '',
      createdAt: el.createdAt ? formatDate(el.createdAt) : '',
      lastUpdatedBy: el.lastUpdatedBy || '',
      lastUpdatedByName: el.lastUpdatedByName || '',
      lastUpdatedByFullName: el.lastUpdatedByFullName || '',
      lastUpdatedAt: el.lastUpdatedAt ? formatDate(el.lastUpdatedAt) : '',
      isButtonDisable: el.isButtonDisable || false,
    }),
  );

  return {
    items: listData,
    hasNextPage,
    page,
    pageSize,
  };
};

export default employeeDataListNormalizer;
