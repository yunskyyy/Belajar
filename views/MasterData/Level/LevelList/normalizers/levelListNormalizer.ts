import { formatDate } from '@/utils';

import type { Level, LevelList } from '../LevelList.types';

const levelListNormalizer = (data: LevelList): LevelList => {
  const {
    items, hasNextPage, page, pageSize,
  } = data || {};

  const listData = (items || []).map(
    (el): Level => ({
      levelId: el.levelId || '',
      name: el.name || '',
      levelType: el.levelType || '',
      levelTypeId: el.levelTypeId || '',
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

export default levelListNormalizer;
