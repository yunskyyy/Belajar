import { Fragment } from 'react';

import Typography from '@/components/base/Typography';
import ECharts from '@/components/ui/ECharts';

import useEmploymentStatus from './EmploymentStatus.hooks';

const EmploymentStatus = () => {
  const {
    chartColors,
    chartData,
    isLoading,
    option,
    totalEmployee,
  } = useEmploymentStatus();
  return (
    <div className="row-span-2 bg-n-1 p-6 gap-6 flex flex-col justify-between border border-solid border-n-5">
      <div className="flex gap-2">
        <div>
          <Typography
            variant="title"
            size="large"
            type="secondary"
            className="font-bold"
          >
            Total Employees
          </Typography>
          <Typography
            variant="body"
            className="text-n-7"
          >
            Number of employees based on employee status
          </Typography>
        </div>
      </div>
      <div className="flex gap-6 items-center justify-between">
        <div className="relative h-[256px] w-[256px]">
          <ECharts
            option={option}
            style={{
              height: '256px',
              width: '256px',
            }}
          />
          <div className="absolute top-1/4 left-1/4 w-32 h-32 flex flex-col justify-center items-center">
            <Typography
              align="center"
              variant="display"
              size="medium"
              type="secondary"
              className="font-bold h-fit min-w-24"
              loading={isLoading}
            >
              {totalEmployee}
            </Typography>
            <Typography
              align="center"
              variant="headline"
              size="small"
              type="secondary"
              className="font-medium min-w-36"
              loading={isLoading}
            >
              Employees
            </Typography>
          </div>
        </div>
        <div className="grow">
          {chartData.map(({ name, value }, i) => (
            <Fragment key={name}>
              <div className="flex justify-between">
                <Typography
                  variant="body"
                  className="text-n-7 font-light"
                >
                  {name}
                </Typography>
                <Typography
                  variant="body"
                  className="font-semibold"
                  type="secondary"
                >
                  {`${value} Employees`}
                </Typography>
              </div>
              <div className="rounded-xl shadow-sm overflow-hidden w-full mt-2 bg-n-3 mb-4">
                <div className="relative h-3 flex items-center justify-center">
                  <div
                    style={{
                      width: `${(value / totalEmployee) * 100}%`, backgroundColor: chartColors[i],
                    }}
                    className="absolute top-0 bottom-0 left-0 rounded-lg"
                  />
                  <div className="relative font-medium text-sm" />
                </div>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmploymentStatus;
