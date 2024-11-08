import type { DashboardSummary } from '../SummaryWidget.types';

const dashboardSummaryNormalizer = ({
  totalPaidOvertime = 0,
  totalPaidOnsite = 0,
  totalUnpaidOnsite = 0,
  totalUnpaidOvertime = 0,
  totalTHR = 0,
  totalPayroll = 0,
}: DashboardSummary): DashboardSummary => ({
  totalPaidOvertime,
  totalPaidOnsite,
  totalUnpaidOnsite,
  totalUnpaidOvertime,
  totalTHR,
  totalPayroll,
});

export default dashboardSummaryNormalizer;
