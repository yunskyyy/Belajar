import { useMemo } from 'react';
import { useRouter } from 'next/navigation';

import { ENDPOINT } from '@/constants/apiURL';
import { useModalContext } from '@/contexts/ModalContext';
import useGetData from '@/hooks/useGetData';
import { usePostData } from '@/hooks/useMutateData';
import type { User } from '@/types/user';
import userNormalizer from '@/views/UserManagement/normalizers/userNormalizer';

import applicationScopesNormalizer from '../normalizers/applicationScopesNormalizer';
import type { ApplicationScopes } from '../types/applicationScope';

const useUserManagementDetail = (id: string) => {
  const router = useRouter();
  const modal = useModalContext();
  const { USER_MGMT } = ENDPOINT;
  const { USERS_BY_ID, SCOPES, RESET_PASSWORD } = USER_MGMT;

  const {
    data: userData,
    isLoading: isLoadingUserData,
  } = useGetData<User>(
    ['userDetail', String(id)],
    USERS_BY_ID(String(id)),
    {
      normalizer: userNormalizer,
      options: {
        enabled: !!id,
      },
    },
  );

  const {
    data: scopes = [],
    isLoading: isLoadingScopes,
  } = useGetData<ApplicationScopes>(
    ['userScopes'],
    SCOPES,
    {
      normalizer: applicationScopesNormalizer,
    },
  );

  const { scopes: userScopes = [] } = userData || {};

  const filteredUserScopes = useMemo(() => (
    scopes.map((appScope) => {
      const val = appScope.scopes.filter((scope) => userScopes.includes(scope.name));
      return { ...appScope, scopes: val };
    })
  ), [scopes, userScopes]);

  const handleBack = () => {
    router.back();
  };

  const { mutate: mutateRequestResetPassword, isLoading: isMutatingRequest } = usePostData(
    ['requestResetPassword'],
    RESET_PASSWORD(id),
    {
      options: {
        onSuccess: () => {
          modal.confirm({
            title: 'Generate Password',
            content: 'Password has been successfully created. Please check the email you registered',
            showCancel: false,
            onConfirm: () => modal.closeConfirm(),
          });
        },
        onError: (error) => {
          const { response } = error || {};
          const { data } = response || {};
          const { message } = data || {};
          modal.confirm({
            title: 'Generate Password',
            content: message || 'Terjadi kesalahan pada server',
            showCancel: false,
            onConfirm: () => modal.closeConfirm(),
          });
        },
      },
    },
  );

  const handleResetPassword = () => {
    mutateRequestResetPassword({});
  };

  return {
    filteredUserScopes,
    isLoadingScopes,
    isLoadingUserData,
    isMutatingRequest,
    userData,
    handleBack,
    handleResetPassword,
  };
};

export default useUserManagementDetail;
