import { useMemo, useState } from 'react';

import type { EChartsOption } from 'echarts';
import tailwindConfig from 'tailwind.config';
import resolveConfig from 'tailwindcss/resolveConfig';

import { ENDPOINT } from '@/constants/apiURL';
import useGetData from '@/hooks/useGetData';
import { toIDR } from '@/utils';
import { BUDGET_SETTING_TYPES } from '@/views/Payroll/constants/budgetSettingType';

import type { OnsiteIncentiveData } from '../../Dashboard.types';
import onsiteIncentiveNormalizer from '../../normalizers/onsiteIncentiveNormalizer';

const usePaidOnsiteIncentiveChart = () => {
  const { PAYROLL_DASHBOARD: { ONSITE_INCENTIVE } } = ENDPOINT;

  const { theme: twTheme } = resolveConfig(tailwindConfig);
  const { colors } = twTheme || {};
  const {
    success: { 300: success300, 50: success50, 800: success800 },
    primary: { 300: primary300, 50: primary50, 800: primary800 },
    n: { 1: n1, 13: n13 },
  } = colors || {};

  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [budgetType, setBudgetType] = useState('');

  const year = currentDate.getFullYear();
  const budgetTypeOption = [{ label: 'All', value: '' }, ...BUDGET_SETTING_TYPES];

  const {
    data: paidOnsiteIncentiveData,
    isLoading,
  } = useGetData<OnsiteIncentiveData>(
    ['paidOnsiteIncentiveData', String(year), budgetType],
    ONSITE_INCENTIVE,
    {
      params: { year, status: 1, type: budgetType },
      normalizer: onsiteIncentiveNormalizer,
    },
  );

  const {
    totalAmountString = '',
    items = [],
  } = paidOnsiteIncentiveData || {};

  const xAxisData = useMemo(() => items.map(({ projectCode }) => projectCode), [items]);
  const onsiteData = useMemo(() => items.map(({ types: { onsite } }) => onsite), [items]);
  const incentiveData = useMemo(() => items.map(({ types: { incentive } }) => incentive), [items]);

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
        data: onsiteData,
        label: {
          show: false,
          formatter: ({ value, name, seriesName }) => (`${seriesName} ${name}\n\n${toIDR(Number(value))}`),
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
          focus: 'series',
        },
        itemStyle: {
          borderRadius: [0, 0, 15, 15],
        },
        type: 'bar',
        name: 'Onsite',
        stack: 'onsiteIncentive',
        showBackground: true,
        backgroundStyle: {
          color: success50,
          borderRadius: 15,
        },
      },
      {
        barMaxWidth: 65,
        color: primary300,
        data: incentiveData,
        label: {
          formatter: ({ value, name, seriesName }) => (`${seriesName} ${name}\n\n${toIDR(Number(value))}`),
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
          focus: 'series',
        },
        itemStyle: {
          borderRadius: [15, 15, 0, 0],
        },
        type: 'bar',
        name: 'Incentive',
        stack: 'onsiteIncentive',
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

  const handleChangeType = (value: string) => {
    setBudgetType(value);
  };

  return {
    budgetType,
    budgetTypeOption,
    currentDate,
    isLoading,
    totalAmountString,
    option,
    handleChangeDate,
    handleChangeType,
  };
};

export default usePaidOnsiteIncentiveChart;
