import DatePicker from '@/components/base/DatePicker';
import Select from '@/components/base/Select';
import Typography from '@/components/base/Typography';
import ECharts from '@/components/ui/ECharts';

import usePaidOnsiteIncentiveChart from './PaidOnsiteIncentiveChart.hooks';

const PaidOnsiteIncentiveChart = () => {
  const {
    budgetType,
    budgetTypeOption,
    currentDate,
    isLoading,
    totalAmountString,
    option,
    handleChangeDate,
    handleChangeType,
  } = usePaidOnsiteIncentiveChart();

  return (
    <div className="bg-n-1 p-5 rounded-xl border border-solid border-n-5">
      <div className="flex justify-between mb-8">
        <div className="flex flex-col gap-1.5">
          <Typography
            variant="title"
            size="large"
            type="secondary"
            className="font-bold"
          >
            Paid Onsite & Incentives
          </Typography>
          <Typography
            loading={isLoading}
            variant="body"
          >
            {`${totalAmountString}/year`}
          </Typography>
        </div>
        <Select
          className="w-1/4"
          options={budgetTypeOption}
          value={budgetType}
          onChange={(e) => handleChangeType(String(e.target.value))}
          block
        />
        <DatePicker
          className="w-1/4"
          value={currentDate}
          onChange={handleChangeDate}
          views={['year']}
        />
      </div>
      <ECharts option={option} style={{ height: '352px' }} />
    </div>
  );
};

export default PaidOnsiteIncentiveChart;
