import type { AuditTrail } from '@/types/responses';

export interface ApprovalLine {
  reimbursementSettingApprovalId: string
  approvalLine: number
  employeeId: string
  employeeIdNumber: string
  employeeName: string
  position: number
  displayEmployeeName?: string;
}

export interface Project {
  reimbursementSettingProjectId: string
  projectId: string
  projectCode: string
  budgateLimit: number
  countToPerson: boolean
}
export interface ReimburseSettingDetail extends AuditTrail {
  [key: string]: unknown;
  reimbursementSettingId: string
  categoryId: string
  categoryName: string
  typeId: string
  typeName: string
  effectiveDate: string
  organizationId: string
  organizationName: string
  approvalLines: ApprovalLine[]
  projects: Project[]
  approvalLine1: ApprovalLine[]
  approvalLine2: ApprovalLine[]
}
