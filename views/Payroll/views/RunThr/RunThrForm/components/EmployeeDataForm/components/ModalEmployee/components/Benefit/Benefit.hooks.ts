import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';

import { ENDPOINT } from '@/constants/apiURL';
import { usePostData } from '@/hooks/useMutateData';
import useToaster from '@/hooks/useToaster';

import type { ComponentProps, DataComponent, DataEmployeeFormSchema } from '../../ModalEmployee.types';

const useBenefit = (props: ComponentProps) => {
  const { employeeId = '' } = props;
  const { RUN_THR_MGMT } = ENDPOINT;
  const { COMPONENT_RESTORE } = RUN_THR_MGMT;
  const toaster = useToaster();
  const {
    control,
    setValue,
    getValues,
  } = useFormContext<DataEmployeeFormSchema>();

  const { fields, remove } = useFieldArray({
    name: 'componentsBenefit',
    control,
  });

  const { mutate: mutateRestore, isLoading: isSubmitting } = usePostData<DataComponent>(
    ['restoreComponentThr', employeeId],
    COMPONENT_RESTORE(employeeId),
    {
      options: {
        onSuccess: (response) => {
          const { benefit } = response || [];
          const dataRestore = benefit.map((el) => (
            {
              name: el.name,
              id: el.id,
              exactAmount: el.amount,
              amount: el.amount,
            }
          ));
          setValue('componentsBenefit', dataRestore);
        },
        onError: (error) => {
          const { response } = error || {};
          const { data: errorData } = response || {};
          const { message } = errorData || {};

          toaster.error(message || 'Terjadi kesalahan pada server');
        },
      },
    },
  );

  const { componentsBenefit } = useWatch({ control });

  const handleDelete = (index: number) => {
    remove(index);
  };

  const handleRestore = () => {
    const items = Object.assign({}, ...getValues('componentsBenefit')
      .map((el) => ({ [el.name]: Number(el.amount) })));

    const newObject = {
      type: 'Benefit',
      items,
    };

    mutateRestore(newObject);
  };

  return {
    componentsBenefit,
    control,
    fields,
    handleDelete,
    isSubmitting,
    handleRestore,
  };
};

export default useBenefit;
