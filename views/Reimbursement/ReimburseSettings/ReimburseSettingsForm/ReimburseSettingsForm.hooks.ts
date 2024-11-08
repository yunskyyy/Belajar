import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { ENDPOINT } from '@/constants/apiURL';
import HTTP_CODE from '@/constants/httpCode';
import { useModalContext } from '@/contexts/ModalContext';
import useGetData from '@/hooks/useGetData';
import { useMutateData } from '@/hooks/useMutateData';
import useToaster from '@/hooks/useToaster';

import type { ReimburseSettingDetail } from '../types/reimburseSettings';

import reimburseSettingFormNormalizer
  from './normalizers/reimburseSettingFormNormalizer';
import INIT_SETTING
  from './ReimburseSettingsForm.constants';
import reimburseSettingSchema
  from './ReimburseSettingsForm.schema';
import type {
  ReimburseSettingsFormParams,
  ReimburseSettingsFormSchema,
} from './ReimburseSettingsForm.types';

const useReimburseSettingsForm = (props: ReimburseSettingsFormParams) => {
  const router = useRouter();
  const modal = useModalContext();
  const toaster = useToaster();

  const {
    id = '',
  } = props;

  const { REIMBURSEMENT } = ENDPOINT;
  const { REIMBURSE_SETTINGS } = REIMBURSEMENT;
  const { SETTINGS, BY_ID } = REIMBURSE_SETTINGS;

  const methods = useForm<ReimburseSettingsFormSchema>({
    resolver: zodResolver(reimburseSettingSchema),
    defaultValues: INIT_SETTING,
  });

  const {
    handleSubmit,
    getValues,
    formState: { errors },
    setError,
    reset,
  } = methods;
  const handleBack = () => {
    router.push('/reimbursement/reimburse-settings');
  };

  const { mutate: mutateSubmit, isLoading: isSubmitting } = useMutateData(
    ['settingPost'],
    !id ? SETTINGS : BY_ID(id),
    !id ? 'post' : 'put',
    {
      options: {
        onSuccess: () => {
          modal.success({
            title: 'Successfully',
            content: 'Your data has been successfully saved',
            onConfirm: () => {
              modal.closeConfirm();
              handleBack();
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
  const onSubmit = (data: ReimburseSettingsFormSchema) => {
    const {
      approvalLinesOptional,
      ...formData
    } = data;

    approvalLinesOptional.forEach((approval) => {
      if (approval.employeeId) {
        formData.approvalLines.push({
          line: 2,
          approvals: approval.approvals || { label: '', value: '' },
          employeeId: approval.employeeId || '',
        });
      }
    });

    const approvalLines = formData.approvalLines.map((item) => {
      const { approvals, ...rest } = item;
      return rest;
    });

    const projects = formData.projects.map((item) => {
      const { project, ...rest } = item || {};
      return rest;
    });

    mutateSubmit({
      ...formData,
      approvalLines,
      projects,
    });
  };

  const {
    data: settingData,
  } = useGetData<ReimburseSettingsFormSchema, ReimburseSettingDetail>(
    ['reimburseSettingDetail'],
    BY_ID(id),
    {
      options: {
        enabled: !!id,
      },
      normalizer: reimburseSettingFormNormalizer,
    },
  );

  useEffect(() => {
    reset(settingData);
  }, [settingData, reset]);

  return {
    handleSubmit,
    methods,
    handleBack,
    onSubmit,
    errors,
    getValues,
    isSubmitting,
  };
};

export default useReimburseSettingsForm;
