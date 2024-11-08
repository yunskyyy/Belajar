import type { FieldInfo } from './EmployeeResignedDetail.types';

export const EMPLOYEE_PROFILE_FIELD: FieldInfo[] = [
  {
    label: 'Employee ID',
    key: 'employeeIdNumber',
  },
  {
    label: 'Email',
    key: 'emailAddress',
  },
  {
    label: 'First Name',
    key: 'firstName',
  },
  {
    label: 'Last Name',
    key: 'lastName',
  },
  {
    label: 'Citizen ID (KTP)',
    key: 'citizenIdNumber',
  },
  {
    label: 'Citizen ID Address (Alamat KTP)',
    key: 'address',
    fullWidth: true,
  },
  {
    label: 'Residential Address (Alamat Tinggal)',
    key: 'residentialAddress',
    fullWidth: true,
  },
  {
    label: 'Place of Birth',
    key: 'placeOfBirth',
  },
  {
    label: 'Date of Birth',
    key: 'dateOfBirth',
  },
  {
    label: 'Mobile Phone',
    key: 'mobilePhone',
  },
  {
    label: 'Gender',
    key: 'gender',
  },
  {
    label: 'Marital Status',
    key: 'maritalStatus',
  },
  {
    label: 'Religion',
    key: 'religion',
  },
  {
    label: 'Organization',
    key: 'organizationName',
  },
];

export const EMPLOYEE_CAREER_FIELD: FieldInfo[] = [
  {
    label: 'Division',
    key: 'divisionName',
  },
  {
    label: 'Position',
    key: 'positionName',
  },
  {
    label: 'Structural/Specialist Title',
    key: 'structuralName',
  },
  {
    label: 'Level',
    key: 'levelName',
  },
  {
    label: 'Employment Status',
    key: 'employmentStatusName',
  },
  {
    label: 'Join Date',
    key: 'joinDate',
  },
  {
    label: 'Sign Date',
    key: 'signDate',
  },
  {
    label: 'End Date',
    key: 'endDate',
  },
];

export const PAYROLL_INFORMATION_FIELD: FieldInfo[] = [
  {
    label: 'NPWP',
    key: 'npwpNumber',
  },
  {
    label: 'NPWP (16 Digit)',
    key: 'latestNpwpNumber',
  },
  {
    label: 'PTKP Status',
    key: 'ptkpStatus',
  },
  {
    label: 'Bank Name',
    key: 'bankName',
  },
  {
    label: 'Bank Account',
    key: 'bankAccountNumber',
  },
  {
    label: 'Bank Account Holder',
    key: 'bankAccountHolderName',
  },
  {
    label: 'ID BPJS Ketenagakerjaan',
    key: 'bpjsTkNumber',
  },
  {
    label: 'ID BPJS Kesehatan',
    key: 'bpjsKesNumber',
  },
];

export const EMPLOYEE_PROFILE_SECTIONS = [
  {
    sectionName: 'Employee Profile',
    sectionData: EMPLOYEE_PROFILE_FIELD,
    fieldLength: 17,
  },
  {
    sectionName: 'Employee Career',
    sectionData: EMPLOYEE_CAREER_FIELD,
    fieldLength: 6,
  },
  {
    sectionName: 'Payroll Information',
    sectionData: PAYROLL_INFORMATION_FIELD,
    fieldLength: 7,
  },
];
