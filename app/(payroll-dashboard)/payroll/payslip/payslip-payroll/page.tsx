import type { Metadata } from 'next';

import { APP_TITLE } from '@/constants/config';
import PayslipPayroll from '@/views/Payslip/PayslipPayroll';

export const metadata: Metadata = {
  title: `${APP_TITLE} - Payslip - Payslip Payroll`,
};

const PayslipPayrollPage = () => (
  <PayslipPayroll />
);

export default PayslipPayrollPage;
