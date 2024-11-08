import { ENDPOINT } from '@/constants/apiURL';
import useGetData from '@/hooks/useGetData';

import upcomingPayrollNormalizer from './normalizers/upcomingPayrollNormalizer';
import type { UpcomingPayrollData } from './UpcomingPayroll.types';

const useUpcomingPayroll = () => {
  const { PAYROLL_DASHBOARD: { UPCOMING_PAYROLL } } = ENDPOINT;
  const {
    data: upcomingPayrollData,
    isLoading,
  } = useGetData<UpcomingPayrollData>(
    ['upcomingPayrollData'],
    UPCOMING_PAYROLL,
    {
      normalizer: upcomingPayrollNormalizer,
    },
  );

  return {
    isLoading,
    upcomingPayrollData,
  };
};

export default useUpcomingPayroll;
