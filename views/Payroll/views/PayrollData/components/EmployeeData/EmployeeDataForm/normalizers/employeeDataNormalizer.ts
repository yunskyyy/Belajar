import { compareAsc, isPast } from 'date-fns';

import PayrollDataType from '@/enums/payrollDataType';
import { formatDate, toIDR } from '@/utils';

import type { EmployeeDatum } from '../../types/employeeData';

const employeeDataNormalizer = (data: EmployeeDatum): EmployeeDatum => ({
  employeeId: data.employeeId || '',
  employeeIdNumber: data.employeeIdNumber || '',
  employeeName: data.employeeName || '',
  organizationId: data.organizationId || '',
  organizationName: data.organizationName || '',
  position: data.position || 0,
  items: (data.items || []).map((item) => ({
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
    status: item.type === PayrollDataType.Expired ? isPast(new Date(item.effectiveDate))
      : isPast(new Date(item.effectiveDate))
      && (!data.items.find((component) => (component.componentId === item.componentId
        && component.type === PayrollDataType.Expired
        && compareAsc(new Date(item.effectiveDate), new Date(component.effectiveDate)) === -1
      ))),
  })),
  createdBy: data.createdBy || '',
  createdByName: data.createdByName || '',
  createdByFullName: data.createdByFullName || '',
  createdAt: data.createdAt ? formatDate(data.createdAt) : '',
  lastUpdatedBy: data.lastUpdatedBy || '',
  lastUpdatedByName: data.lastUpdatedByName || '',
  lastUpdatedByFullName: data.lastUpdatedByFullName || '',
  lastUpdatedAt: data.lastUpdatedAt ? formatDate(data.lastUpdatedAt) : '',
  isButtonDisable: data.isButtonDisable || false,
});

export default employeeDataNormalizer;
