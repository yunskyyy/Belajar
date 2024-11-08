import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { ENDPOINT } from '@/constants/apiURL';
import { useModalContext } from '@/contexts/ModalContext';
import useGetData from '@/hooks/useGetData';
import { usePatchData } from '@/hooks/useMutateData';
import useToaster from '@/hooks/useToaster';

import cutOffPeriodNormalizer from './normalizers/cutOffPeriodNormalizer';
import cutOffPeriodFormSchema from './CutOffPeriod.schema';
import type { CutOffPeriodData, CutOffPeriodFormSchema } from './CutOffPeriod.types';

const useCutOffPeriod = () => {
  const modal = useModalContext();
  const toaster = useToaster();

  const [isEdit, setIsEdit] = useState(false);

  const { PAYROLL_MGMT: { CUT_OFF_PERIOD } } = ENDPOINT;

  const {
    data: cutOffData,
    refetch,
    isLoading,
  } = useGetData<CutOffPeriodData>(
    ['cutOffPeriod'],
    CUT_OFF_PERIOD,
    {
      normalizer: cutOffPeriodNormalizer,
    },
  );
  const {
    mutate,
    isLoading: mutatingSubmit,
  } = usePatchData(
    ['cutOffPeriodPatch'],
    CUT_OFF_PERIOD,
    {
      options: {
        onSuccess: () => {
          modal.success({
            title: 'Successfully',
            content: 'Your data has been successfully saved',
            onConfirm: () => {
              refetch();
              setIsEdit(false);
              modal.closeConfirm();
            },
          });
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

  const {
    control,
    formState: { errors },
    getValues,
    handleSubmit,
    register,
    reset,
    watch,
  } = useForm<CutOffPeriodFormSchema>({
    resolver: zodResolver(cutOffPeriodFormSchema),
  });

  const toggleEdit = () => {
    setIsEdit(!isEdit);
    if (cutOffData) {
      reset({
        name: cutOffData.name,
        startDt: cutOffData.startDt,
        endDt: cutOffData.endDt,
        paymentScheduleDt: cutOffData.paymentScheduleDt,
      });
    }
  };

  const submitForm = () => {
    const dataForm = getValues();
    mutate(dataForm);
  };

  return {
    control,
    cutOffData,
    errors,
    handleSubmit,
    isEdit,
    isLoading,
    mutatingSubmit,
    register,
    watch,
    submitForm,
    toggleEdit,
  };
};

export default useCutOffPeriod;
