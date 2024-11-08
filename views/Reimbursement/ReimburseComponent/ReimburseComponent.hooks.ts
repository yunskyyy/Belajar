import { useState } from 'react';

import { ENDPOINT } from '@/constants/apiURL';
import { useModalContext } from '@/contexts/ModalContext';
import useGetData from '@/hooks/useGetData';
import { useDeleteData } from '@/hooks/useMutateData';
import useQueryParams from '@/hooks/useQueryParams';
import { createQueryParams } from '@/utils';

import reimburseComponentListNormalizer
  from './normalizers/reimburseComponentListNormalizer';
import { TABLE_COLUMNS } from './ReimburseComponent.constants';

const useReimburseComponent = () => {
  const modal = useModalContext();
  const { REIMBURSEMENT } = ENDPOINT;
  const { REIMBURSE_COMPONENT } = REIMBURSEMENT;
  const { COMPONENT, BY_ID } = REIMBURSE_COMPONENT;

  const tableColumns = TABLE_COLUMNS;

  const [componentModal, setComponentModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedComponentId, setSelectedComponentId] = useState('');

  const {
    queryParams,
    onPageChange,
    onPageSizeChange,
    onSortChange,
    onFilterChange,
    onSearchChange,
  } = useQueryParams();

  const {
    data: componentData,
    isLoading,
    refetch: refecthComponentData,
  } = useGetData(
    ['componentList', createQueryParams(queryParams)],
    COMPONENT,
    {
      normalizer: reimburseComponentListNormalizer,
      params: queryParams,
    },
  );

  const openModal = () => {
    setComponentModal(true);
  };

  const closeComponentModal = () => {
    setSelectedComponentId('');
    setComponentModal(false);
    refecthComponentData();
  };

  const handleEdit = (reimbursementCategoryId: string) => {
    setSelectedComponentId(reimbursementCategoryId);
    setIsEdit(true);
    setComponentModal(true);
  };
  const {
    mutate: mutateDelete,
  } = useDeleteData(
    ['componentDelete'],
    BY_ID(selectedComponentId),
    {
      options: {
        onSuccess: () => {
          modal.closeConfirm();
          refecthComponentData();
          setSelectedComponentId('');
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
          setSelectedComponentId('');
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
  const handleDelete = (reimbursementCategoryId : string, category: string) => {
    setSelectedComponentId(reimbursementCategoryId);
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
        setSelectedComponentId('');
        modal.closeConfirm();
      },
      onClose: () => {
        setSelectedComponentId('');
        modal.closeConfirm();
      },
      danger: true,
    });
  };

  return {
    componentData,
    tableColumns,
    isLoading,
    queryParams,
    componentModal,
    selectedComponentId,
    isEdit,
    onPageChange,
    onPageSizeChange,
    onSortChange,
    onFilterChange,
    onSearchChange,
    openModal,
    closeComponentModal,
    setIsEdit,
    handleEdit,
    handleDelete,
  };
};

export default useReimburseComponent;
