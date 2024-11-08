import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { startOfMonth } from 'date-fns';

import { ENDPOINT } from '@/constants/apiURL';
import { useModalContext } from '@/contexts/ModalContext';
import useGetData from '@/hooks/useGetData';
import { useDeleteData } from '@/hooks/useMutateData';
import useQueryParams from '@/hooks/useQueryParams';
import { createQueryParams, formatDateApi } from '@/utils';

import runPayrollListNormalizer from './normalizers/runPayrollListNormalizer';
import { TABLE_COLUMNS } from './RunPayrollList.constants';
import type { RunPayrollData } from './RunPayrollList.types';

const useRunPayroll = () => {
  const {
    queryParams,
    onPageChange,
    onPageSizeChange,
    onSortChange,
    onFilterChange,
  } = useQueryParams();

  const router = useRouter();
  const { DISBURSEMENT_MGMT } = ENDPOINT;
  const { PAYROLL, RUN_PAYROLL_BY_ID } = DISBURSEMENT_MGMT;
  const modal = useModalContext();
  const [selectedId, setSelectedId] = useState('');
  const [payrollId, setPayrollId] = useState('');
  const [openDownloadSalary, setOpenDownloadSalary] = useState(false);

  const tableColumns = TABLE_COLUMNS;

  const {
    data: listRunpayroll,
    isLoading,
    refetch: refetchRunPayrollData,
  } = useGetData(
    ['Disbursement-Payroll', createQueryParams(queryParams)],
    PAYROLL,
    {
      normalizer: runPayrollListNormalizer,
      params: queryParams,
    },
  );

  const { mutate: mutateDelete } = useDeleteData(
    ['positionDelete'],
    RUN_PAYROLL_BY_ID(selectedId),
    {
      options: {
        onSuccess: () => {
          modal.closeConfirm();
          refetchRunPayrollData();
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

  const handleDelete = (dataRunPayroll: RunPayrollData) => {
    setSelectedId(dataRunPayroll.payrollDisbursementId);
    modal.confirm({
      title: 'Delete selected data?',
      content: 'Are you sure you want to delete this run payroll data?',
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

  const handleEdit = (id: string) => {
    router.push(`/payroll/disbursement/run-payroll/edit/${id}`);
  };

  const handleDetail = (id: string) => {
    router.push(`/payroll/disbursement/run-payroll/${id}`);
  };

  const handleDownloadSalary = (payrollDisbursementId: string) => {
    setPayrollId(payrollDisbursementId);
    setOpenDownloadSalary(true);
  };

  const handleCloseDownloadSalary = () => {
    setOpenDownloadSalary(false);
  };

  const handleFilterChange = (value: Record<string, unknown>) => {
    if (value.period) {
      onFilterChange({
        ...value,
        period: formatDateApi(startOfMonth(new Date(String(value.period)))),
      });
      return;
    }
    onFilterChange(value);
  };

  return {
    tableColumns,
    listRunpayroll,
    isLoading,
    openDownloadSalary,
    payrollId,
    queryParams,
    handleCloseDownloadSalary,
    handleDelete,
    handleDownloadSalary,
    handleEdit,
    handleFilterChange,
    onSortChange,
    onPageSizeChange,
    onPageChange,
    handleDetail,
  };
};

export default useRunPayroll;
