import type {
  ReimburseComponentData,
  ReimburseComponentResponse, ReimburseType,
} from '../ReimburseComponent.types';

const reimburseComponentNormalizer = (
  data: ReimburseComponentResponse,
): ReimburseComponentData => ({
  categoryName: data.name || '',
  reimbursementCategoryId: data.reimbursementCategoryId || '',
  reimbursementTypes: (data.reimbursementTypes || []).map((type: ReimburseType):ReimburseType => ({
    name: type.name || '',
    reimbursementTypeId: type.reimbursementTypeId || '',
  })),
  types: data.reimbursementTypes.join(', ') || '',
  createdBy: data.createdBy || '',
  createdByName: data.createdByName || '',
  createdByFullName: data.createdByFullName || '',
  createdAt: data.createdAt ? new Date(data.createdAt).toLocaleDateString() : '',
  lastUpdatedBy: data.lastUpdatedBy || '',
  lastUpdatedByName: data.lastUpdatedByName || '',
  lastUpdatedByFullName: data.lastUpdatedByFullName || '',
  lastUpdatedAt: data.lastUpdatedAt ? new Date(data.lastUpdatedAt).toLocaleDateString() : '',
});

export default reimburseComponentNormalizer;
