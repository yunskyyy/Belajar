import type { EmployeeFormSchema } from './EmployeeForm.types';

export const PHONE_REGEX = /^(08)\d{8,13}$/g;

export const INIT_EMPLOYEE: EmployeeFormSchema = {
  bankAccountHolderName: '',
  bankAccountNumber: '',
  bankCode: '',
  bpjsKesId: '',
  bpjsTkId: '',
  citizenAddress: '',
  citizenIdCardNumber: '',
  dateOfBirth: '',
  divisionId: '',
  emailAddress: '',
  employmentStatusId: '',
  firstName: '',
  gender: '',
  joinDate: '',
  lastName: '',
  levelId: '',
  maritalStatus: '',
  mobilePhone: '',
  npwp: '',
  latestNpwp: '',
  placeOfBirth: '',
  positionId: '',
  ptkpStatus: '',
  religion: '',
  residentialAddress: '',
  structuralId: '',
  signDate: null,
  endDate: null,
  approvalLines: [
    {
      rule: 1,
      approvals: [],
      employeeApprovals: [''],
    },
    {
      rule: 0,
      approvals: [],
      employeeApprovals: [''],
    },
  ],
  approvalLinesOptional: {
    rule: 0,
    approvals: [{
      label: '',
      value: '',
    }],
    employeeApprovals: [''],
  },
};
