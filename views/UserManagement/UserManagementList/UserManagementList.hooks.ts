import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { ENDPOINT } from '@/constants/apiURL';
import { useModalContext } from '@/contexts/ModalContext';
import useGetData from '@/hooks/useGetData';
import { useDeleteData, usePostData } from '@/hooks/useMutateData';
import useQueryParams from '@/hooks/useQueryParams';
import { userListNormalizer } from '@/normalizers';
import type { User, UserList, UserListResponse } from '@/types/user';
import { createQueryParams } from '@/utils';

const useUserManagementList = () => {
  const router = useRouter();
  const modal = useModalContext();
  const {
    queryParams,
    onPageChange,
    onPageSizeChange,
    onSearchChange,
    onSortChange,
  } = useQueryParams();

  const { USER_MGMT } = ENDPOINT;
  const [selectedId, setSelectedId] = useState('');

  const handleDetail = (id: string) => {
    router.push(`/user-access-management/${id}`);
  };

  const handleEdit = (id: string) => {
    router.push(`/user-access-management/edit/${id}`);
  };

  const {
    data,
    isLoading,
    refetch,
  } = useGetData<UserListResponse>(
    ['userList', createQueryParams(queryParams || {})],
    USER_MGMT.USERS,
    {
      params: queryParams,
      normalizer: userListNormalizer,
    },
  );

  const { mutate: mutateResendActivation } = usePostData(
    ['userResendActivation'],
    USER_MGMT.RESEND_ACTIVATION(selectedId),
    {
      options: {
        onSuccess: () => {
          modal.closeConfirm();
          refetch();
          modal.success({
            title: 'Successfully',
            content: 'Email successfully sent',
            onConfirm: () => modal.closeConfirm(),
          });
        },
        onError: (error) => {
          const { response } = error || {};
          const { data: errorData } = response || {};
          const { message } = errorData || {};
          modal.confirm({
            title: 'Data cannot be deleted',
            content: message || 'Terjadi kesalahan pada server',
            showCancel: false,
            onConfirm: () => modal.closeConfirm(),
            onCancel: () => modal.closeConfirm(),
          });
        },
      },
    },
  );

  const handleSendActivation = (userData: UserList) => {
    setSelectedId(userData.userId);
    modal.confirm({
      title: 'Resend Activation E-Mail?',
      content: `Are you sure you want to resend activation e-mail to "${userData.email}"?`,
      buttonProps: {
        confirm: {
          label: 'Send',
        },
      },
      onConfirm: () => {
        modal.setConfirmLoading(true);
        mutateResendActivation({});
      },
      onCancel: () => modal.closeConfirm(),
    });
  };

  const { mutate: mutateDelete } = useDeleteData(
    ['userDelete'],
    USER_MGMT.USERS_BY_ID(selectedId),
    {
      options: {
        onSuccess: () => {
          modal.closeConfirm();
          refetch();
          modal.success({
            title: 'Successfully',
            content: 'Selected data successfully deleted',
            onConfirm: () => modal.closeConfirm(),
          });
        },
        onError: (error) => {
          const { response } = error || {};
          const { data: errorData } = response || {};
          const { message } = errorData || {};
          modal.confirm({
            title: 'Data cannot be deleted',
            content: message || 'Terjadi kesalahan pada server',
            showCancel: false,
            onConfirm: () => modal.closeConfirm(),
            onCancel: () => modal.closeConfirm(),
          });
        },
      },
    },
  );

  const handleDelete = (userData: User) => {
    setSelectedId(userData.userId);
    modal.confirm({
      title: 'Delete selected data?',
      content: `Are you sure you want to delete this data? \n
                If you proceed to delete it, then ${userData.fullName} will be deleted also \
                from master employee, payroll data, etc.`,
      buttonProps: {
        confirm: {
          label: 'Delete',
        },
      },
      onConfirm: () => {
        modal.setConfirmLoading(true);
        mutateDelete({});
      },
      onCancel: () => modal.closeConfirm(),
      danger: true,
    });
  };

  return {
    data,
    isLoading,
    queryParams,
    handleDelete,
    handleDetail,
    handleEdit,
    handleSendActivation,
    onPageChange,
    onPageSizeChange,
    onSearchChange,
    onSortChange,
  };
};

export default useUserManagementList;
