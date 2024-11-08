import type { PaginationData } from '@/types/responses';

export interface ReimburseType {
  name: string,
  reimbursementTypeId: string,
}
export interface ReimburseComponentResponse {
  [key: string]: unknown;
  name: string,
  reimbursementCategoryId: string,
  reimbursementTypes: ReimburseType[],
  createdBy: string;
  createdByName: string;
  createdByFullName: string;
  createdAt: string;
  lastUpdatedBy: string;
  lastUpdatedByName: string;
  lastUpdatedByFullName: string;
  lastUpdatedAt: string;
}

export interface ReimburseComponentData {
  [key: string]: unknown;
  categoryName: string,
  reimbursementCategoryId: string,
  reimbursementTypes: ReimburseType[],
  types: string,
  createdBy: string;
  createdByName: string;
  createdByFullName: string;
  createdAt: string;
  lastUpdatedBy: string;
  lastUpdatedByName: string;
  lastUpdatedByFullName: string;
  lastUpdatedAt: string;
}

export type ReimburseComponentListResponse = PaginationData<ReimburseComponentResponse>;

export type ReimburseComponentListData = PaginationData<ReimburseComponentData>;
