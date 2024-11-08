import type { Employee } from '../../../types/employee';
import type { FieldInfo } from '../../EmployeeDetail.types';

export interface EmployeeDetailInfoProps {
  sectionName: string;
  sectionData: FieldInfo[];
  employeeData: Employee;
}

export interface SectionData {
  key: string;
  label: string;
  fullWidth?: boolean;
}
