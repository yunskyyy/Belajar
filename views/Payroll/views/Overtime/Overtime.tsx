'use client';

import { FormProvider } from 'react-hook-form';

import Button from '@/components/base/Button';
import DatePicker from '@/components/base/DatePicker';
import Paper from '@/components/base/Paper';
import Typography from '@/components/base/Typography';
import {
  IcAdd, IcDownlaod, IcEdit, IcImport, IcTrash,
} from '@/components/icons';
import DataTable from '@/components/ui/DataTable';
import PageHeader from '@/components/ui/PageHeader';

import OvertimeFormModal from './components/OvertimeFormModal';
import OvertimeImportModal from './components/OvertimeImportModal';
import type { OvertimeFormSchemas } from './types/overtimeForm';
import useOvertime from './Overtime.hooks';

const Overtime = () => {
  const {
    tableColumns,
    dateFilter,
    dateFilterError,
    isLoading,
    methods,
    openForm,
    openImportModal,
    overtimeData,
    queryParams,
    handleCloseForm,
    handleCloseImportModal,
    handleDateFilterChange,
    handleDelete,
    handleDownloadTemplate,
    handleEdit,
    handleOpenForm,
    handleOpenImportModal,
    handleSearchChange,
    onDateFilterChange,
    onFilterChange,
    onPageChange,
    onPageSizeChange,
    onSortChange,
  } = useOvertime();

  return (
    <>
      <Paper className="p-4 mb-6">
        <PageHeader
          title="List Overtime"
          crumbs={[{ label: 'Payroll' }, { label: 'Additional Earning' }, { label: 'Overtime' }]}
        />
      </Paper>

      <Paper className="flex flex-col gap-4 p-6 mb-6">
        <Typography
          variant="title"
          type="primary"
        >
          Filter
        </Typography>
        <div className={`flex gap-4 ${dateFilterError.startDt || dateFilterError.endDt ? 'items-center' : 'items-end'}`}>
          <div className="flex gap-4 items-start">
            <DatePicker
              label="Start Date"
              placeholder="Select Start Date"
              value={dateFilter.startDt ? new Date(dateFilter.startDt) : null}
              onChange={
                (value) => (handleDateFilterChange({ startDt: value }))
              }
              maxDate={dateFilter.endDt ? new Date(dateFilter.endDt) : undefined}
              error={!!dateFilterError.startDt}
              message={dateFilterError.startDt}
              views={['month', 'year']}
            />
            <DatePicker
              label="End Date"
              placeholder="Select End Date"
              value={dateFilter.endDt ? new Date(dateFilter.endDt) : null}
              onChange={
                (value) => (handleDateFilterChange({ endDt: value }))
              }
              minDate={dateFilter.startDt ? new Date(dateFilter.startDt) : undefined}
              error={!!dateFilterError.endDt}
              message={dateFilterError.endDt}
              views={['month', 'year']}
            />
          </div>
          <Button
            className="h-fit px-12"
            color="primary"
            onClick={onDateFilterChange}
          >
            Apply
          </Button>
        </div>
        <div className="w-full">
          <hr />
        </div>
        <DataTable
          columns={tableColumns}
          data={(overtimeData && overtimeData.items) || []}
          loading={isLoading}
          appendHeader={(
            <div className="flex justify-end gap-2">
              <Button
                color="primary"
                variant="text"
                startIcon={<IcDownlaod />}
                onClick={handleDownloadTemplate}
              >
                Download Template
              </Button>
              <Button
                color="primary"
                variant="outline"
                startIcon={<IcImport />}
                onClick={handleOpenImportModal}
              >
                Import
              </Button>
              <Button
                color="primary"
                startIcon={<IcAdd />}
                onClick={handleOpenForm}
              >
                Create Overtime Data
              </Button>
            </div>
          )}
          rowActions={[
            {
              color: 'success',
              icon: <IcEdit />,
              onClick: (row) => handleEdit(row),
              disabledFn: (row) => !!row.schedulePaymentDate,
              tooltip: 'Edit data',
            },
            {
              color: 'danger',
              icon: <IcTrash />,
              onClick: (row) => handleDelete(row),
              tooltip: 'Delete data',
            },
          ]}
          onFilterChange={onFilterChange}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
          onSearchChange={handleSearchChange}
          onSortChange={onSortChange}
          page={queryParams.page}
          pageSize={queryParams.size}
          searchValue={String(queryParams.name || '')}
          searchPlaceholder="Search by Employee Name"
          showPagination
          uniqueRowKey="overtimeExpenseId"
        />
      </Paper>

      <FormProvider<OvertimeFormSchemas> {...methods}>
        <OvertimeFormModal
          open={openForm}
          onClose={handleCloseForm}
        />
      </FormProvider>

      {openImportModal && (
        <OvertimeImportModal
          open={openImportModal}
          onClose={handleCloseImportModal}
        />
      )}
    </>
  );
};

export default Overtime;
