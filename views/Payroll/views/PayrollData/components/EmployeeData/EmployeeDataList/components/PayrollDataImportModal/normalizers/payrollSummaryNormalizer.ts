import { formatDate } from '@/utils';

import type { PayrollImportSummary } from '../PayrollDataImportModal.types';

const overtimeSummaryNormalizer = (data: PayrollImportSummary): PayrollImportSummary => ({
  dataFailed: data.dataFailed.map((el) => ({
    id: crypto.randomUUID(),
    type: el.type || '',
    effectiveDate: el.effectiveDate ? formatDate(el.effectiveDate) : '',
    employeeId: el.employeeId || '',
    employeeName: el.employeeName || '',
    componentType: el.componentType || '',
    componentName: el.componentName || '',
    currentAmount: el.currentAmount || 0,
    newAmount: el.newAmount || 0,
  })),
  dataSuccess: data.dataSuccess.map((el) => ({
    id: crypto.randomUUID(),
    type: el.type || '',
    effectiveDate: el.effectiveDate ? formatDate(el.effectiveDate) : '',
    employeeId: el.employeeId || '',
    employeeName: el.employeeName || '',
    componentType: el.componentType || '',
    componentName: el.componentName || '',
    currentAmount: el.currentAmount || 0,
    newAmount: el.newAmount || 0,
  })),
});

export default overtimeSummaryNormalizer;
