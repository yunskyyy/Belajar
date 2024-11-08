import type {
  ReimburseComponentData,
  ReimburseComponentListData,
  ReimburseComponentListResponse,
  ReimburseComponentResponse,
  ReimburseType,
} from '../ReimburseComponent.types';

const reimburseComponentListNormalizer = (
  data: ReimburseComponentListResponse,
): ReimburseComponentListData => {
  const {
    items, hasNextPage, page, pageSize,
  } = data || {};

  const listData = (items || []).map(
    (el: ReimburseComponentResponse): ReimburseComponentData => ({
      categoryName: el.name || '',
      reimbursementCategoryId: el.reimbursementCategoryId || '',
      reimbursementTypes: (el.reimbursementTypes || []).map(
        (type: ReimburseType):ReimburseType => ({
          name: type.name || '',
          reimbursementTypeId: type.reimbursementTypeId || '',
        }),
      ),
      types: (el.reimbursementTypes || [])
        .sort((a, b) => a.name.localeCompare((b.name)))
        .map((type) => type.name)
        .join(', '),
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

export default reimburseComponentListNormalizer;
