import type { DataEmployeeFormSchema } from './ModalEmployee.types';

// eslint-disable-next-line import/prefer-default-export
export const INIT_DATA_EMPLOYEE: DataEmployeeFormSchema = {
  employeeCode: '',
  employeeName: '',
  payrollDisbursementItemId: '',
  employeeId: '',
  runPayrollId: '',
  componentsAllowance: [],
  componentsSalary: [],
  componentsBenefit: [],
  pendings: [],
};
