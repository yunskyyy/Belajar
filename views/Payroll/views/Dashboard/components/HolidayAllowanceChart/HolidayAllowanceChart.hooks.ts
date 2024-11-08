import { useMemo } from 'react';

import type { EChartsOption } from 'echarts';
import tailwindConfig from 'tailwind.config';
import resolveConfig from 'tailwindcss/resolveConfig';

import { ENDPOINT } from '@/constants/apiURL';
import useGetData from '@/hooks/useGetData';
import { toIDR } from '@/utils';

import holidayAllowanceNormalizers from './normalizers/holidayAllowanceNormalizers';
import type { HolidayAllowanceData } from './HolidayAllowanceChart.types';

const useHolidayAllowanceChart = () => {
  const { PAYROLL_DASHBOARD: { HOLIDAY_ALLOWANCE } } = ENDPOINT;

  const { theme: twTheme } = resolveConfig(tailwindConfig);
  const { colors } = twTheme || {};
  const {
    success: { 300: success300, 50: success50, 800: success800 },
    n: { 1: n1, 13: n13 },
  } = colors || {};

  const {
    data: holidayAllowanceData,
    isLoading,
  } = useGetData<HolidayAllowanceData>(
    ['holidayAllowanceData'],
    HOLIDAY_ALLOWANCE,
    {
      normalizer: holidayAllowanceNormalizers,
    },
  );

  const {
    totalAmountString = '',
    isRising = false,
    percentageString = '',
    items = [],
  } = holidayAllowanceData || {};

  const xAxisData = useMemo(() => items.map(({ year }) => (year)), [items]);
  const yAxisData = useMemo(() => items.map(({ totalAmount }) => totalAmount), [items]);

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
        color: success300,
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
            color: success800,
          },
        },
        itemStyle: {
          borderRadius: 15,
        },
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: success50,
          borderRadius: 15,
        },
      },
    ],
  };

  return {
    isLoading,
    isRising,
    totalAmountString,
    percentageString,
    option,
  };
};

export default useHolidayAllowanceChart;
