import { useParams } from 'next/navigation';

import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';

import { ENDPOINT } from '@/constants/apiURL';
import { usePostData } from '@/hooks/useMutateData';
import useToaster from '@/hooks/useToaster';
import { areArraysEqual } from '@/utils';

import type { DataEmployeeFormSchema } from '../../ModalEditEmployee.types';
import restoreComponentDataNormalizer from '../../normalizers/restoreComponentDataNormalizer';
import type { ComponentModalEmployeeProps, RestoreComponentData } from '../../types/componentModal';

const useComponentSalary = (props: ComponentModalEmployeeProps) => {
  const { currentData = [], employeeId = '' } = props;
  const { id = '' } = useParams();

  const {
    control,
    getValues,
    setValue,
  } = useFormContext<DataEmployeeFormSchema>();
  const toaster = useToaster();

  const { DISBURSEMENT_MGMT: { RESTORE_COMPONENT } } = ENDPOINT;

  const { fields, remove } = useFieldArray({
    name: 'componentsSalary',
    control,
  });

  const { componentsSalary } = useWatch({ control });

  const handleDelete = (i: number) => {
    remove(i);
    const pendings = [...getValues('pendings')];
    if (componentsSalary) {
      pendings.push({
        payrollDisbursementItemComponentId: componentsSalary[i].id || '',
        exactAmount: Number(currentData
          .find((el) => el.id === componentsSalary[i].id)?.amount || 0),
      });
      setValue('pendings', pendings);
    }
  };

  const {
    mutate: mutateRestoreComponent,
    isLoading: mutatingRestore,
  } = usePostData<RestoreComponentData>(
    ['restoreComponent'],
    RESTORE_COMPONENT(String(id)),
    {
      normalizer: restoreComponentDataNormalizer,
      params: {
        employeeId,
        componentType: 'Salary',
      },
      options: {
        onSuccess: (data) => {
          if (areArraysEqual(getValues('componentsSalary'), (data.components || []))) {
            toaster.error('Sorry, all components already added');
          } else {
            setValue('componentsSalary', data.components);
            toaster.default('Salary component restored');
          }
        },
        onError: (error) => {
          const { response } = error || {};
          const { data } = response || {};
          const { message } = data || {};
          toaster.error(message || 'Terjadi kesalahan pada server');
        },
      },
    },
  );

  const handleRestoreComponent = () => {
    mutateRestoreComponent({});
  };

  return {
    componentsSalary,
    control,
    fields,
    mutatingRestore,
    handleDelete,
    handleRestoreComponent,
  };
};

export default useComponentSalary;
