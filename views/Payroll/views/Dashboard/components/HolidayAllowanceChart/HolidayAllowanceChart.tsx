import Typography from '@/components/base/Typography';
import ECharts from '@/components/ui/ECharts';

import useHolidayAllowanceChart from './HolidayAllowanceChart.hooks';

const HolidayAllowanceChart = () => {
  const {
    isLoading,
    isRising,
    totalAmountString,
    percentageString,
    option,
  } = useHolidayAllowanceChart();

  return (
    <div className="bg-n-1 p-5 rounded-xl border border-solid border-n-5">
      <div className="flex flex-col gap-1.5 mb-8">
        <Typography
          variant="title"
          size="large"
          type="secondary"
          className="font-bold"
        >
          THR Amount per year
        </Typography>
        <Typography
          loading={isLoading}
          variant="body"
          className="max-w-48"
        >
          {`${totalAmountString}/year`}
        </Typography>
        <Typography
          loading={isLoading}
          variant="body"
          className="text-n-7 max-w-52"
        >
          <span className={`font-medium ${isRising ? 'text-success-500' : 'text-danger-500'}`}>
            {`${isRising ? '+' : '-'}${percentageString}%`}
          </span>
          &nbsp;from previous year
        </Typography>
      </div>
      <ECharts option={option} style={{ height: '352px' }} />
    </div>
  );
};

export default HolidayAllowanceChart;
