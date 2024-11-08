import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { ENDPOINT } from '@/constants/apiURL';
import HTTP_CODE from '@/constants/httpCode';
import { useModalContext } from '@/contexts/ModalContext';
import { usePostData } from '@/hooks/useMutateData';
import useToaster from '@/hooks/useToaster';

import type { ForgotPasswordVerificationSchema } from './ForgotPasswordVerification.schemas';
import { schema } from './ForgotPasswordVerification.schemas';
import type { ForgotPasswordVerificationProps } from './ForgotPasswordVerification.types';

const useForgotPassword = (props: ForgotPasswordVerificationProps) => {
  const { identifierId } = props;

  const router = useRouter();
  const modal = useModalContext();
  const toaster = useToaster();

  const { IDENTITY } = ENDPOINT;
  const { FORGOT_PASSWORD } = IDENTITY;

  const {
    control,
    register,
    handleSubmit,
    setError,
    setValue,
  } = useForm<ForgotPasswordVerificationSchema>({
    resolver: zodResolver(schema),
  });

  // useEffect for handling set id value from url query params
  useEffect(() => {
    setValue('id', String(identifierId));
  }, [identifierId, setValue]);

  const {
    mutate: mutateSubmit,
    isLoading: isSubmitting,
  } = usePostData<{ identifierId: string }>(
    ['forgotPasswordVerification'],
    FORGOT_PASSWORD.VALIDATE,
    {
      options: {
        onSuccess: () => {
          modal.success({
            title: 'Successfully',
            content: 'Your verification is successful',
            onConfirm: () => {
              modal.closeConfirm();
              router.push(`/forgot-password/reset-password?identifierId=${identifierId}`);
            },
          });
        },
        onError: (error) => {
          const { response } = error || {};
          const { data } = response || {};
          const { message, code, payload } = data || {};
          if (code === HTTP_CODE.badRequest && payload) {
            (payload || []).forEach((el) => {
              const { propertyName, message: payloadMessage } = el;
              setError(
                propertyName as 'root',
                { type: 'custom', message: payloadMessage },
              );
            });
            return;
          }
          toaster.error(message || 'Terjadi kesalahan pada server');
        },
      },
    },
  );

  const onSubmit = (data: ForgotPasswordVerificationSchema) => {
    mutateSubmit(data);
  };

  return {
    control,
    handleSubmit,
    isSubmitting,
    register,
    onSubmit,
  };
};

export default useForgotPassword;
