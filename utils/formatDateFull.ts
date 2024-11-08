import { format } from 'date-fns';

const formatDateFull = (value: string): string => format(new Date(value), 'dd MMMM yyyy');

export default formatDateFull;
