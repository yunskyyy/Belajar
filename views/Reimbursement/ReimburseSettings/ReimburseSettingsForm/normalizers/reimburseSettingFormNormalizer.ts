import type { ApprovalLine, Project, ReimburseSettingDetail } from '../../types/reimburseSettings';
import type {
  ApprovalLineOptionalSchema, ApprovalLineSchema, ProjectSchema,
  ReimburseSettingsFormSchema,
} from '../ReimburseSettingsForm.types';

const reimburseSettingFormNormalizer = (
  data: ReimburseSettingDetail,
): ReimburseSettingsFormSchema => {
  const approvalLines: ApprovalLineSchema[] = [];
  const approvalLinesOptional: ApprovalLineOptionalSchema[] = [];
  const projects: ProjectSchema[] = [];

  data.approvalLines.forEach((approval: ApprovalLine) => {
    switch (approval.approvalLine) {
      case 2: {
        approvalLinesOptional.push({
          id: approvalLinesOptional.length,
          approvals: {
            label: `${approval.employeeIdNumber} - ${approval.employeeName}`,
            value: approval.employeeId || '',
          },
          line: approval.approvalLine || 2,
          employeeId: approval.employeeId || '',
        });
        break;
      }
      default: {
        approvalLines.push({
          id: approvalLines.length,
          approvals: {
            label: `${approval.employeeIdNumber} - ${approval.employeeName}`,
            value: approval.employeeId || '',
          },
          line: approval.approvalLine || 1,
          employeeId: approval.employeeId || '',
        });
        break;
      }
    }
  });

  data.projects.forEach((project: Project) => {
    projects.push({
      reimbursementSettingProjectId: project.reimbursementSettingProjectId || '',
      projectId: project.projectId || '',
      project: {
        value: project.projectId,
        label: project.projectCode,
      },
      budgetLimit: project.budgateLimit || 0,
      countToPerson: project.countToPerson || false,
    });
  });
  return {
    reimbursementSettingId: data.reimbursementSettingId || '',
    reimbursementCategoryId: data.reimbursementSettingId || '',
    reimbursementTypeId: data.typeId || '',
    effectiveDate: data.effectiveDate || '',
    approvalLines,
    approvalLinesOptional,
    projects,
  };
};

export default reimburseSettingFormNormalizer;
