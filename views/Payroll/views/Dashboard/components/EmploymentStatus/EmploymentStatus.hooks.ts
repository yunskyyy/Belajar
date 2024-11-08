import { useMemo } from 'react';

import type { EChartsOption } from 'echarts';
import tailwindConfig from 'tailwind.config';
import resolveConfig from 'tailwindcss/resolveConfig';

import { ENDPOINT } from '@/constants/apiURL';
import useGetData from '@/hooks/useGetData';
import { toTitleCase } from '@/utils';

import employmentStatusNormalizer from './normalizers/employmentStatusNormalizer';
import type { EmploymentStatusData, EmploymentStatusDataResponse } from './EmploymentStatus.types';

const useEmploymentStatus = () => {
  const { PAYROLL_DASHBOARD: { EMPLOYMENT_STATUS } } = ENDPOINT;

  const { theme: twTheme } = resolveConfig(tailwindConfig);
  const { colors } = twTheme || {};
  const {
    primary: { 500: primary500 },
    danger: { 500: danger500 },
    success: { 500: success500 },
    warning: { 500: warning500 },
    orange: { 400: orange400 },
  } = colors || {};

  const chartColors = [primary500, warning500, danger500, success500, orange400];

  const {
    data: employmentStatusData,
    isLoading,
  } = useGetData<EmploymentStatusData, EmploymentStatusDataResponse>(
    ['employmentStatusData'],
    EMPLOYMENT_STATUS,
    {
      normalizer: employmentStatusNormalizer,
    },
  );

  const { totalEmployee = 0, items } = employmentStatusData || {};

  const chartData = useMemo(() => {
    if (items) {
      return Object.entries(items).map(([key, value]) => ({
        value,
        name: toTitleCase(key),
      }));
    }
    return [];
  }, [items]);

  const option: EChartsOption = {
    tooltip: {
      trigger: 'item',
    },
    color: chartColors,
    legend: {
      show: false,
    },
    series: [
      {
        type: 'pie',
        radius: ['65%', '95%'],
        avoidLabelOverlap: true,
        label: {
          show: false,
        },
        height: '256px',
        width: '256px',
        labelLine: {
          show: false,
        },
        data: chartData,
        showEmptyCircle: true,
      },
    ],
  };
  return {
    chartColors,
    chartData,
    isLoading,
    option,
    totalEmployee,
  };
};

export default useEmploymentStatus;
