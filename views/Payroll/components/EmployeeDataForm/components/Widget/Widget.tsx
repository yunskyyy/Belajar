import Typography from '@/components/base/Typography';

import type { WidgetProps } from './widget.types';

const Widget = (props: WidgetProps) => {
  const { label, value } = props;
  return (
    <div className="border border-grey-300 w-28 max-h-24 p-4 border-solid rounded-lg shadow-md">
      <Typography variant="label" className="font-light text-n-7">{label}</Typography>
      <Typography variant="title" className="font-medium">{value}</Typography>
    </div>
  );
};

export default Widget;
