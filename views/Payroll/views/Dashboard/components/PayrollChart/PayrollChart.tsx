import DatePicker from '@/components/base/DatePicker';
import Typography from '@/components/base/Typography';
import ECharts from '@/components/ui/ECharts';

import usePayrollChart from './PayrollChart.hooks';

const PayrollChart = () => {
  const {
    currentDate,
    isLoading,
    totalPayrollString,
    option,
    handleChangeDate,
  } = usePayrollChart();

  return (
    <div className="bg-n-1 p-5 rounded-xl border border-solid border-n-5">
      <div className="flex justify-between mb-8">
        <div className="flex flex-col gap-1.5 grow">
          <Typography
            variant="title"
            size="large"
            type="secondary"
            className="font-bold"
          >
            Total Payroll per year
          </Typography>
          <Typography
            loading={isLoading}
            variant="body"
            className="max-w-48"
          >
            {`${totalPayrollString}/year`}
          </Typography>
        </div>
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

export default PayrollChart;
