import type { Metadata } from 'next';

import { APP_TITLE } from '@/constants/config';
import CalendarManagement from '@/views/CalendarManagement';

export const metadata: Metadata = {
  title: `${APP_TITLE} - Company Calendar`,
};

const CalendarManagementPage = () => (
  <CalendarManagement />
);

export default CalendarManagementPage;
