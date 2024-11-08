import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { ENDPOINT } from '@/constants/apiURL';
import HTTP_CODE from '@/constants/httpCode';
import { useModalContext } from '@/contexts/ModalContext';
import { usePostData } from '@/hooks/useMutateData';
import useToaster from '@/hooks/useToaster';

import type { ForgotPasswordSchema } from './ForgotPassword.schemas';
import { schema } from './ForgotPassword.schemas';

const useForgotPassword = () => {
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
    formState: { errors },
  } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(schema),
  });

  const handleBack = () => {
    router.push('/login');
  };

  const {
    mutate: mutateSubmit,
    isLoading: isSubmitting,
  } = usePostData<{ identifierId: string }>(
    ['forgotPassword'],
    FORGOT_PASSWORD.REQUEST,
    {
      options: {
        onSuccess: ({ identifierId }) => {
          modal.success({
            title: 'Successfully',
            content: 'Your verification code has been sent, please check your email',
            onConfirm: () => {
              modal.closeConfirm();
              router.push(`/forgot-password/verify?identifierId=${identifierId}`);
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
                `${propertyName.charAt(0).toLowerCase()}${propertyName.slice(
                  1,
                )}` as 'root',
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

  const onSubmit = (data: ForgotPasswordSchema) => {
    mutateSubmit(data);
  };

  return {
    control,
    errors,
    handleSubmit,
    isSubmitting,
    register,
    handleBack,
    onSubmit,
  };
};

export default useForgotPassword;
