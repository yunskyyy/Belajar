import type { SelectItem } from '@/types/inputs';
import type { AuditTrail, BaseQueryParams, PaginationData } from '@/types/responses';

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
  resignDate: string;
  npwpNumber: string;
  ptkpStatus: string;
  bankName: string;
  bankCode: string;
  bankAccountNumber: string;
  bankAccountHolderName: string;
  bpjsTkNumber: string;
  bpjsKesNumber: string;
}

export type EmployeeList = PaginationData<Employee> & {
  totalData: number;
  totalDataAfterFilter: number;
};

export interface EmployeeQuery {
  [key: string]: unknown;
  s: string;
  divisionId: string;
  positionId: string;
  structuralId: string;
  levelId: string;
  employmentStatusId: string;
}

export type EmployeeQueryParams = EmployeeQuery & BaseQueryParams;

export type EmployeeExportQuery = Omit<EmployeeQuery, 's'>;

export interface EmployeeResignedTableProps {
  divisionFilterOption: SelectItem[];
  positionFilterOption: SelectItem[];
  structuralFilterOption: SelectItem[];
  levelFilterOption: SelectItem[];
}
