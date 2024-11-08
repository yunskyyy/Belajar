import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { ENDPOINT } from '@/constants/apiURL';
import { useModalContext } from '@/contexts/ModalContext';
import useGetData from '@/hooks/useGetData';
import { usePostData } from '@/hooks/useMutateData';
import useQueryParams from '@/hooks/useQueryParams';
import useToaster from '@/hooks/useToaster';
import { createQueryParams } from '@/utils';

import payslipEmployeeListNormalizer from './normalizers/payslipEmployeeListNormalizer';
import type { PayslipEmployeeList, PayslipPayrollDetailProps } from './PayslipPayrollDetail.types';

const usePayslipPayrollDetail = (props: PayslipPayrollDetailProps) => {
  const modal = useModalContext();
  const toaster = useToaster();

  const { id } = props;
  const {
    queryParams,
    onFilterChange,
    onPageChange,
    onPageSizeChange,
    onSearchChange,
    onSortChange,
  } = useQueryParams();
  const router = useRouter();
  const {
    PAYSLIP_MGMT: {
      EMPLOYEE_LIST_BY_ID,
      SEND_EMAIL_BY_ID,
    },
  } = ENDPOINT;

  const [selectedRowId, setSelectedRowId] = useState(['']);
  const [selectAll, setSelectAll] = useState(false);

  const {
    data: payslipEmployeeData,
    isLoading,
    refetch,
  } = useGetData<PayslipEmployeeList>(
    ['payslipEmployees', id, createQueryParams(queryParams)],
    EMPLOYEE_LIST_BY_ID(id),
    {
      normalizer: payslipEmployeeListNormalizer,
      params: queryParams,
    },
  );
  const handleQueryUpdate = () => {
    setSelectedRowId([]);
    setSelectAll(false);
  };

  useEffect(() => {
    if (payslipEmployeeData) {
      handleQueryUpdate();
    }
  }, [payslipEmployeeData]);

  const handleViewPayslip = (employeeId: string) => {
    router.push(`/payroll/payslip/payslip-payroll/${id}/viewer/${employeeId}`);
  };

  const {
    mutate: mutateSendPayslipEmployee,
    isLoading: sendingEmail,
  } = usePostData(
    ['sendEmailEmployee'],
    SEND_EMAIL_BY_ID(),
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
            title: 'Email Cannot Be Sent',
            content: message || 'Terjadi kesalahan pada server',
            showCancel: false,
            onConfirm: () => modal.closeConfirm(),
            onCancel: () => modal.closeConfirm(),
          });
        },
      },
    },
  );

  const handleSendEmailEmployee = (userId: string) => {
    mutateSendPayslipEmployee({ userId, payrollId: id });
  };

  const handlSendEmailSelectedEmployee = () => {
    if (selectedRowId.length !== 0) {
      mutateSendPayslipEmployee({ userId: selectedRowId, payrollId: id });
      return;
    }
    toaster.error('Please select employee before send email payslip');
  };

  const handleSelectAll = (select: boolean) => {
    setSelectAll(select);
  };

  return {
    isLoading,
    payslipEmployeeData,
    queryParams,
    handleViewPayslip,
    onFilterChange,
    onPageChange,
    onPageSizeChange,
    onSearchChange,
    onSortChange,
    handleSendEmailEmployee,
    selectedRowId,
    setSelectedRowId,
    selectAll,
    handleSelectAll,
    handlSendEmailSelectedEmployee,
    sendingEmail,
  };
};

export default usePayslipPayrollDetail;
