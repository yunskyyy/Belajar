import type { FieldInfo } from '@/views/MasterData/EmployeeData/Employee/EmployeeDetail/EmployeeDetail.types';

import type { Employee } from '../../../types/employee';

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
