import { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';

import { ENDPOINT } from '@/constants/apiURL';
import HTTP_CODE from '@/constants/httpCode';
import { useModalContext } from '@/contexts/ModalContext';
import useGetData from '@/hooks/useGetData';
import { useMutateData } from '@/hooks/useMutateData';
import useToaster from '@/hooks/useToaster';

import reimburseComponentNormalizer
  from '../../normalizers/reimburseComponentNormalizer';

import defaultValueComponentForm
  from './ComponentModal.constants';
import componentSchema
  from './ComponentModal.schema';
import type {
  ComponentFormSchema,
  ComponentModalProps,
} from './ComponentModal.types';

const useComponentModal = (props:ComponentModalProps) => {
  const modal = useModalContext();
  const toaster = useToaster();
  const { REIMBURSEMENT } = ENDPOINT;
  const { REIMBURSE_COMPONENT } = REIMBURSEMENT;
  const { COMPONENT, BY_ID } = REIMBURSE_COMPONENT;

  const {
    onClose,
    isEdit = false,
    componentId = '',
  } = props;

  const {
    control,
    handleSubmit,
    setError,
    reset,
    register,
    formState: { errors },
  } = useForm<ComponentFormSchema>({
    resolver: zodResolver(componentSchema),
    defaultValues: defaultValueComponentForm,
  });

  const { name, types } = useWatch({ control });

  const { fields } = useFieldArray({
    control,
    name: 'types',
  });

  const addType = () => {
    reset({
      name,
      types: [...types || [{
        reimbursementTypeId: '',
        name: '',
      }], {
        reimbursementTypeId: '',
        name: '',
      }],
    });
  };

  const {
    mutate: mutateSubmit,
    isLoading,
  } = useMutateData(
    ['componentPost'],
    !isEdit ? COMPONENT : BY_ID(componentId),
    !isEdit ? 'post' : 'put',
    {
      options: {
        onSuccess: () => {
          onClose();
          reset();
          modal.closeConfirm();
          modal.success({
            title: 'Successfully',
            content: 'Your data has been successfully saved',
            onConfirm: () => modal.closeConfirm(),
          });
        },
        onError: (error) => {
          const { response } = error || {};
          const { data: errorData } = response || {};
          const { message, code, payload } = errorData || {};
          if (code === HTTP_CODE.badRequest) {
            (payload || []).forEach((el) => {
              const { propertyName, message: payloadMessage } = el;
              setError(
                `${propertyName.charAt(0).toLowerCase()}${propertyName.slice(
                  1,
                )}` as 'root',
                {
                  type: 'custom',
                  message: payloadMessage,
                },
              );
            });
          }
          toaster.error(message || 'Terjadi kesalahan pada server');
        },
      },
    },
  );

  const {
    data: dataComponent,
  } = useGetData(
    ['componentDetail', componentId],
    BY_ID(componentId),
    {
      normalizer: reimburseComponentNormalizer,
      options: {
        enabled: !!componentId,
      },
    },
  );

  useEffect(() => {
    reset(defaultValueComponentForm);
    if (dataComponent) {
      reset({
        name: dataComponent.categoryName,
        types: dataComponent.reimbursementTypes,
      });
    }
  }, [dataComponent, reset]);
  const onSubmit = (data: ComponentFormSchema) => {
    if (!isEdit) {
      mutateSubmit({
        ...data,
        types: data.types.map((type: { name: string }) => type.name),
      });
    } else {
      mutateSubmit({
        ...data,
        types: data.types.map((type) => (type.reimbursementTypeId === '' ? { name: type.name } : type)),
      });
    }
  };

  const removeType = (i: number) => {
    if (types && (types || []).length > 1) {
      const tempArr = types;
      tempArr.splice(i, 1);
      reset({
        name,
        types: tempArr,
      });
    }
  };

  const resetForm = () => {
    reset(defaultValueComponentForm);
  };

  return {
    control,
    handleSubmit,
    register,
    errors,
    fields,
    isLoading,
    addType,
    onSubmit,
    resetForm,
    removeType,
  };
};

export default useComponentModal;
