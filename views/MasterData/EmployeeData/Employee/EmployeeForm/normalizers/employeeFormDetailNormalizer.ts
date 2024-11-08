import type { Employee } from '../../types/employee';
import type { ApprovalLine, EmployeeFormSchema } from '../EmployeeForm.types';

const employeeFormDetailNormalizer = (data: Employee): EmployeeFormSchema => {
  const approvalLines: ApprovalLine[] = [];
  let approvalLinesOptional: ApprovalLine = {
    id: 0,
    rule: 0,
    approvals: [{
      label: '',
      value: '',
    }],
    employeeApprovals: [''],
  };

  data.approvalLines.forEach((line, index) => {
    const approval = {
      id: index,
      rule: line.rule || 0,
      employeeApprovalLineId: line.employeeApprovalLineId || '',
      approvals: line.employeeApprovals.map((approver) => ({
        label: approver ? `${approver.employeeIdNumber} - ${approver.employeeName}` : '',
        value: approver.employeeId || '',
      })),
      employeeApprovals: line.employeeApprovals.map((approver) => approver.employeeId),
    };

    if (index < 2) {
      approvalLines.push(approval);
    } else {
      approvalLinesOptional = approval;
    }
  });
  return {
    firstName: data.firstName || '',
    lastName: data.lastName || '',
    divisionId: data.divisionId || '',
    employeeIdNumber: data.employeeIdNumber || '',
    levelId: data.levelId || '',
    emailAddress: data.emailAddress || '',
    employmentStatusId: data.employmentStatusId || '',
    positionId: data.positionId || '',
    citizenIdCardNumber: data.citizenIdNumber || '',
    citizenAddress: data.address || '',
    residentialAddress: data.residentialAddress || '',
    placeOfBirth: data.placeOfBirth || '',
    dateOfBirth: data.dateOfBirth ? String(data.dateOfBirth) : '',
    mobilePhone: data.mobilePhone || '',
    gender: data.gender || '',
    maritalStatus: data.maritalStatus || '',
    religion: data.religion || '',
    organizationId: data.organizationId || '',
    structuralId: data.structuralId || '',
    joinDate: data.joinDate ? String(data.joinDate) : '',
    signDate: data.signDate ? String(data.signDate) : null,
    endDate: data.endDate ? String(data.endDate) : null,
    npwp: data.npwpNumber || '',
    latestNpwp: data.latestNpwpNumber || '',
    ptkpStatus: data.ptkpStatus || '',
    bankCode: data.bankCode || '',
    bankAccountNumber: data.bankAccountNumber || '',
    bankAccountHolderName: data.bankAccountHolderName || '',
    bpjsTkId: data.bpjsTkNumber || '',
    bpjsKesId: data.bpjsKesNumber || '',
    approvalLines,
    approvalLinesOptional,
  };
};

export default employeeFormDetailNormalizer;
