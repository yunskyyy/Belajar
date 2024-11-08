import { formatDate } from '@/utils';

import type { ApprovalLine, Project, ReimburseSettingDetail } from '../../types/reimburseSettings';

const reimburseSettingsDetailNormalizer = (
  data: ReimburseSettingDetail,
): ReimburseSettingDetail => {
  const approvalLine1: ApprovalLine[] = [];
  const approvalLine2: ApprovalLine[] = [];
  const projects: Project[] = [];

  data.approvalLines.forEach((approval) => {
    switch (approval.approvalLine) {
      case 2: {
        approvalLine2.push({
          reimbursementSettingApprovalId: approval.reimbursementSettingApprovalId || '',
          approvalLine: approval.approvalLine || 0,
          employeeId: approval.employeeId || '',
          employeeName: approval.employeeName || '',
          employeeIdNumber: approval.employeeIdNumber || '',
          position: approval.position || 0,
          displayEmployeeName: (approval.employeeName && approval.employeeIdNumber)
            ? `${approval.employeeIdNumber} - ${approval.employeeName}` : '-',
        });
        break;
      }
      default: {
        approvalLine1.push({
          reimbursementSettingApprovalId: approval.reimbursementSettingApprovalId || '',
          approvalLine: approval.approvalLine || 0,
          employeeId: approval.employeeId || '',
          employeeName: approval.employeeName || '',
          employeeIdNumber: approval.employeeIdNumber || '',
          position: approval.position || 0,
          displayEmployeeName: (approval.employeeName && approval.employeeIdNumber)
            ? `${approval.employeeIdNumber} - ${approval.employeeName}` : '-',
        });
        break;
      }
    }
  });

  data.projects.forEach((project) => {
    projects.push({
      reimbursementSettingProjectId: project.reimbursementSettingProjectId || '',
      projectId: project.projectId || '',
      projectCode: project.projectCode || '-',
      budgateLimit: project.budgateLimit || 0,
      countToPerson: project.countToPerson || false,
    });
  });
  return {
    reimbursementSettingId: data.reimbursementSettingId || '',
    categoryId: data.categoryId || '',
    categoryName: data.categoryName || '-',
    typeId: data.typeId || '',
    typeName: data.typeName || '-',
    effectiveDate: formatDate(data.effectiveDate || '') || '-',
    organizationId: data.organizationId || '',
    organizationName: data.organizationName || '-',
    approvalLines: data.approvalLines,
    approvalLine1,
    approvalLine2,
    projects,
    createdBy: data.createdBy || '',
    createdByFullName: data.createdByFullName || '',
    createdAt: data.createdAt ? formatDate(data.createdAt) : '',
    lastUpdatedBy: data.lastUpdatedBy || '',
    lastUpdatedByFullName: data.lastUpdatedByFullName || '',
    lastUpdatedAt: data.lastUpdatedAt ? formatDate(data.lastUpdatedAt) : '',
  };
};

export default reimburseSettingsDetailNormalizer;
