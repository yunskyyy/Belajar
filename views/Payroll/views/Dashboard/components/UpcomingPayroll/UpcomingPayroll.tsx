import Typography from '@/components/base/Typography';

import useUpcomingPayroll from './UpcomingPayroll.hooks';

const UpcomingPayroll = () => {
  const {
    isLoading,
    upcomingPayrollData,
  } = useUpcomingPayroll();

  const {
    date,
    totalAmountIDR,
  } = upcomingPayrollData || {};

  return (
    <div className="bg-widget-pattern relative bg-cover p-8 flex flex-col justify-center gap-1">
      <Typography
        variant="title"
        size="large"
        type="secondary"
        className="text-n-1 font-medium"
        loading={isLoading}
      >
        {`UPCOMING NEXT PAYROLL ${date}`}
      </Typography>
      <Typography
        variant="headline"
        type="secondary"
        size="medium"
        className="text-n-1 font-bold"
        loading={isLoading}
      >
        {totalAmountIDR}
      </Typography>
      <Typography
        variant="body"
        type="secondary"
        className="text-n-1 font-medium"
      >
        Checking based on the last completed payroll period status
      </Typography>
    </div>
  );
};

export default UpcomingPayroll;
