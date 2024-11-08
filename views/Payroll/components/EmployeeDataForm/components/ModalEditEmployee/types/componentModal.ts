export interface Component {
  id: string;
  name: string;
  type: string;
  isDeleted?: boolean;
  amount: number;
}

export interface ComponentModalEmployeeProps {
  previousData?: Component[];
  employeeId?: string;
  currentData?: Component[];
}

export interface RestoreComponentData {
  runPayrollId: string;
  payrollDisbursementItemId: string;
  employeeId: string;
  employeeNumber: string;
  organizationName: string;
  position: number;
  employeeName: string;
  positionName: string;
  components: Component[];
}
