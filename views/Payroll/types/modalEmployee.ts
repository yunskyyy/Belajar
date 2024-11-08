import type { ComponentData, DataEmployeeRunThr } from '@/views/Payroll/types/runPayrollFormComponents';

export interface ModalEmployeeProps {
  id?: string;
  openModal: boolean;
  employeeId?: string;
  onCloseModal: () => void;
  componentData?: ComponentData[];
  data?: DataEmployeeRunThr;
  isEdit?: boolean;
  onCancel: () => void;
  startDate?: string;
  endDate?: string;
}
