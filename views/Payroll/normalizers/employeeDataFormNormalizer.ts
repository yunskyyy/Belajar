import type { EmployeeData, ItemEmployeeData, ListItemEmployeeData } from '@/views/Payroll/types/runPayrollFormComponents';

const employeeNormalizer = (data: ItemEmployeeData): ListItemEmployeeData => {
  const { item, total } = data;
  const listData = (item || []).map(
    (el): EmployeeData => ({
      employeeId: el.employeeId || '',
      employeeName: el.employeeName || '',
      employeeNumber: el.employeeNumber || '',
      levelName: el.levelName || '',
      organizationName: el.organizationName || '',
      position: el.position,
      positionName: el.positionName || '',
      divisionName: el.divisionName || '',
    }),
  );

  return { listData, total };
};

export default employeeNormalizer;
