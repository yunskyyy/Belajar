'use client';

import { Controller } from 'react-hook-form';

import Button from '@/components/base/Button';
import Checkbox from '@/components/base/Checkbox';
import Paper from '@/components/base/Paper';
import Select from '@/components/base/Select';
import TextField from '@/components/base/Textfield';
import {
  IcAdd,
  IcEdit,
  IcTrash,
} from '@/components/icons';
import DataTable from '@/components/ui/DataTable';
import Modal from '@/components/ui/Modal';
import PageHeader from '@/components/ui/PageHeader';

import usePayrollComponent from './PayrollComponent.hooks';

const PayrollComponent = () => {
  const {
    componentOption,
    control,
    componentListData,
    errors,
    handleSubmit,
    isEdit,
    isLoading,
    isSubmitting,
    openForm,
    register,
    tableColumns,
    queryParams,
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
  } = usePayrollComponent();
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="List Payroll Component"
        crumbs={[{ label: 'Payroll' }, { label: 'Payroll Component' }]}
      >
        <Button
          className="h-fit"
          color="primary"
          startIcon={<IcAdd />}
          onClick={handleOpenForm}
        >
          Create Component
        </Button>
      </PageHeader>
      <Paper className="p-4">
        <DataTable
          columns={tableColumns}
          data={(componentListData && componentListData.items) || []}
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
              onClick: (row) => handleEdit(row),
              tooltip: 'Edit data',
            },
            {
              color: 'danger',
              icon: <IcTrash />,
              onClick: (row) => handleDelete(row),
              tooltip: 'Delete data',
            },
          ]}
          searchPlaceholder="Search by Component Name"
          showPagination
          uniqueRowKey="componentId"
        />
      </Paper>

      <Modal
        open={openForm}
        title={`${!isEdit ? 'Create' : 'Edit'} Component`}
        onClose={handleCloseForm}
        width={524}
      >
        <Modal.Content>
          <div className="flex flex-col gap-8">
            <Controller
              control={control}
              name="componentTypeId"
              render={({ field: { ref, onChange, value }, fieldState: { error } }) => (
                <Select
                  ref={ref}
                  options={componentOption}
                  value={value}
                  label="Component Type"
                  labelLayout="vertical"
                  placeholder="Select Component Type"
                  onChange={onChange}
                  message={error && error.message}
                  error={!!error}
                  required
                  block
                />
              )}
            />
            <TextField
              {...register('name')}
              message={errors.name && errors.name.message}
              error={!!errors.name}
              label="Component Name"
              placeholder="Enter Component Name"
              classes={{ label: 'w-fit text-left' }}
              block
              labelLayout="vertical"
              required
            />
            <div className="flex flex-col gap-4">
              <Controller
                control={control}
                name="asTakeHomePay"
                render={({ field: { ref, onChange, value }, fieldState: { error } }) => (
                  <Checkbox
                    ref={ref}
                    checked={value}
                    onChange={onChange}
                    label="This component is regarded as take home pay "
                    message={error && error.message}
                    error={!!error}
                  />
                )}
              />
              <Controller
                control={control}
                name="asOverTime"
                render={({ field: { ref, onChange, value }, fieldState: { error } }) => (
                  <Checkbox
                    ref={ref}
                    checked={value}
                    onChange={onChange}
                    label="This component is regarded as overtime "
                    message={error && error.message}
                    error={!!error}
                  />
                )}
              />
              <Controller
                control={control}
                name="asHolidayAllowance"
                render={({ field: { ref, onChange, value }, fieldState: { error } }) => (
                  <Checkbox
                    ref={ref}
                    checked={value}
                    onChange={onChange}
                    label="This component is included in the THR calculation"
                    message={error && error.message}
                    error={!!error}
                  />
                )}
              />
            </div>
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
              {`${!isEdit ? 'Save' : 'Edit'} Component`}
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PayrollComponent;
