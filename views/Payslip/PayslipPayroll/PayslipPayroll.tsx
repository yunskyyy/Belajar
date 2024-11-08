'use client';

import Paper from '@/components/base/Paper';
import { IcEyeOpen } from '@/components/icons';
import DataTable from '@/components/ui/DataTable';
import PageHeader from '@/components/ui/PageHeader';

import { TABLE_COLUMNS } from './PayslipPayroll.constants';
import usePayslipPayroll from './PayslipPayroll.hooks';

const PayslipPayroll = () => {
  const {
    isLoading,
    payslipData,
    queryParams,
    handleDetail,
    handleFilterChange,
    onPageChange,
    onPageSizeChange,
    onSortChange,
  } = usePayslipPayroll();

  return (
    <div className="flex flex-col gap-4">
      <Paper className="p-4">
        <PageHeader
          title="Payslip Payroll"
          crumbs={[{ label: 'Payroll' }, { label: 'Payslip' }, { label: 'Payslip Payroll' }]}
        />
      </Paper>

      <Paper className="p-4">
        <DataTable
          data={(payslipData && payslipData.items) || []}
          columns={TABLE_COLUMNS}
          loading={isLoading}
          rowActions={[
            {
              icon: <IcEyeOpen />,
              onClick: (row) => handleDetail(row.payrollDisbursementId),
              color: 'primary',
            },
          ]}
          onFilterChange={handleFilterChange}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
          onSortChange={onSortChange}
          page={queryParams.page}
          pageSize={queryParams.size}
          showPagination
          showSearch={false}
          uniqueRowKey="payrollDisbursementId"
        />
      </Paper>
    </div>
  );
};

export default PayslipPayroll;
