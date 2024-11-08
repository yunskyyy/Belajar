import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { ENDPOINT } from '@/constants/apiURL';
import HTTP_CODE from '@/constants/httpCode';
import { useModalContext } from '@/contexts/ModalContext';
import { usePatchData } from '@/hooks/useMutateData';
import useToaster from '@/hooks/useToaster';

import resignSchema from './EmployeeResignModal.schema';
import type { EmployeeResignModalProps, ResignFormSchema } from './EmployeeResignModal.types';

const useEmployeeResignModal = (props: EmployeeResignModalProps) => {
  const modal = useModalContext();
  const toaster = useToaster();

  const { EMPLOYEE_MGMT } = ENDPOINT;
  const { EMPLOYEE_RESIGN } = EMPLOYEE_MGMT;

  const { employee, onClose } = props;
  const { employeeId = '' } = employee || {};

  const {
    control,
    handleSubmit,
    setError,
    reset,
  } = useForm<ResignFormSchema>({
    resolver: zodResolver(resignSchema),
    defaultValues: {
      resignDate: '',
    },
  });

  const {
    mutate: mutateSubmit,
    isLoading,
  } = usePatchData(
    ['employeeResign'],
    EMPLOYEE_RESIGN(employeeId),
    {
      options: {
        onSuccess: () => {
          onClose();
          reset();
          modal.closeConfirm();
          modal.success({
            title: 'Successfully',
            content: 'Selected data successfully deleted',
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

  const onSubmit = (data: ResignFormSchema) => {
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

export default useEmployeeResignModal;
