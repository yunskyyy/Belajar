import {
  IcOvertimePaid,
  IcOvertimeUnpaid,
  IcPaidOnsite,
  IcPayrollPerYear,
  IcThrPerYerar,
  IcUnpaidOnsite,
} from '@/components/icons';

import Widget from '../Widget';

import useSummaryWidget from './SummaryWidget.hooks';

const SummaryWidget = () => {
  const {
    isLoading,
    summaryData,
  } = useSummaryWidget();

  const {
    totalTHR = 0,
    totalPayroll = 0,
    totalPaidOnsite = 0,
    totalPaidOvertime = 0,
    totalUnpaidOnsite = 0,
    totalUnpaidOvertime = 0,
  } = summaryData || {};
  return (
    <div className="grid grid-cols-2 gap-6">
      <Widget
        label="Total Payroll Current Year"
        icon={<IcPayrollPerYear />}
        value={totalPayroll}
        loading={isLoading}
      />
      <Widget
        label="Total THR Current Year"
        icon={<IcThrPerYerar />}
        value={totalTHR}
        loading={isLoading}
      />
      <Widget
        label="Unpaid Overtime"
        icon={<IcOvertimeUnpaid />}
        value={totalUnpaidOvertime}
        loading={isLoading}
      />
      <Widget
        label="Paid Overtime"
        icon={<IcOvertimePaid />}
        value={totalPaidOvertime}
        loading={isLoading}
      />
      <Widget
        label="Unpaid Onsite & Incentives"
        icon={<IcUnpaidOnsite />}
        value={totalUnpaidOnsite}
        loading={isLoading}
      />
      <Widget
        label="Paid Onsite & Incentives"
        icon={<IcPaidOnsite />}
        value={totalPaidOnsite}
        loading={isLoading}
      />
    </div>
  );
};

export default SummaryWidget;
