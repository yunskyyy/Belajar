import type { ComponentData } from '@/views/Payroll/types/runPayrollFormComponents';

import type { ItemComponentData } from '../ModalEditComponent.types';

const componentNormalizer = (data:ItemComponentData) => {
  const { item, total } = data;
  const listData = (item || []).map(
    (el): ComponentData => ({
      key: el.key || '',
      value: el.value || '',
    }),
  );

  return {
    item: listData,
    total,
  };
};

export default componentNormalizer;
