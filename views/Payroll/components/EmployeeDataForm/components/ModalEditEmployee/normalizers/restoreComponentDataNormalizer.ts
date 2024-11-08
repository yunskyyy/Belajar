import type { RestoreComponentData } from '../types/componentModal';

const restoreComponentDataNormalizer = (data: RestoreComponentData): RestoreComponentData => ({
  components: (data.components || []).map((el) => ({
    name: el.name || '',
    id: el.id || '',
    type: el.type || '',
    amount: el.amount || 0,
  })),
  employeeId: data.employeeId || '',
  employeeName: data.employeeName || '',
  employeeNumber: data.employeeNumber || '',
  organizationName: data.organizationName || '',
  payrollDisbursementItemId: data.payrollDisbursementItemId || '',
  position: data.position || 0,
  positionName: data.positionName || '',
  runPayrollId: data.runPayrollId || '',
});

export default restoreComponentDataNormalizer;
