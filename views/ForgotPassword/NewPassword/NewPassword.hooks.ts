import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { ENDPOINT } from '@/constants/apiURL';
import HTTP_CODE from '@/constants/httpCode';
import { useModalContext } from '@/contexts/ModalContext';
import { removeAuth } from '@/helpers';
import { usePostData } from '@/hooks/useMutateData';
import useToaster from '@/hooks/useToaster';

import type { NewPasswordSchema } from './NewPassword.schemas';
import { schema } from './NewPassword.schemas';
import type { NewPasswordProps, NewPasswordUrlLookup } from './NewPassword.types';

const useNewPassword = (props: NewPasswordProps) => {
  const {
    code: verificationCode = '',
    type: newPasswordType = 'reset-password',
  } = props;
  const modal = useModalContext();
  const toaster = useToaster();
  const router = useRouter();

  const { IDENTITY } = ENDPOINT;
  const {
    USER_ACTIVATION,
    FORGOT_PASSWORD,
    RESET_PASSWORD,
  } = IDENTITY;

  const [showPassword, setShowPassword] = useState([false, false]);
  const urlLookup: NewPasswordUrlLookup = {
    'admin-reset-password': RESET_PASSWORD,
    'reset-password': FORGOT_PASSWORD.COMPLETE,
    activation: USER_ACTIVATION,
  };

  const buttonTitleLookup: NewPasswordUrlLookup = {
    'admin-reset-password': 'Reset Password',
    'reset-password': 'Reset Password',
    activation: 'Activate your Account',
  };

  const buttonTitle = buttonTitleLookup[newPasswordType];

  const {
    control,
    handleSubmit,
    setError,
    setValue,
  } = useForm<NewPasswordSchema>({
    resolver: zodResolver(schema),
  });

  // useEffect for handling set code value from url query params
  useEffect(() => {
    setValue('id', String(verificationCode));
  }, [verificationCode, setValue]);

  const {
    mutate: mutateSubmit,
    isLoading: isSubmitting,
  } = usePostData(
    ['newPassword'],
    urlLookup[newPasswordType],
    {
      options: {
        onSuccess: () => {
          modal.success({
            title: 'Successfully',
            content: newPasswordType === 'activation'
              ? 'Your account has been activated successfully. You can now use your username and password to log in'
              : 'Your password has been changed. You can now use your username and your new password to log in',
            onConfirm: () => {
              modal.closeConfirm();
              removeAuth();
              router.push('/login');
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

  const toggleShowPassword = (i: number) => {
    setShowPassword((prevState) => {
      const newState = [...prevState];
      newState[i] = !newState[i];
      return newState;
    });
  };

  const onSubmit = (data: NewPasswordSchema) => {
    if (newPasswordType === 'reset-password') {
      mutateSubmit(data);
      return;
    }
    const formData = {
      code: data.id,
      newPassword: data.password,
    };
    mutateSubmit(formData);
  };

  return {
    buttonTitle,
    control,
    handleSubmit,
    isSubmitting,
    showPassword,
    onSubmit,
    toggleShowPassword,
  };
};

export default useNewPassword;
