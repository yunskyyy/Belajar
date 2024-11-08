'use client';

import { Controller } from 'react-hook-form';

import Button from '@/components/base/Button';
import Paper from '@/components/base/Paper';
import Select from '@/components/base/Select';
import TextField from '@/components/base/Textfield';
import { IcAdd, IcEdit, IcTrash } from '@/components/icons';
import DataTable from '@/components/ui/DataTable';
import Modal from '@/components/ui/Modal';
import PageHeader from '@/components/ui/PageHeader';

import usePositionList from './PositionList.hooks';
import type { Position } from './PositionList.types';

const PositionList = () => {
  const {
    control,
    divisionOption,
    errors,
    handleSubmit,
    isEdit,
    isLoading,
    isSubmitting,
    openForm,
    positionData,
    register,
    tableColumns,
    queryParams,
    handleCloseForm,
    handleEdit,
    handleDelete,
    handleOpenForm,
    handleSearch,
    onFilterChange,
    onPageChange,
    onPageSizeChange,
    onSortChange,
    onSubmit,
  } = usePositionList();

  return (
    <>
      <PageHeader
        title="List Master Data Position"
        crumbs={[{ label: 'Master Data' }, { label: 'List Master Data Position' }]}
        className="mb-6"
      >
        <Button
          className="h-fit"
          color="primary"
          startIcon={<IcAdd />}
          onClick={handleOpenForm}
        >
          Create Data Position
        </Button>
      </PageHeader>
      <Paper className="p-4">
        <DataTable
          columns={tableColumns}
          data={(positionData && positionData.items) || []}
          loading={isLoading}
          onFilterChange={onFilterChange}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
          onSearchChange={handleSearch}
          onSortChange={onSortChange}
          page={queryParams.page}
          pageSize={queryParams.size}
          searchValue={queryParams.s}
          rowActions={[
            {
              color: 'success',
              icon: <IcEdit />,
              onClick: (row) => handleEdit(row as Position),
              tooltip: 'Edit data',
            },
            {
              color: 'danger',
              icon: <IcTrash />,
              onClick: (row) => handleDelete(row as Position),
              tooltip: 'Delete data',
            },
          ]}
          searchPlaceholder="Search by Position"
          showPagination
          uniqueRowKey="positionId"
        />
      </Paper>

      <Modal
        open={openForm}
        title={`${!isEdit ? 'Create' : 'Edit'} Data Position`}
        onClose={handleCloseForm}
        width={524}
      >
        <Modal.Content>
          <div className="flex flex-col gap-8">
            <Controller
              control={control}
              name="divisionId"
              render={({ field: { ref, onChange, value } }) => (
                <Select
                  ref={ref}
                  options={divisionOption}
                  value={value}
                  label="Division"
                  labelLayout="vertical"
                  placeholder="Select Division"
                  onChange={onChange}
                  message={
                    errors.divisionId && errors.divisionId.message
                  }
                  error={!!errors.divisionId}
                  required
                  block
                />
              )}
            />
            <TextField
              {...register('name')}
              message={errors.name && errors.name.message}
              error={!!errors.name}
              label="Position"
              placeholder="Enter Position"
              classes={{ label: 'w-fit text-left' }}
              block
              labelLayout="vertical"
              required
            />
          </div>
        </Modal.Content>
        <Modal.Footer>
          <div className="flex justify-center gap-4">
            <Button
              color="danger"
              variant="outline"
              onClick={handleCloseForm}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              type="submit"
              loading={isSubmitting}
              onClick={handleSubmit(onSubmit)}
            >
              {`${!isEdit ? 'Save' : 'Edit'} Data Position`}
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PositionList;
