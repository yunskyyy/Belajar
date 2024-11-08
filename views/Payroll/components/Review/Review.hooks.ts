import { useMemo, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { ENDPOINT } from '@/constants/apiURL';
import { useModalContext } from '@/contexts/ModalContext';
import useGetData from '@/hooks/useGetData';
import { useMutateData } from '@/hooks/useMutateData';
import { formatDateApi } from '@/utils';
import cutOffPeriodPayrollNormalizer from '@/views/Payroll/normalizers/cutOffPeriodNormalizer';
import type { RunPayrollComponentProps } from '@/views/Payroll/types/runPayrollFormComponents';
import type {
  CutOffPeriod,
} from '@/views/Payroll/views/RunPayroll/RunPayrollForm/components/PayrollPeriod/PayrollPeriod.types';

import detailRunPayrollNormalizer from '../../normalizers/detailRunPayrollNormalizer';
import type { DetailRunPayroll } from '../../types/detailRunPayroll';

const useReview = (props: RunPayrollComponentProps) => {
  const { id = '' } = props;
  const router = useRouter();
  const pathname = usePathname();
  const modal = useModalContext();
  const isEdit = useMemo(() => pathname.includes('edit'), [pathname]);
  const isPayroll = useMemo(() => pathname.includes('run-payroll'), [pathname]);
  const [openDownloadSalary, setOpenDownloadSalary] = useState(false);

  const { DISBURSEMENT_MGMT, RUN_THR_MGMT } = ENDPOINT;
  const { RUN_PAYROLL_BY_ID, SAVE_RUN_PAYROLL, CUT_OFF_PERIOD } = DISBURSEMENT_MGMT;
  const { RUN_THR_BY_ID, SAVE_RUN_THR } = RUN_THR_MGMT;

  const {
    data: dataRunPayroll, isLoading,
  } = useGetData<DetailRunPayroll>(
    ['detailPayrollReview'],
    isPayroll ? RUN_PAYROLL_BY_ID(String(id)) : RUN_THR_BY_ID(id),
    {
      normalizer: detailRunPayrollNormalizer,
    },
  );

  const handleDownloadSalary = () => {
    setOpenDownloadSalary(true);
  };

  const handleCloseDownloadSalary = () => {
    setOpenDownloadSalary(false);
  };

  const {
    periodDate = '',
  } = dataRunPayroll || {};
  const {
    data: cutOffPeriod,
    isLoading: cutOffPeriodLoading,
  } = useGetData<CutOffPeriod>(
    ['cutOffPeriod-Payroll'],
    CUT_OFF_PERIOD,
    {
      params: {
        period:
          formatDateApi(
            new Date(periodDate),
          ),
      },
      options: {
        enabled: !!dataRunPayroll,
      },
      normalizer: cutOffPeriodPayrollNormalizer,
    },
  );

  const {
    mutate: mutateSaveRunPayroll,
  } = useMutateData(
    ['save'],
    isPayroll ? SAVE_RUN_PAYROLL(id) : SAVE_RUN_THR(id),
    isPayroll ? 'post' : 'patch',
    {
      options: {
        onSuccess: () => {
          modal.success({
            title: 'Successfully',
            content: 'Your Data has been successfully saved',
            onConfirm: () => {
              modal.closeConfirm();
              router.push(`/payroll/disbursement/run-${isPayroll ? 'payroll' : 'thr'}`);
            },
          });
        },
        onError: (error) => {
          const { response } = error || {};
          const { data } = response || {};
          const { message } = data || {};
          modal.confirm({
            title: 'Error',
            content: message || 'Terjadi kesalahan pada server',
            showCancel: false,
            onConfirm: () => modal.closeConfirm(),
            onCancel: () => modal.closeConfirm(),
          });
        },
      },
    },
  );

  const handleSave = () => {
    mutateSaveRunPayroll(id);
  };

  const handleDraft = () => {
    modal.success({
      title: 'Successfully',
      content: 'Your Data has been successfully saved',
      onConfirm: () => {
        modal.closeConfirm();
        router.push(`/payroll/disbursement/run-${isPayroll ? 'payroll' : 'thr'}`);
      },
    });
  };

  return {
    dataRunPayroll,
    isEdit,
    isLoading,
    isPayroll,
    openDownloadSalary,
    cutOffPeriod,
    cutOffPeriodLoading,
    handleCloseDownloadSalary,
    handleDownloadSalary,
    handleSave,
    handleDraft,
  };
};

export default useReview;
