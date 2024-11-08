import { useMemo, useState } from 'react';

import type { EChartsOption } from 'echarts';
import tailwindConfig from 'tailwind.config';
import resolveConfig from 'tailwindcss/resolveConfig';

import { ENDPOINT } from '@/constants/apiURL';
import useGetData from '@/hooks/useGetData';
import { toIDR } from '@/utils';

import type { OvertimeData } from '../../Dashboard.types';
import overtimeDataNormalizer from '../../normalizers/overtimeDataNormalizer';

const usePaidOvertimeChart = () => {
  const { PAYROLL_DASHBOARD: { OVERTIME } } = ENDPOINT;

  const { theme: twTheme } = resolveConfig(tailwindConfig);
  const { colors } = twTheme || {};
  const {
    success: { 300: success300, 50: success50, 800: success800 },
    n: { 1: n1, 13: n13 },
  } = colors || {};

  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const year = currentDate.getFullYear();

  const {
    data: paidOvertimeData,
    isLoading,
  } = useGetData<OvertimeData>(
    ['paidOvertimeData', String(year)],
    OVERTIME,
    {
      params: { year, status: 1 },
      normalizer: overtimeDataNormalizer,
    },
  );

  const {
    totalAmountString = '',
    items = [],
  } = paidOvertimeData || {};

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
        color: success300,
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

export default usePaidOvertimeChart;
