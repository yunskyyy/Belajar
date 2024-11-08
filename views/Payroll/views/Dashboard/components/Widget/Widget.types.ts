import type { ReactElement } from 'react';

export interface WidgetProps {
  icon?: ReactElement;
  label?: string;
  value?: number;
  loading?: boolean;
}
