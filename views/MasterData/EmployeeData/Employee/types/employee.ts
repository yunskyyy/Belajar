import type { AuditTrail } from '@/types/responses';

export interface Employee extends AuditTrail {
  [key: string]: unknown;
  employeeId: string;
  employeeIdNumber: string;
  position: number;
  firstName: string;
  lastName: string;
  fullname: string;
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
  emailAddress: string;
  citizenIdNumber: string;
  address: string;
  residentialAddress: string;
  placeOfBirth: string;
  dateOfBirth: string;
  mobilePhone: string;
  gender: string;
  maritalStatus: string;
  religion: string;
  organizationId: string;
  organizationName: string;
  joinDate: string;
  signDate: string;
  endDate: string;
  npwpNumber: string;
  latestNpwpNumber: string;
  ptkpStatus: string;
  bankName: string;
  bankCode: string;
  bankAccountNumber: string;
  bankAccountHolderName: string;
  bpjsTkNumber: string;
  bpjsKesNumber: string;
  approvalLines: Array<{
    employeeApprovalLineId: string
    rule: number
    employeeApprovals: Array<{
      employeeName: string
      employeeIdNumber: string
      employeeId: string
    }>
  }>
}
