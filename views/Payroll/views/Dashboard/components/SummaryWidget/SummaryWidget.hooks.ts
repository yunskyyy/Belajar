import { ENDPOINT } from '@/constants/apiURL';
import useGetData from '@/hooks/useGetData';

import dashboardSummaryNormalizer from './normalizers/dashboardSummaryNormalizer';
import type { DashboardSummary } from './SummaryWidget.types';

const useSummaryWidget = () => {
  const { PAYROLL_DASHBOARD: { SUMMARY } } = ENDPOINT;
  const {
    data: summaryData,
    isLoading,
  } = useGetData<DashboardSummary>(
    ['summaryData'],
    SUMMARY,
    {
      normalizer: dashboardSummaryNormalizer,
    },
  );

  return {
    isLoading,
    summaryData,
  };
};

export default useSummaryWidget;
