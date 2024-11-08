'use client';

import Link from 'next/link';

import Button from '@/components/base/Button';
import Paper from '@/components/base/Paper';
import {
  IcAdd, IcEdit, IcEyeOpen, IcTrash,
} from '@/components/icons';
import DataTable from '@/components/ui/DataTable';
import PageHeader from '@/components/ui/PageHeader';

import DownloadSalaryModal from '../../../components/DownloadSalaryModal';

import useRunPayroll from './RunPayrollList.hooks';

const RunPayrollList = () => {
  const {
    tableColumns,
    listRunpayroll,
    isLoading,
    openDownloadSalary,
    payrollId,
    queryParams,
    handleCloseDownloadSalary,
    handleDelete,
    handleDownloadSalary,
    handleEdit,
    handleFilterChange,
    onSortChange,
    onPageSizeChange,
    onPageChange,
    handleDetail,
  } = useRunPayroll();

  return (
    <>
      <Paper className="p-4 mb-6">
        <PageHeader
          title="List Run Payroll"
          crumbs={[{ label: 'Disbursement' }, { label: 'Run Payroll' }]}
        />
      </Paper>

      <Paper className="flex flex-col gap-4 p-6 mb-6">
        <DataTable
          columns={tableColumns}
          data={(listRunpayroll && listRunpayroll.items) || []}
          loading={isLoading}
          showSearch={false}
          statusLabels={['Done', 'Draft']}
          rowActions={[
            {
              color: 'primary',
              icon: <IcEyeOpen />,
              onClick: (row) => handleDetail(String(row.payrollDisbursementId)),
              tooltip: 'View detail',
            },
            {
              color: 'success',
              icon: <IcEdit />,
              onClick: (row) => handleEdit(String(row.payrollDisbursementId)),
              disabledFn: (row) => !!(row).status,
            },
            {
              color: 'danger',
              icon: <IcTrash />,
              onClick: (row) => handleDelete(row),
            },
          ]}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
          onSortChange={onSortChange}
          onFilterChange={handleFilterChange}
          page={queryParams.page}
          pageSize={queryParams.size}
          onClickDetail={(payrollDisbursementId) => handleDownloadSalary(payrollDisbursementId)}
          showPagination
          uniqueRowKey="payrollDisbursementId"
          appendHeader={(
            <Link href="/payroll/disbursement/run-payroll/create">
              <Button
                className="h-fit"
                color="primary"
                startIcon={<IcAdd />}
              >
                Create Run Payroll
              </Button>
            </Link>
          )}
        />
      </Paper>
      <DownloadSalaryModal
        payrollDisbursementId={payrollId}
        open={openDownloadSalary}
        onClose={handleCloseDownloadSalary}
      />
    </>
  );
};

export default RunPayrollList;
