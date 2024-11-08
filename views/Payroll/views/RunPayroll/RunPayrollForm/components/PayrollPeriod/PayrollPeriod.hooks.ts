import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';

import { ENDPOINT } from '@/constants/apiURL';
import useGetData from '@/hooks/useGetData';
import { usePostData } from '@/hooks/useMutateData';
import useToaster from '@/hooks/useToaster';
import { formatDateApi, noop } from '@/utils';
import payrollPeriodNormalizer from '@/views/Payroll/normalizers/payrollPeriodNormalizer';
import type { RunPayrollComponentProps } from '@/views/Payroll/types/runPayrollFormComponents';

import cutOffPeriodPayrollNormalizer from './normalizers/cutOffPeriodNormalizer';
import payrollPeriodeSchema from './PayrollPeriod.schema';
import type {
  CutOffPeriod,
  PayrollPeriod,
  PayrollPeriodeSchema,
  PostPeriod,
} from './PayrollPeriod.types';

const usePayrollPeriod = (props: RunPayrollComponentProps) => {
  const { onNextStep = noop, id: payrollId = '', isEdit = false } = props;
  const router = useRouter();
  const { DISBURSEMENT_MGMT } = ENDPOINT;
  const { PAYROLL_SETUP, CUT_OFF_PERIOD, RUN_PAYROLL_BY_ID } = DISBURSEMENT_MGMT;
  const toaster = useToaster();

  const {
    formState: { errors },
    register,
    handleSubmit,
    control,
    reset,
    setValue,
  } = useForm<PayrollPeriodeSchema>({
    resolver: zodResolver(payrollPeriodeSchema),
    defaultValues: {
      cutOffPeriodEndDt: '',
      cutOffPeriodStartDt: '',
      payrollDisbursementId: '',
    },
  });

  const {
    cutOffPeriodStartDt,
    cutOffPeriodEndDt,
    paymentScheduleDate,
    month,
    year,
  } = useWatch({ control });

  const { mutate: mutateSubmit, isLoading: isSubmitting } = usePostData<PostPeriod>(
    ['setupPeriod'],
    PAYROLL_SETUP,
    {
      options: {
        onSuccess: (data) => {
          if (!isEdit) {
            router.push(`/payroll/disbursement/run-payroll/create/${data.id}?step=2`);
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

  const onSubmit = (formData: PayrollPeriodeSchema) => {
    const newObject = {
      periodDate: formatDateApi(new Date(formData.year, formData.month, 1)),
      paymentScheduleDate: formatDateApi(new Date(formData.paymentScheduleDate)),
      description: formData.description,
    };

    if (isEdit) {
      mutateSubmit({ ...newObject, id: formData.payrollDisbursementId });
      return;
    }

    mutateSubmit(newObject);
  };

  const [dateCutOff, setDateCutOff] = useState('');

  const {
    data: cutOffPeriod,
    isLoading: cutOffPeriodLoading,
  } = useGetData<CutOffPeriod>(
    [`cutOffPeriod-Payroll-${dateCutOff}`],
    CUT_OFF_PERIOD,
    {
      params: {
        period:
          formatDateApi(
            new Date(
              year || new Date().getFullYear(),
              month || new Date().getMonth() + 1,
              1,
            ),
          ),
      },
      options: {
        enabled: !!year || !!month,
      },
      normalizer: cutOffPeriodPayrollNormalizer,
    },
  );

  // useEffect to assign cutoffPeriod value on create run payroll
  useEffect(() => {
    if (!isEdit && cutOffPeriod) {
      setValue(
        'cutOffPeriodEndDt',
        cutOffPeriod.endDt,
      );
      setValue(
        'cutOffPeriodStartDt',
        cutOffPeriod.startDt,
      );
      setValue(
        'paymentScheduleDate',
        cutOffPeriod.paymentScheduleDt,
      );
    }
  }, [isEdit, cutOffPeriod, setValue]);

  const {
    data: dataRunPayroll, isFetching: dataRunPayrollLoading,
  } = useGetData<PayrollPeriodeSchema, PayrollPeriod>(
    ['detailPeriodPayroll'],
    RUN_PAYROLL_BY_ID(String(payrollId)),
    {
      normalizer: payrollPeriodNormalizer,
      options: {
        enabled: isEdit,
      },
    },
  );

  // useEffect to assign payroll detail to form
  useEffect(() => {
    if (dataRunPayroll) {
      reset(dataRunPayroll);
    }
  }, [dataRunPayroll, reset]);

  return {
    control,
    cutOffPeriod,
    cutOffPeriodEndDt,
    cutOffPeriodLoading,
    cutOffPeriodStartDt,
    dataRunPayrollLoading,
    errors,
    handleSubmit,
    isEdit,
    isSubmitting,
    month,
    paymentScheduleDate,
    register,
    setValue,
    year,
    onSubmit,
    setDateCutOff,
  };
};
export default usePayrollPeriod;
