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

import usePositionList from './LevelList.hooks';
import type { Level } from './LevelList.types';

const LevelList = () => {
  const {
    control,
    errors,
    handleSubmit,
    isEdit,
    isLoading,
    isSubmitting,
    levelData,
    levelTypeOption,
    openForm,
    queryParams,
    register,
    setValue,
    tableColumns,
    handleCloseForm,
    handleDelete,
    handleEdit,
    handleOpenForm,
    onFilterChange,
    onPageChange,
    onPageSizeChange,
    onSearchChange,
    onSortChange,
    onSubmit,
  } = usePositionList();

  return (
    <>
      <PageHeader
        title="List Master Data Level"
        crumbs={[{ label: 'Master Data' }, { label: 'List Master Data Level' }]}
        className="mb-6"
      >
        <Button
          className="h-fit"
          color="primary"
          startIcon={<IcAdd />}
          onClick={handleOpenForm}
        >
          Create Data Level
        </Button>
      </PageHeader>
      <Paper className="p-4">
        <DataTable
          columns={tableColumns}
          data={(levelData && levelData.items) || []}
          loading={isLoading}
          onFilterChange={onFilterChange}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
          onSearchChange={onSearchChange}
          onSortChange={onSortChange}
          page={queryParams.page}
          pageSize={queryParams.size}
          searchValue={queryParams.s}
          rowActions={[
            {
              color: 'success',
              icon: <IcEdit />,
              onClick: (row) => handleEdit(row as Level),
              tooltip: 'Edit data',
            },
            {
              color: 'danger',
              icon: <IcTrash />,
              onClick: (row) => handleDelete(row as Level),
              tooltip: 'Delete data',
            },
          ]}
          searchPlaceholder="Search by Level"
          showPagination
          uniqueRowKey="levelId"
        />
      </Paper>

      <Modal
        open={openForm}
        title={`${!isEdit ? 'Create' : 'Edit'} Data Level`}
        onClose={handleCloseForm}
        width={524}
      >
        <Modal.Content>
          <div className="flex flex-col gap-8">
            <Controller
              control={control}
              name="levelTypeId"
              render={({ field: { ref, onChange, value }, fieldState: { error } }) => (
                <Select
                  ref={ref}
                  label="Level Type"
                  labelLayout="vertical"
                  options={levelTypeOption}
                  value={value}
                  className="w-full"
                  placeholder="Select Level Type"
                  block
                  onChange={(e) => {
                    onChange(e);
                    const selectedType = levelTypeOption.find((el) => el.value === e.target.value);
                    setValue('type', selectedType ? selectedType.label : '');
                  }}
                  message={
                    error && error.message
                  }
                  error={!!error}
                  required
                />
              )}
            />
            <TextField
              {...register('name')}
              message={errors.name && errors.name.message}
              error={!!errors.name}
              label="Level"
              placeholder="Enter Level"
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
              {`${!isEdit ? 'Save' : 'Edit'} Data Level`}
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default LevelList;
