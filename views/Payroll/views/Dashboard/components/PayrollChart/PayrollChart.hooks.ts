import { useMemo, useState } from 'react';

import type { EChartsOption } from 'echarts';
import tailwindConfig from 'tailwind.config';
import resolveConfig from 'tailwindcss/resolveConfig';

import { ENDPOINT } from '@/constants/apiURL';
import useGetData from '@/hooks/useGetData';
import { toIDR } from '@/utils';

import payrollDataNormalizers from './normalizers/payrollDataNormalizers';
import type { PayrollData } from './PayrollChart.types';

const usePayrollChart = () => {
  const { PAYROLL_DASHBOARD: { DISBURSEMENT } } = ENDPOINT;

  const { theme: twTheme } = resolveConfig(tailwindConfig);
  const { colors } = twTheme || {};
  const {
    primary: { 300: primary300, 50: primary50, 800: primary800 },
    n: { 1: n1, 13: n13 },
  } = colors || {};

  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const year = currentDate.getFullYear();

  const {
    data: payrollData,
    isLoading,
  } = useGetData<PayrollData>(
    ['payrollData', String(year)],
    DISBURSEMENT,
    {
      params: { year },
      normalizer: payrollDataNormalizers,
    },
  );

  const {
    totalPayrollString = '',
    listPayrollMonth = [],
  } = payrollData || {};

  const xAxisData = useMemo(() => listPayrollMonth.map(({ month }) => month), [listPayrollMonth]);
  const yAxisData = useMemo(() => listPayrollMonth.map(({ amount }) => amount), [listPayrollMonth]);

  const option: EChartsOption = {
    xAxis: {
      type: 'category',
      data: xAxisData,
    },
    grid: {
      left: 20,
      top: 35,
      right: 20,
      bottom: 20,
      show: false,
      containLabel: true,
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: (value) => (toIDR(Number(value))),
      },
    },
    series: [
      {
        barMaxWidth: 65,
        color: primary300,
        data: yAxisData,
        label: {
          show: false,
          formatter: ({ value }) => (toIDR(Number(value))),
          position: 'top',
          backgroundColor: n13,
          borderRadius: 4,
          color: n1,
          padding: 6,
        },
        emphasis: {
          label: {
            show: true,
          },
          itemStyle: {
            color: primary800,
          },
        },
        itemStyle: {
          borderRadius: 15,
        },
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: primary50,
          borderRadius: 15,
        },
      },
    ],
  };

  const handleChangeDate = (value: Date | null) => {
    setCurrentDate(value || new Date());
  };

  return {
    currentDate,
    isLoading,
    totalPayrollString,
    option,
    handleChangeDate,
  };
};

export default usePayrollChart;
