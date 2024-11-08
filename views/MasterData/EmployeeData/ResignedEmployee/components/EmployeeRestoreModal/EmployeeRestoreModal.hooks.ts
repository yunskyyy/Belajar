import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { ENDPOINT } from '@/constants/apiURL';
import HTTP_CODE from '@/constants/httpCode';
import { useModalContext } from '@/contexts/ModalContext';
import { usePatchData } from '@/hooks/useMutateData';
import useToaster from '@/hooks/useToaster';

import restoreSchema from './EmployeeRestoreModal.schema';
import type { EmployeeRestoreModalProps, RestoreFormSchema } from './EmployeeRestoreModal.types';

const useEmployeeRestoreModal = (props: EmployeeRestoreModalProps) => {
  const modal = useModalContext();
  const toaster = useToaster();

  const { EMPLOYEE_MGMT } = ENDPOINT;
  const { EMPLOYEE_RESTORE } = EMPLOYEE_MGMT;

  const { employeeId, onClose, onSuccess } = props;

  const {
    control,
    handleSubmit,
    setError,
    reset,
  } = useForm<RestoreFormSchema>({
    resolver: zodResolver(restoreSchema),
    defaultValues: {
      date: '',
    },
  });

  const {
    mutate: mutateSubmit,
    isLoading,
  } = usePatchData(
    ['restoreEmployeePatch'],
    EMPLOYEE_RESTORE(employeeId),
    {
      options: {
        onSuccess: () => {
          onClose();
          reset();
          modal.success({
            title: 'Successfully',
            content: 'Your data has been successfully saved',
            onConfirm: () => {
              modal.closeConfirm();
              if (onSuccess) {
                onSuccess();
              }
            },
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
                propertyName as 'root',
                { type: 'custom', message: payloadMessage },
              );
            });
          }
          toaster.error(message || 'Terjadi kesalahan pada server');
        },
      },
    },
  );

  const onSubmit = (data: RestoreFormSchema) => {
    mutateSubmit(data);
  };

  return {
    control,
    handleSubmit,
    onSubmit,
    isLoading,
    reset,
  };
};

export default useEmployeeRestoreModal;
