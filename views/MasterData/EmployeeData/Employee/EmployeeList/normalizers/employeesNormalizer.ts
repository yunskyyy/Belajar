import type { Employee } from '../../types/employee';
import type { EmployeeExportData } from '../EmployeeList.types';

const employeesNormalizer = (data: Employee[]): EmployeeExportData[] => (data || []).map(
  (el): EmployeeExportData => ({
    'Employee ID': el.employeeIdNumber || '',
    'First Name': el.firstName || '',
    'Last Name': el.lastName || '',
    Email: el.emailAddress || '',
    'Citizen ID (KTP)': el.citizenIdNumber || '',
    'Citizen ID Address (Alamat KTP)': el.address || '',
    'Residential Address (Alamat Tinggal)': el.residentialAddress || '',
    'Place of Birth': el.placeOfBirth || '',
    'Date of Birth': el.dateOfBirth || '',
    'Mobile Phone Number': el.mobilePhone || '',
    Gender: el.gender || '',
    'Marital Status': el.maritalStatus || '',
    Religion: el.religion || '',
    Division: el.divisionName || '',
    'Role/Position': el.positionName || '',
    'Structural Title': el.structuralName || '',
    Level: el.levelName || '',
    'Employment Status': el.employmentStatusName || '',
    'Join Date': el.joinDate || '',
    'End Employment Status': '',
    NPWP: el.npwpNumber || '',
    'PTKP Status': el.ptkpStatus || '',
    'Bank Name': el.bankName || '',
    'Bank Account': el.bankAccountNumber || '',
    'Bank Account Holder': el.bankAccountHolderName || '',
    'BPJS Ketenagakerjaan': el.bpjsTkNumber || '',
    'BPJS Kesehatan': el.bpjsKesNumber || '',
  }),
);

export default employeesNormalizer;
