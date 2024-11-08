import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';

import { ENDPOINT } from '@/constants/apiURL';
import { usePostData } from '@/hooks/useMutateData';
import useToaster from '@/hooks/useToaster';

import type { ComponentProps, DataComponent, DataEmployeeFormSchema } from '../../ModalEmployee.types';

const useSalary = (props: ComponentProps) => {
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
    name: 'componentsSalary',
    control,
  });

  const { mutate: mutateRestore, isLoading: isSubmitting } = usePostData<DataComponent>(
    ['restoreComponentThr', employeeId],
    COMPONENT_RESTORE(employeeId),
    {
      options: {
        onSuccess: (response) => {
          const { salary } = response || [];
          const dataRestore = salary.map((el) => (
            {
              name: el.name,
              id: el.id,
              exactAmount: el.amount,
              amount: el.amount,
            }
          ));
          setValue('componentsSalary', dataRestore);
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

  const { componentsSalary } = useWatch({ control });

  const handleDelete = (index: number) => {
    remove(index);
  };

  const handleRestore = () => {
    const items = Object.assign({}, ...getValues('componentsSalary')
      .map((el) => ({ [el.name]: Number(el.amount) })));

    const newObject = {
      type: 'Salary',
      items,
    };

    mutateRestore(newObject);
  };

  return {
    componentsSalary,
    control,
    fields,
    handleDelete,
    handleRestore,
    isSubmitting,
  };
};

export default useSalary;
