'use client';

import Link from 'next/link';

import Button from '@/components/base/Button';
import Paper from '@/components/base/Paper';
import {
  IcAdd, IcEdit, IcEyeOpen, IcTrash,
} from '@/components/icons';
import DataTable from '@/components/ui/DataTable';
import PageHeader from '@/components/ui/PageHeader';

import useReimburseSettings from './ReimburseSettings.hooks';

const ReimburseSettings = () => {
  const {
    settingsData,
    queryParams,
    tableColumns,
    isLoading,
    onPageChange,
    onPageSizeChange,
    onSortChange,
    onFilterChange,
    onSearchChange,
    handleDelete,
    handleEdit,
    handleDetail,
  } = useReimburseSettings();

  return (
    <>
      <Paper className="p-4 mb-6">
        <PageHeader
          title="List Reimburse Settings"
          crumbs={[{ label: 'Dashboard' }, { label: 'Reimburse Settings' }]}
        />
      </Paper>

      <Paper className="flex flex-col gap-4 p-6 mb-6">
        <DataTable
          columns={tableColumns}
          data={(settingsData && settingsData.items) || []}
          loading={isLoading}
          statusLabels={['Done', 'Draft']}
          page={queryParams.page}
          pageSize={queryParams.size}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
          onSortChange={onSortChange}
          onFilterChange={onFilterChange}
          onSearchChange={onSearchChange}
          showSearch={false}
          showPagination
          searchPlaceholder="Search by Category & Type"
          uniqueRowKey="reimbursementCategoryId"
          appendHeader={(
            <Link href="reimburse-settings/create">
              <Button
                className="h-fit"
                color="primary"
                startIcon={<IcAdd />}
                onClick={() => {

                }}
              >
                Add Reimburse Setting
              </Button>
            </Link>
          )}
          rowActions={[
            {
              color: 'primary',
              icon: <IcEyeOpen />,
              onClick: (row) => handleDetail(row.reimbursementSettingId),
              tooltip: 'View data',
            },
            {
              color: 'success',
              icon: <IcEdit />,
              onClick: (row) => handleEdit(row.reimbursementSettingId),
              tooltip: 'Edit data',
            },
            {
              color: 'danger',
              icon: <IcTrash />,
              onClick: (row) => handleDelete(row.reimbursementSettingId, row.categoryName),
              tooltip: 'Delete data',
            },
          ]}
        />
      </Paper>
    </>
  );
};

export default ReimburseSettings;
