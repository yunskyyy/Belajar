import type { SelectItem } from '@/types/inputs';
import type { BaseQueryParams, PaginationData } from '@/types/responses';

import type { Employee } from '../types/employee';

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

export interface EmployeeTableProps {
  divisionFilterOption: SelectItem[];
  positionFilterOption: SelectItem[];
  statusFilterOption: SelectItem[];
  structuralFilterOption: SelectItem[];
  levelFilterOption: SelectItem[];
}
export interface EmployeeExportData {
  [key: string]: unknown;
  'Employee ID': string;
  'First Name': string;
  'Last Name': string;
  'Email': string;
  'Citizen ID (KTP)': string;
  'Citizen ID Address (Alamat KTP)': string;
  'Residential Address (Alamat Tinggal)': string;
  'Place of Birth': string;
  'Date of Birth': string;
  'Mobile Phone Number': string;
  'Gender': string;
  'Marital Status': string;
  'Religion': string;
  'Division': string;
  'Role/Position': string;
  'Structural Title': string;
  'Level': string;
  'Employment Status': string;
  'Join Date': string;
  'End Employment Status': string;
  'NPWP': string;
  'PTKP Status': string;
  'Bank Name': string;
  'Bank Account': string;
  'Bank Account Holder': string;
  'BPJS Ketenagakerjaan': string;
  'BPJS Kesehatan': string;
}
