import type { SelectItem } from '@/types/inputs';
import type { PaginationData } from '@/types/responses';

export interface Approver {
  reimbursementSettingApprovalId: string
  approvalLine: number
  employeeId: string
  employeeIdNumber: string
  employeeName: string
  organizationName: string
  position: number
}

export interface ReimburseSettingsResponse {
  [key: string]: unknown
  reimbursementSettingId: string
  categoryId: string
  categoryName: string
  typeId: string
  typeName: string
  effectiveDate: string
  organizationId: string
  organizationName: string
  approvalLines: Approver[]
  approvalLine1: Approver[]
  approvalLine2: Approver[]
  createdBy: string
  createdByName: string
  createdByFullName: string
  createdAt: string
  lastUpdatedBy: string
  lastUpdatedByName: string
  lastUpdatedByFullName: string
  lastUpdatedAt: string
}

export interface ReimburseSettingsData {
  [key: string]: unknown
  reimbursementSettingId: string
  categoryId: string
  categoryName: string
  typeId: string
  typeName: string
  effectiveDate: string
  approvalLine1: string
  approvalLine2: string
  createdBy: string
  createdByName: string
  createdByFullName: string
  createdAt: string
  lastUpdatedBy: string
  lastUpdatedByName: string
  lastUpdatedByFullName: string
  lastUpdatedAt: string
}
export type ReimburseComponentListResponse = PaginationData<ReimburseSettingsResponse>;

export type ReimburseComponentListData = PaginationData<ReimburseSettingsData>;

export interface ReimburseSettingsTableProps {
  categoryFilterOption: SelectItem[],
  typeFilterOption: SelectItem[],
}
