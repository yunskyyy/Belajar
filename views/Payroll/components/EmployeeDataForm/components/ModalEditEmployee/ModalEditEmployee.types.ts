import type { z } from 'zod';

import type { Component } from './types/componentModal';
import type dataEmployeeSchema from './ModalEditEmployee.schema';

export interface ListEditEmployee {
  [key: string]: unknown;
  employeeName: string;
  employeeId: string;
  employeeNumber: string;
  payrollDisbursementItemId: string;
  componentsAllowance: Component[];
  componentsAllowancePrevious: Component[];
  componentsSalary: Component[];
  componentsSalaryPrevious: Component[];
  componentsBenefit: Component[];
  componentsBenefitPrevious: Component[];
  additionalEarnings: AdditionalEarningComponent[];
  deductions: Component[];
}

export interface AdditionalEarningComponent {
  [key: string]: unknown;
  additionalEarningId: string;
  id: string;
  date: string;
  projectName: string;
  projectCode: string;
  projectId: string;
  type: number;
  amount: number;
  isDeleted: boolean;
  schedulePaymentDate: string;
}

export interface Components {
  payrollDisbursementItemComponentId: string,
  exactAmount: number;
}

export type DataEmployeeFormSchema = z.infer<typeof dataEmployeeSchema>;
