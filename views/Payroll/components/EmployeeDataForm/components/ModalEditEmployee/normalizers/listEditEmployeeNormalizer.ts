import type { ListEditEmployee } from '../ModalEditEmployee.types';
import type { Component } from '../types/componentModal';

const componentNormalizers = (data: Component[]): Component[] => data.map((el) => ({
  amount: el.amount || 0,
  type: el.type || '',
  name: el.name || '',
  id: el.id || '',
  isDeleted: el.isDeleted || false,
}));

const listEditEmployeeNormalizer = (data: ListEditEmployee): ListEditEmployee => ({
  employeeNumber: data.employeeNumber || '-',
  employeeName: data.employeeName || '-',
  employeeId: data.employeeId || '-',
  additionalEarnings: (data.additionalEarnings || []).map((el) => ({
    additionalEarningId: el.additionalEarningId || '',
    amount: el.amount || 0,
    type: el.type || 0,
    id: el.id || '',
    date: el.date || '',
    projectId: el.projectId || '',
    projectCode: el.projectCode || '',
    projectName: el.projectName || '',
    isDeleted: el.isDeleted || false,
    schedulePaymentDate: el.schedulePaymentDate || '',
  })),
  componentsAllowance: componentNormalizers(data.componentsAllowance || []),
  componentsAllowancePrevious: componentNormalizers(data.componentsAllowancePrevious || []),
  componentsSalary: componentNormalizers(data.componentsSalary || []),
  componentsSalaryPrevious: componentNormalizers(data.componentsSalaryPrevious || []),
  componentsBenefit: componentNormalizers(data.componentsBenefit || []),
  componentsBenefitPrevious: componentNormalizers(data.componentsBenefitPrevious || []),
  deductions: componentNormalizers(data.deductions || []),
  payrollDisbursementItemId: data.payrollDisbursementItemId || '-',
});

export default listEditEmployeeNormalizer;
