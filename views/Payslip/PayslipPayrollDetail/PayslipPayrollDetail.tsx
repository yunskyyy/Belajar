'use client';

import Button from '@/components/base/Button';
import Paper from '@/components/base/Paper';
import { IcPesan } from '@/components/icons';
import DataTable from '@/components/ui/DataTable';
import PageHeader from '@/components/ui/PageHeader';

import { TABLE_COLUMNS } from './PayslipPayrollDetail.constants';
import usePayslipPayrollDetail from './PayslipPayrollDetail.hooks';
import type { PayslipPayrollDetailProps } from './PayslipPayrollDetail.types';

const PayslipPayrollDetail = (props: PayslipPayrollDetailProps) => {
  const {
    isLoading,
    payslipEmployeeData,
    queryParams,
    handleViewPayslip,
    onFilterChange,
    onPageChange,
    onPageSizeChange,
    onSearchChange,
    onSortChange,
    handleSendEmailEmployee,
    selectedRowId,
    setSelectedRowId,
    selectAll,
    handleSelectAll,
    handlSendEmailSelectedEmployee,
    sendingEmail,
  } = usePayslipPayrollDetail(props);

  return (
    <div className="flex flex-col gap-4">
      <Paper className="p-4">
        <PageHeader
          title="Payslip Payroll"
          crumbs={[
            { label: 'Payroll' },
            { label: 'Payslip' },
            { label: 'Payslip Payroll', href: '/payroll/payslip/payslip-payroll' },
            { label: 'Detail Payslip Payroll' },
          ]}
        />
      </Paper>

      <Paper className="p-4">
        <DataTable
          appendHeader={(
            <Button
              color="primary"
              className="h-fit"
              startIcon={
                <IcPesan />
              }
              onClick={handlSendEmailSelectedEmployee}
              loading={sendingEmail}
            >
              Send Email
            </Button>
          )}
          appendHeaderPosition="start"
          data={payslipEmployeeData?.items || []}
          columns={TABLE_COLUMNS}
          loading={isLoading || sendingEmail}
          onFilterChange={onFilterChange}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
          onSortChange={onSortChange}
          onSearchChange={onSearchChange}
          page={queryParams.page}
          pageSize={queryParams.size}
          searchPlaceholder="Search by Employee Name"
          showPagination
          showAuditTrail={false}
          rowActions={[
            {
              icon: 'View',
              onClick: (row) => handleViewPayslip(row.employeeId),
              size: 'normal',
              color: 'primary',
              variant: 'outline',
            },
            {
              icon: (
                <>
                  <IcPesan className="fill-n-4" />
                  &nbsp;Send Mail
                </>
              ),
              onClick: (row) => handleSendEmailEmployee(row.userId),
              color: 'primary',
              size: 'normal',
            },
          ]}
          rowActionsColumnTitle="Payslip"
          uniqueRowKey="userId"
          showCheckBox
          selectedRows={selectedRowId}
          setSelectedRows={setSelectedRowId}
          selectAll={selectAll}
          setSelectAll={handleSelectAll}
        />
      </Paper>
    </div>
  );
};

export default PayslipPayrollDetail;
