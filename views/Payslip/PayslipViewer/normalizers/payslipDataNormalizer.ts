import RunPayrollType from '@/enums/RunPayrollType';

import type { PayslipData } from '../PayslipViewer.types';

const payslipDataNormalizer = (data: PayslipData): PayslipData => ({
  payrollId: data.payrollId || '',
  payrollDisbursementItemId: data.payrollDisbursementItemId || '',
  employee: {
    employeeId: data.employee.employeeId || '',
    employeeName: data.employee.employeeName || '',
    employeeIdNumber: data.employee.employeeIdNumber || '',
    divisionId: data.employee.divisionId || '',
    divisionName: data.employee.divisionName || '',
    positionId: data.employee.positionId || '',
    positionName: data.employee.positionName || '',
    levelId: data.employee.levelId || '',
    levelName: data.employee.levelName || '',
    employmentStatusId: data.employee.employmentStatusId || '',
    employmentStatusName: data.employee.employmentStatusName || '',
    npwpNumber: data.employee.npwpNumber || '',
    latestNpwpNumber: data.employee.latestNpwpNumber || '',
    structuralId: data.employee.structuralId || '',
    structuralName: data.employee.structuralName || '',
    userId: data.employee.userId || '',
    ptkpStatus: data.employee.ptkpStatus || '',
  },
  organization: {
    organizationId: data.organization.organizationId || '',
    organizationName: data.organization.organizationName || '',
    addressOrganization: data.organization.addressOrganization || '',
    logoOrganization: data.organization.logoOrganization || '',
  },
  componentsAdditionalEarnings: (data.additionalEarnings || []).map((el) => ({
    id: el.id || crypto.randomUUID(),
    amount: el.amount || 0,
    name: RunPayrollType[el.type || 0],
    projectCode: el.projectCode || '',
  })),
  componentsAllowance: (data.componentsAllowance || []).map((el) => ({
    id: el.id || crypto.randomUUID(),
    amount: el.amount || 0,
    name: el.name || '',
  })),
  componentsBenefit: (data.componentsBenefit || []).map((el) => ({
    id: el.id || crypto.randomUUID(),
    amount: el.amount || 0,
    name: el.name || '',
  })),
  componentsSalary: (data.componentsSalary || []).map((el) => ({
    id: el.id || crypto.randomUUID(),
    amount: el.amount || 0,
    name: el.name || '',
  })),
  deductions: (data.deductions || []).map((el) => ({
    id: el.id || crypto.randomUUID(),
    amount: el.amount || 0,
    name: el.name || '',
  })),
  period: data.period || '',
  payment: data.payment || '',
  paymentTotal: data.paymentTotal || 0,
});

export default payslipDataNormalizer;
