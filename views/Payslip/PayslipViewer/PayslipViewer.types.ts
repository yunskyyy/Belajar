export interface PayslipViewerProps {
  id: string;
  employeeId: string;
}

export interface PayslipData {
  payrollId: string;
  payrollDisbursementItemId: string;
  employee: Employee;
  organization: Organization;
  additionalEarnings?: AdditionalEarning[];
  deductions: Components[];
  componentsAdditionalEarnings: Components[];
  componentsSalary: Components[];
  componentsBenefit: Components[];
  componentsAllowance: Components[];
  period: string;
  payment: string;
  paymentTotal: number;
}

export interface AdditionalEarning {
  id: string;
  additionalEarningId: string;
  type: number;
  typeName: string;
  projectId: string;
  projectCode: string;
  projectName: string;
  date: string;
  schedulePaymentDate: string;
  amount: number;
}

export interface Components {
  id: string;
  name: string;
  projectCode?: string;
  amount: number;
}

interface Employee {
  employeeId: string;
  userId: string;
  employeeIdNumber: string;
  employeeName: string;
  divisionId: string;
  divisionName: string;
  positionId: string;
  positionName: string;
  structuralId: string;
  structuralName: string;
  levelId: string;
  levelName: string;
  employmentStatusId: string;
  employmentStatusName: string;
  npwpNumber: string;
  latestNpwpNumber?: string;
  ptkpStatus: string;
}

interface Organization {
  organizationId: string;
  organizationName: string;
  addressOrganization: string;
  logoOrganization: string;
}
