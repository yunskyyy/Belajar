import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';

import { ENDPOINT } from '@/constants/apiURL';
import useGetData from '@/hooks/useGetData';
import { useMutateData } from '@/hooks/useMutateData';
import useToaster from '@/hooks/useToaster';
import { formatDateApi, noop } from '@/utils';

import type { RunThrComponentProps } from '../../types/runThrType';

import thrPeriodNormalizer from './normalizers/thrPeriodNormalizer';
import thrPeriodSchema from './ThrPeriod.schema';
import type { PostThrPeriod, ThrPeriod, ThrPeriodSchema } from './ThrPeriod.types';

const useThrPeriod = (props: RunThrComponentProps) => {
  const router = useRouter();
  const { onNextStep = noop, id = '', isEdit = false } = props;
  const toaster = useToaster();
  const { RUN_THR_MGMT } = ENDPOINT;
  const { RUN_THR, RUN_THR_BY_ID } = RUN_THR_MGMT;

  const {
    formState: { errors },
    register,
    control,
    reset,
    handleSubmit,
  } = useForm<ThrPeriodSchema>({
    resolver: zodResolver(thrPeriodSchema),
  });

  const {
    paymentScheduleDate,
    month,
    year,
  } = useWatch({ control });

  const {
    data: detailRunThr,
    isLoading: isLoadingDetail,
  } = useGetData<ThrPeriodSchema, ThrPeriod>(
    ['detailRunThr'],
    RUN_THR_BY_ID(id),
    {
      normalizer: thrPeriodNormalizer,
      options: {
        enabled: !!id,
      },
    },
  );

  const { mutate: mutateSubmit, isLoading: isSubmitting } = useMutateData<PostThrPeriod>(
    ['thrPeriod'],
    id ? RUN_THR_BY_ID(id) : RUN_THR,
    id ? 'put' : 'post',
    {
      options: {
        onSuccess: (data) => {
          if (!id) {
            router.push(`/payroll/disbursement/run-thr/create/${data.id}?step=2`);
            return;
          }
          onNextStep(data.id);
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

  const onSubmit = (formData: ThrPeriodSchema) => {
    const newObject = {
      periodDate: formatDateApi(new Date(formData.year, formData.month, 1)),
      paymentScheduleDate: formatDateApi(new Date(formData.paymentScheduleDate)),
      description: formData.description,
    };
    mutateSubmit(newObject);
  };

  // useEffect to assign payroll detail to form
  useEffect(() => {
    if (detailRunThr) {
      reset(detailRunThr);
    }
  }, [detailRunThr, reset]);

  return {
    errors,
    register,
    control,
    isSubmitting,
    onSubmit,
    handleSubmit,
    isLoadingDetail,
    isEdit,
    paymentScheduleDate,
    month,
    year,
    detailRunThr,
  };
};

export default useThrPeriod;
