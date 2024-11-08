import { formatDateApi } from '@/utils';

import type { PayrollBulkRequest, PayrollSheetData } from '../EmployeeData.types';

const payrollDataSheetNormalizer = (data: PayrollSheetData[] = []): PayrollBulkRequest[] => (
  data.map((el): PayrollBulkRequest => ({
    employeeCode: el['Employee ID'] || '',
    employeeName: el['Employee Name'] || '',
    type: el.Type || '',
    amount: Number(el['Current Amount']) || 0,
    newAmount: Number(el['New Amount']) || 0,
    componentTypeId: el['Component Type'] || '',
    componentId: el['Component Name'] || '',
    effectiveDate: formatDateApi(new Date(el['Effective Date'])) || formatDateApi(new Date()),
  }))
);

export default payrollDataSheetNormalizer;
