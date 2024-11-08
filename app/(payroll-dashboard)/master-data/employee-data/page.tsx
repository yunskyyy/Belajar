import { redirect } from 'next/navigation';

const EmployeeListPage = () => (
  redirect('employee-data/employee')
);

export default EmployeeListPage;
