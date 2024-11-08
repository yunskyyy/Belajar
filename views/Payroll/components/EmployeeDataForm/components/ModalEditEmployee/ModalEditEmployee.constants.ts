import type { SelectItem } from '@/types/inputs';

import type { DataEmployeeFormSchema } from './ModalEditEmployee.types';

// eslint-disable-next-line import/prefer-default-export
export const RUN_PAYROLL_TYPE_OPTION: SelectItem[] = [
  {
    label: 'Onsite',
    value: '0',
  },
  {
    label: 'Overtime',
    value: '1',
  },
  {
    label: 'Incentive',
    value: '2',
  },
];

export const INIT_DATA_EMPLOYEE: DataEmployeeFormSchema = {
  employeeCode: '',
  employeeName: '',
  payrollDisbursementItemId: '',
  employeeId: '',
  runPayrollId: '',
  componentsAllowance: [{
    id: '',
    amount: 0,
    name: '',
    type: '',
  }],
  componentsSalary: [{
    id: '',
    amount: 0,
    name: '',
    type: '',
  }],
  componentsBenefit: [{
    id: '',
    amount: 0,
    name: '',
    type: '',
  }],
  additionalEarnings: [],
  deductions: [],
  pendings: [],
};
