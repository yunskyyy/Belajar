import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';

import type { DataEmployeeFormSchema } from '../../ModalEditEmployee.types';

const useDeduction = () => {
  const {
    control,
    formState: { errors },
    getValues,
    register,
    setValue,
  } = useFormContext<DataEmployeeFormSchema>();

  const { fields, append, remove } = useFieldArray({
    name: 'deductions',
    control,
  });

  const { deductions } = useWatch({ control });

  const handleAddComponent = () => append({
    id: '',
    name: '',
    amount: 0,
  });

  const handleDelete = (i: number) => {
    setValue(`deductions.${i}.isDeleted`, true);
    if (deductions && !deductions[i].id) {
      remove(i);
    }
  };

  return {
    fields,
    control,
    deductions,
    setValue,
    getValues,
    register,
    errors,
    handleAddComponent,
    handleDelete,
  };
};

export default useDeduction;
