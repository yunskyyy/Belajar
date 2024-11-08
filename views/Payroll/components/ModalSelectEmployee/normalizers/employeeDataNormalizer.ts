import type { EmployeeData } from '@/views/Payroll/types/runPayrollFormComponents';

const employeeDataNormalizer = (data: EmployeeData[]): EmployeeData[] => (
  data.map((el): EmployeeData => ({
    employeeId: el.employeeId || '',
    employeeName: el.employeeName || '',
    employeeNumber: el.employeeNumber || '',
    divisionName: el.divisionName || '',
    levelName: el.levelName || '',
    organizationName: el.organizationName || '',
    position: el.position || 0,
    positionName: el.positionName || '',
  })));

export default employeeDataNormalizer;
