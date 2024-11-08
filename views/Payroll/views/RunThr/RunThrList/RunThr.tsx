'use client';

import Link from 'next/link';

import Button from '@/components/base/Button';
import Paper from '@/components/base/Paper';
import { IcAdd, IcEdit, IcTrash } from '@/components/icons';
import DataTable from '@/components/ui/DataTable';
import PageHeader from '@/components/ui/PageHeader';

import DownloadSalaryModal from '../../../components/DownloadSalaryModal';

import useRunThr from './RunThr.hooks';

const RunThr = () => {
  const {
    tableColumns,
    runThrData,
    isLoading,
    queryParams,
    onPageChange,
    onPageSizeChange,
    onSortChange,
    onFilterChange,
    handleDelete,
    handleEdit,
    runTHrId,
    openDownloadSalary,
    handleDownloadSalary,
    handleCloseDownloadSalary,
  } = useRunThr();

  return (
    <>
      <Paper className="p-4 mb-6">
        <PageHeader
          title="List Run THR"
          crumbs={[{ label: 'Disbursement' }, { label: 'Run THR' }]}
        />
      </Paper>

      <Paper className="flex flex-col gap-4 p-6 mb-6">
        <DataTable
          columns={tableColumns}
          data={(runThrData && runThrData.items) || []}
          loading={isLoading}
          showSearch={false}
          statusLabels={['Done', 'Draft']}
          page={queryParams.page}
          pageSize={queryParams.size}
          onClickDetail={
            (holidayAllowanceDisbursementId) => handleDownloadSalary(holidayAllowanceDisbursementId)
          }
          rowActions={[
            {
              color: 'success',
              icon: <IcEdit />,
              onClick: (row) => handleEdit(String(row.holidayAllowanceDisbursementId)),
              disabledFn: (row) => !!(row).status,
              tooltip: 'Edit data',
            },
            {
              color: 'danger',
              icon: <IcTrash />,
              onClick: (row) => handleDelete(row),
              tooltip: 'Delete data',
            },
          ]}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
          onSortChange={onSortChange}
          onFilterChange={onFilterChange}
          showPagination
          uniqueRowKey="holidayAllowanceDisbursementId"
          appendHeader={(
            <Link href="/payroll/disbursement/run-thr/create">
              <Button
                className="h-fit"
                color="primary"
                startIcon={<IcAdd />}
              >
                Create Run THR
              </Button>
            </Link>
          )}
        />
      </Paper>
      <DownloadSalaryModal
        payrollDisbursementId={runTHrId}
        open={openDownloadSalary}
        onClose={handleCloseDownloadSalary}
      />
    </>
  );
};

export default RunThr;
