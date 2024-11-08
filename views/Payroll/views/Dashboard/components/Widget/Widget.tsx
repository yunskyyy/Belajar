import { cloneElement } from 'react';

import Typography from '@/components/base/Typography';
import { toIDR } from '@/utils';

import type { WidgetProps } from './Widget.types';

const Widget = (props: WidgetProps) => {
  const {
    icon = <span />,
    value = 0,
    label = '',
    loading,
  } = props;
  return (
    <div className="bg-n-1 p-5 rounded-xl border border-solid border-n-5">
      <div className="bg-primary-50 p-2 h-14 w-14 flex justify-center items-center rounded-3xl mb-5">
        {cloneElement(icon, { className: 'h-10 w-10 fill-primary-500' })}
      </div>
      <Typography
        variant="body"
        className="text-n-7 max-h-56"
        loading={loading}
      >
        {label}
      </Typography>
      <Typography
        variant="title"
        size="large"
        type="secondary"
        className="text-n-13 max-w-52"
        loading={loading}
      >
        {toIDR(value)}
      </Typography>
    </div>
  );
};

export default Widget;
