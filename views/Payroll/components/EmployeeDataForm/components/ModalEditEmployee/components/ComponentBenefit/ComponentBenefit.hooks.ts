import { useParams } from 'next/navigation';

import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';

import { ENDPOINT } from '@/constants/apiURL';
import { usePostData } from '@/hooks/useMutateData';
import useToaster from '@/hooks/useToaster';

import type { DataEmployeeFormSchema } from '../../ModalEditEmployee.types';
import restoreComponentDataNormalizer from '../../normalizers/restoreComponentDataNormalizer';
import type { ComponentModalEmployeeProps, RestoreComponentData } from '../../types/componentModal';

const useComponentBenefit = (props: ComponentModalEmployeeProps) => {
  const { currentData = [], employeeId = '' } = props;
  const { DISBURSEMENT_MGMT: { RESTORE_COMPONENT } } = ENDPOINT;

  const { id = '' } = useParams();
  const toaster = useToaster();
  const {
    control,
    getValues,
    setValue,
  } = useFormContext<DataEmployeeFormSchema>();

  const { fields, remove } = useFieldArray({
    name: 'componentsBenefit',
    control,
  });

  const { componentsBenefit } = useWatch({ control });

  const handleDelete = (i: number) => {
    remove(i);
    const pendings = [...getValues('pendings')];
    if (componentsBenefit) {
      pendings.push({
        payrollDisbursementItemComponentId: componentsBenefit[i].id || '',
        exactAmount: Number(currentData
          .find((el) => el.id === componentsBenefit[i].id)?.amount || 0),
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
        componentType: 'Benefit',
      },
      options: {
        onSuccess: (data) => {
          setValue('componentsBenefit', data.components);
          toaster.default('Benefit component restored');
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
    componentsBenefit,
    control,
    fields,
    mutatingRestore,
    handleDelete,
    handleRestoreComponent,
  };
};

export default useComponentBenefit;
