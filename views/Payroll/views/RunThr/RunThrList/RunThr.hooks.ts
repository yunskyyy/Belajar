import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { ENDPOINT } from '@/constants/apiURL';
import { useModalContext } from '@/contexts/ModalContext';
import useGetData from '@/hooks/useGetData';
import { useDeleteData } from '@/hooks/useMutateData';
import useQueryParams from '@/hooks/useQueryParams';
import { createQueryParams } from '@/utils';

import runThrListNormalizer from './normalizers/runThrListNormalizer';
import { TABLE_COLUMNS } from './RunThr.constants';
import type { RunThrData } from './RunThr.types';

const useRunThr = () => {
  const modal = useModalContext();
  const router = useRouter();
  const [selectedId, setSelectedId] = useState('');
  const [runTHrId, setRunThrId] = useState('');
  const [openDownloadSalary, setOpenDownloadSalary] = useState(false);
  const { RUN_THR_MGMT } = ENDPOINT;
  const { RUN_THR, RUN_THR_BY_ID } = RUN_THR_MGMT;

  const tableColumns = TABLE_COLUMNS;

  const {
    queryParams,
    onPageChange,
    onPageSizeChange,
    onSortChange,
    onFilterChange,
  } = useQueryParams();

  const handleEdit = (id: string) => {
    router.push(`/payroll/disbursement/run-thr/edit/${id}`);
  };

  const {
    data: runThrData,
    isLoading,
    refetch: refetchRunThrData,
  } = useGetData(
    ['runThrList', createQueryParams(queryParams)],
    RUN_THR,
    {
      normalizer: runThrListNormalizer,
      params: queryParams,
    },
  );

  const { mutate: mutateDelete } = useDeleteData(
    ['runThrDelete'],
    RUN_THR_BY_ID(selectedId),
    {
      options: {
        onSuccess: () => {
          modal.closeConfirm();
          refetchRunThrData();
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

  const handleDelete = (data: RunThrData) => {
    setSelectedId(data.holidayAllowanceDisbursementId);
    modal.confirm({
      title: 'Delete selected data?',
      content: 'Are you sure you want to delete this run THR data?',
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

  const handleDownloadSalary = (runThrId: string) => {
    setRunThrId(runThrId);
    setOpenDownloadSalary(true);
  };

  const handleCloseDownloadSalary = () => {
    setOpenDownloadSalary(false);
  };

  return {
    tableColumns,
    runThrData,
    isLoading,
    queryParams,
    onPageChange,
    onPageSizeChange,
    onSortChange,
    onFilterChange,
    handleDelete,
    handleEdit,
    runTHrId,
    openDownloadSalary,
    handleCloseDownloadSalary,
    handleDownloadSalary,
  };
};

export default useRunThr;
