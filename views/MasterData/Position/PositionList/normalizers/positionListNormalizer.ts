import { formatDate } from '@/utils';

import type {
  Position,
  PositionList,
} from '../PositionList.types';

const positionListNormalizer = (data: PositionList): PositionList => {
  const {
    items, hasNextPage, page, pageSize,
  } = data || {};

  const listData = (items || []).map(
    (el): Position => ({
      positionId: el.positionId || '',
      name: el.name || '',
      divisionId: el.divisionId || '',
      divisionName: el.divisionName || '',
      createdBy: el.createdBy || '',
      createdByFullName: el.createdByFullName || '',
      createdAt: el.createdAt ? formatDate(el.createdAt) : '',
      lastUpdatedBy: el.lastUpdatedBy || '',
      lastUpdatedByFullName: el.lastUpdatedByFullName || '',
      lastUpdatedAt: el.lastUpdatedAt ? formatDate(el.lastUpdatedAt) : '',
    }),
  );

  return {
    items: listData,
    hasNextPage,
    page,
    pageSize,
  };
};

export default positionListNormalizer;
