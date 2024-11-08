import { useRouter } from 'next/navigation';

import { startOfMonth } from 'date-fns';

import { ENDPOINT } from '@/constants/apiURL';
import useGetData from '@/hooks/useGetData';
import useQueryParams from '@/hooks/useQueryParams';
import { createQueryParams, formatDateApi } from '@/utils';

import payslipListNormalizers from './normalizers/payslipListNormalizers';
import type { PayslipList } from './PayslipPayroll.types';

const usePayslipPayroll = () => {
  const {
    queryParams,
    onFilterChange,
    onPageChange,
    onPageSizeChange,
    onSortChange,
  } = useQueryParams();
  const router = useRouter();

  const { PAYSLIP_MGMT: { PAYSLIP } } = ENDPOINT;

  const {
    data: payslipData,
    isLoading,
  } = useGetData<PayslipList>(
    ['payslipData', createQueryParams(queryParams)],
    PAYSLIP,
    {
      normalizer: payslipListNormalizers,
      params: queryParams,
    },
  );

  const handleDetail = (id: string) => {
    router.push(`/payroll/payslip/payslip-payroll/${id}`);
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
    isLoading,
    payslipData,
    queryParams,
    handleDetail,
    handleFilterChange,
    onPageChange,
    onPageSizeChange,
    onSortChange,
  };
};

export default usePayslipPayroll;
