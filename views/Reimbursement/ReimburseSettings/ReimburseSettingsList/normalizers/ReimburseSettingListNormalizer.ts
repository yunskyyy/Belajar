import { formatDate } from '@/utils';
import type {
  Approver,
  ReimburseComponentListData,
  ReimburseComponentListResponse, ReimburseSettingsData,
  ReimburseSettingsResponse,
} from '@/views/Reimbursement/ReimburseSettings/ReimburseSettingsList/ReimburseSettings.types';

const reimburseSettingListNormalizer = (
  data: ReimburseComponentListResponse,
): ReimburseComponentListData => {
  const {
    items, hasNextPage, page, pageSize,
  } = data || {};

  const listData = (items || []).map(
    (el: ReimburseSettingsResponse): ReimburseSettingsData => ({
      reimbursementSettingId: el.reimbursementSettingId || '',
      categoryId: el.categoryId || '',
      categoryName: el.categoryName || '',
      typeId: el.typeId || '',
      typeName: el.typeName || '',
      effectiveDate: formatDate(el.effectiveDate) || '',
      approvalLine1: (el.approvalLine1 || [])
        .map((approver: Approver) => approver.employeeName)
        .join(', '),
      approvalLine2: el.approvalLine2.length !== 0 ? (el.approvalLine2 || [])
        .map((approver: Approver) => approver.employeeName)
        .join(', ') : '-',
      createdBy: el.createdBy || '',
      createdByName: el.createdByName || '',
      createdByFullName: el.createdByFullName || '',
      createdAt: el.createdAt ? new Date(el.createdAt).toLocaleDateString() : '',
      lastUpdatedBy: el.lastUpdatedBy || '',
      lastUpdatedByName: el.lastUpdatedByName || '',
      lastUpdatedByFullName: el.lastUpdatedByFullName || '',
      lastUpdatedAt: el.lastUpdatedAt ? new Date(el.lastUpdatedAt).toLocaleDateString() : '',
    }),
  );
  return {
    items: listData,
    hasNextPage,
    page,
    pageSize,
  };
};

export default reimburseSettingListNormalizer;
