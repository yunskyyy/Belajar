'use client';

import PageHeader from '@/components/ui/PageHeader';

import EmploymentStatus from './components/EmploymentStatus';
import HolidayAllowanceChart from './components/HolidayAllowanceChart';
import PaidOnsiteIncentiveChart from './components/PaidOnsiteIncentiveChart';
import PaidOvertimeChart from './components/PaidOvertimeChart';
import PayrollChart from './components/PayrollChart';
import SummaryWidget from './components/SummaryWidget';
import UnpaidOnsiteIncentiveChart from './components/UnpaidOnsiteIncentiveChart';
import UnpaidOvertimeChart from './components/UnpaidOvertimeChart';
import UpcomingPayroll from './components/UpcomingPayroll';

const Dashboard = () => (
  <div className="flex flex-col gap-6 pb-6">
    <PageHeader
      title="Dashboard"
      crumbs={[{ label: 'Payroll' }, { label: 'Dashboard' }]}
    />
    <div className="grid grid-cols-2 gap-6">
      <SummaryWidget />
      <div className="grid grid-cols-1 grid-rows-3 gap-6 *:rounded-xl">
        <UpcomingPayroll />
        <EmploymentStatus />
      </div>
      <PayrollChart />
      <HolidayAllowanceChart />
      <UnpaidOvertimeChart />
      <PaidOvertimeChart />
      <UnpaidOnsiteIncentiveChart />
      <PaidOnsiteIncentiveChart />
    </div>
  </div>
);

export default Dashboard;
