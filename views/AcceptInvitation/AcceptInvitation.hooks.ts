import { useRouter } from 'next/navigation';

import { ENDPOINT } from '@/constants/apiURL';
import { useModalContext } from '@/contexts/ModalContext';
import StatusActivation from '@/enums/statusActivation';
import { removeAuth } from '@/helpers';
import useGetData from '@/hooks/useGetData';
import { usePostData } from '@/hooks/useMutateData';
import useToaster from '@/hooks/useToaster';

import invitationStatusNormalizer from './normalizers/invitationStatusNormalizer';
import type { AcceptInvitationProps, InvitationStatus } from './AcceptInvitation.types';

const useAcceptInvitation = (props: AcceptInvitationProps) => {
  const { code: verificationCode = '' } = props;
  const modal = useModalContext();
  const toaster = useToaster();
  const router = useRouter();

  const { IDENTITY } = ENDPOINT;
  const { ACCEPT_INVITATION, USER_ACTIVATION } = IDENTITY;

  const {
    data: userActivationStatus,
    isLoading,
  } = useGetData<InvitationStatus>(
    ['userActivationStatus', verificationCode],
    USER_ACTIVATION,
    {
      params: { code: verificationCode },
      options: {
        enabled: !!verificationCode,
      },
      normalizer: invitationStatusNormalizer,
    },
  );

  const {
    mutate: mutateSubmit,
    isLoading: isSubmitting,
  } = usePostData(
    ['acceptInvitation'],
    ACCEPT_INVITATION,
    {
      options: {
        onSuccess: () => {
          modal.success({
            title: 'Successfully',
            content: 'Invitation has been accepted. You can now use your username and password to log in to your organization',
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
          const { message } = data || {};
          toaster.error(message || 'Terjadi kesalahan pada server');
        },
      },
    },
  );

  const onSubmit = () => {
    const { isValid, statusActivation } = userActivationStatus || {};
    if (isValid && statusActivation === StatusActivation.ActivationOnly) {
      mutateSubmit({ code: verificationCode });
      return;
    }
    router.push(`/activation?code=${verificationCode}`);
  };

  return {
    isLoading,
    isSubmitting,
    onSubmit,
  };
};

export default useAcceptInvitation;
