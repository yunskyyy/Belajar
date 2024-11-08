import { format } from 'date-fns';

const formatDateApi = (value: Date): string => {
  if (!Number.isNaN(value.valueOf())) {
    return format(value, 'yyyy-MM-dd');
  }
  return '';
};

export default formatDateApi;
