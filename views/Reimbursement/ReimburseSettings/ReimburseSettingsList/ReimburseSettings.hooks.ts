import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { ENDPOINT } from '@/constants/apiURL';
import { useModalContext } from '@/contexts/ModalContext';
import useGetData from '@/hooks/useGetData';
import { useDeleteData } from '@/hooks/useMutateData';
import useQueryParams from '@/hooks/useQueryParams';
import { filterOptionNormalizer } from '@/normalizers';
import type { SelectItem } from '@/types/inputs';
import type { SearchOptions } from '@/types/responses';
import { createQueryParams } from '@/utils';

import reimburseSettingListNormalizer
  from './normalizers/ReimburseSettingListNormalizer';
import { TABLE_COLUMNS } from './ReimburseSettings.constants';

const useReimburseSettings = () => {
  const router = useRouter();
  const modal = useModalContext();
  const { REIMBURSEMENT: { REIMBURSE_SETTINGS } } = ENDPOINT;
  const {
    SETTINGS, TYPES, CATEGORIES, BY_ID,
  } = REIMBURSE_SETTINGS;

  const [selectedSettingId, setSelectedSettingId] = useState('');

  const {
    data: typeFilterOption = [],
  } = useGetData<SelectItem[], SearchOptions>(
    ['typeFilterOption'],
    TYPES,
    {
      normalizer: filterOptionNormalizer,
    },
  );

  const {
    data: categoryFilterOption = [],
  } = useGetData<SelectItem[], SearchOptions>(
    ['categoryFilterOption'],
    CATEGORIES,
    {
      normalizer: filterOptionNormalizer,
    },
  );

  const tableColumns = TABLE_COLUMNS({
    categoryFilterOption,
    typeFilterOption,
  });
  const {
    queryParams,
    onPageChange,
    onPageSizeChange,
    onSortChange,
    onFilterChange,
    onSearchChange,
  } = useQueryParams();

  const {
    data: settingsData,
    isLoading,
    refetch: refecthSettingData,
  } = useGetData(
    ['settingsList', createQueryParams(queryParams)],
    SETTINGS,
    {
      normalizer: reimburseSettingListNormalizer,
      params: queryParams,
    },
  );

  const {
    mutate: mutateDelete,
  } = useDeleteData(
    ['settingDelete'],
    BY_ID(selectedSettingId),
    {
      options: {
        onSuccess: () => {
          modal.closeConfirm();
          refecthSettingData();
          setSelectedSettingId('');
          modal.success({
            title: 'Successfully',
            content: 'Selected data successfully deleted',
            onConfirm: () => modal.closeConfirm(),
          });
        },
        onError: (error) => {
          const { response } = error || {};
          const { data } = response || {};
          const { message } = data || {};
          setSelectedSettingId('');
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
  const handleDelete = (reimbursementSettingId : string, category: string) => {
    setSelectedSettingId(reimbursementSettingId);
    modal.confirm({
      title: 'Delete selected data?',
      content: `Are you sure you want to delete "${category}" Component?`,
      buttonProps: {
        confirm: {
          label: 'Delete',
        },
      },
      onConfirm: () => {
        modal.setConfirmLoading(true);
        mutateDelete({});
      },
      onCancel: () => {
        setSelectedSettingId('');
        modal.closeConfirm();
      },
      onClose: () => {
        setSelectedSettingId('');
        modal.closeConfirm();
      },
      danger: true,
    });
  };

  const handleEdit = (id: string) => {
    router.push(`/reimbursement/reimburse-settings/edit/${id}`);
  };

  const handleDetail = (id: string) => {
    router.push(`/reimbursement/reimburse-settings/${id}`);
  };

  return {
    settingsData,
    queryParams,
    tableColumns,
    isLoading,
    onPageChange,
    onPageSizeChange,
    onSortChange,
    onFilterChange,
    onSearchChange,
    handleDelete,
    handleEdit,
    handleDetail,
  };
};

export default useReimburseSettings;
