import { useState } from 'react';

import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';

import type { SelectItem } from '@/types/inputs';
import { formatDate } from '@/utils';

import type { DataEmployeeFormSchema } from '../../ModalEditEmployee.types';

import type { AdditionalEarningsProps } from './AdditionalEarning.types';

const useAdditionalEarning = (props: AdditionalEarningsProps) => {
  const { data = [] } = props;
  const [dateOptions] = useState<SelectItem[]>(
    data.map((el) => ({ label: formatDate(el.date), value: el.date })),
  );
  const [projectOptions] = useState<SelectItem[]>(data.map(
    (el) => ({ label: `${el.projectCode} - ${el.projectName}`, value: el.projectId }),
  ));

  const {
    control,
    formState: { errors },
    getValues,
    register,
    setValue,
  } = useFormContext<DataEmployeeFormSchema>();

  const { fields, append, remove } = useFieldArray({
    name: 'additionalEarnings',
    control,
  });

  const { additionalEarnings } = useWatch({ control });

  const handleAddComponent = () => append({
    additionalEarningId: '',
    id: '',
    projectName: '',
    projectId: '',
    projectCode: '',
    type: 0,
    date: '',
    amount: 0,
  });

  const onchangeDate = (i: number, value: string) => {
    if (additionalEarnings) {
      const { projectId = '', type } = additionalEarnings[i] || {};
      const additionalEarningData = data.find((el) => (
        el.projectId === projectId
        && el.date === value
        && el.type === type
      ));
      setValue(`additionalEarnings.${i}.amount`, Number(additionalEarningData?.amount || 0));
      setValue(`additionalEarnings.${i}.id`, String(additionalEarningData?.id || ''));
      setValue(`additionalEarnings.${i}.additionalEarningId`, String(additionalEarningData?.additionalEarningId || ''));
    }
  };

  const getFilteredProjectOptions = (i: number) => {
    const filteredProjectOptions = additionalEarnings
      ? data
        .filter((el) => el.type === additionalEarnings[i]?.type || 0)
        .map((el) => ({ label: `${el.projectCode} - ${el.projectName}`, value: el.projectId }))
      : projectOptions;
    return Object.values(
      filteredProjectOptions.reduce((acc, obj) => ({ ...acc, [obj.value]: obj }), []),
    );
  };

  const getFilteredDateOptions = (i: number): SelectItem[] => {
    if (additionalEarnings) {
      return Object.values(
        data
          .filter((el) => (
            el.projectId === additionalEarnings[i]?.projectId || '')
            && el.type === additionalEarnings[i].type)
          .map((el) => ({ label: formatDate(el.date), value: el.date }))
          .reduce((acc, obj) => ({ ...acc, [obj.value]: obj }), {}),
      );
    }
    return projectOptions;
  };

  const handleDelete = (i: number) => {
    setValue(`additionalEarnings.${i}.isDeleted`, true);
    if (additionalEarnings && !additionalEarnings[i].id) {
      remove(i);
    }
  };

  return {
    additionalEarnings,
    dateOptions,
    control,
    errors,
    getValues,
    fields,
    projectOptions,
    setValue,
    register,
    getFilteredDateOptions,
    getFilteredProjectOptions,
    handleAddComponent,
    handleDelete,
    onchangeDate,
    remove,
  };
};

export default useAdditionalEarning;
