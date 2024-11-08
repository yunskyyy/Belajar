'use client';

import Button from '@/components/base/Button';
import Paper from '@/components/base/Paper';
import { IcAdd, IcEdit, IcTrash } from '@/components/icons';
import DataTable from '@/components/ui/DataTable';
import PageHeader from '@/components/ui/PageHeader';

import ComponentModal
  from './components/ComponentModal/ComponentModal';
import useReimburseComponent
  from './ReimburseComponent.hooks';

const ReimburseComponent = () => {
  const {
    componentData,
    tableColumns,
    isLoading,
    queryParams,
    componentModal,
    selectedComponentId,
    isEdit,
    onPageChange,
    onPageSizeChange,
    onSortChange,
    onFilterChange,
    onSearchChange,
    openModal,
    closeComponentModal,
    setIsEdit,
    handleEdit,
    handleDelete,
  } = useReimburseComponent();
  return (
    <>
      <Paper className="p-4 mb-6">
        <PageHeader
          title="List Reimburse Component"
          crumbs={[{ label: 'Dashboard' }, { label: 'Reimburse Component' }]}
        />
      </Paper>

      <Paper className="flex flex-col gap-4 p-6 mb-6">
        <DataTable
          columns={tableColumns}
          data={(componentData && componentData.items) || []}
          loading={isLoading}
          statusLabels={['Done', 'Draft']}
          page={queryParams.page}
          pageSize={queryParams.size}
          searchValue={queryParams.s}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
          onSortChange={onSortChange}
          onFilterChange={onFilterChange}
          onSearchChange={onSearchChange}
          showPagination
          searchPlaceholder="Search by Category & Type"
          uniqueRowKey="reimbursementCategoryId"
          appendHeader={(
            <Button
              className="h-fit"
              color="primary"
              startIcon={<IcAdd />}
              onClick={() => {
                setIsEdit(false);
                openModal();
              }}
            >
              Create Component
            </Button>
          )}
          rowActions={[
            {
              color: 'success',
              icon: <IcEdit />,
              onClick: (row) => handleEdit(String(row.reimbursementCategoryId)),
              tooltip: 'Edit data',
            },
            {
              color: 'danger',
              icon: <IcTrash />,
              onClick: (row) => handleDelete(row.reimbursementCategoryId, row.categoryName),
              tooltip: 'Delete data',
            },
          ]}
        />
      </Paper>

      <ComponentModal
        open={componentModal}
        onClose={closeComponentModal}
        isEdit={isEdit}
        componentId={selectedComponentId}
      />
    </>
  );
};

export default ReimburseComponent;
