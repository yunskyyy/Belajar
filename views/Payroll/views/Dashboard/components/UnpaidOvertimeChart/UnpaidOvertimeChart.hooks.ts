import { useMemo, useState } from 'react';

import type { EChartsOption } from 'echarts';
import tailwindConfig from 'tailwind.config';
import resolveConfig from 'tailwindcss/resolveConfig';

import { ENDPOINT } from '@/constants/apiURL';
import useGetData from '@/hooks/useGetData';
import { toIDR } from '@/utils';

import type { OvertimeData } from '../../Dashboard.types';
import overtimeDataNormalizer from '../../normalizers/overtimeDataNormalizer';

const useUnpaidOvertimeChart = () => {
  const { PAYROLL_DASHBOARD: { OVERTIME } } = ENDPOINT;

  const { theme: twTheme } = resolveConfig(tailwindConfig);
  const { colors } = twTheme || {};
  const {
    danger: { 300: danger300, 50: danger50, 800: danger800 },
    n: { 1: n1, 13: n13 },
  } = colors || {};

  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const year = currentDate.getFullYear();

  const {
    data: unpaidOvertimeData,
    isLoading,
  } = useGetData<OvertimeData>(
    ['unpaidOvertimeData', String(year)],
    OVERTIME,
    {
      params: { year, status: 0 },
      normalizer: overtimeDataNormalizer,
    },
  );

  const {
    totalAmountString = '',
    items = [],
  } = unpaidOvertimeData || {};

  const xAxisData = useMemo(() => items.map(({ projectCode }) => projectCode), [items]);
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
        color: danger300,
        data: yAxisData,
        label: {
          show: false,
          formatter: ({ value, name }) => (`${name}\n\n${toIDR(Number(value))}`),
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
            color: danger800,
          },
        },
        itemStyle: {
          borderRadius: 15,
        },
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: danger50,
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
    totalAmountString,
    option,
    handleChangeDate,
  };
};

export default useUnpaidOvertimeChart;
