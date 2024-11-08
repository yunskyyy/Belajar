'use client';

import { Controller } from 'react-hook-form';

import Autocomplete from '@/components/base/Autocomplete';
import Button from '@/components/base/Button';
import DatePicker from '@/components/base/DatePicker';
import Paper from '@/components/base/Paper';
import Select from '@/components/base/Select';
import { IcAdd, IcEdit, IcTrash } from '@/components/icons';
import DataTable from '@/components/ui/DataTable';
import Description from '@/components/ui/Description';
import Modal from '@/components/ui/Modal';
import type { SelectItem } from '@/types/inputs';
import { formatDateApi, toIDR } from '@/utils';
import { BUDGET_SETTING_TYPES } from '@/views/Payroll/constants/budgetSettingType';

import useBudgetSetting from './OnsiteIncentiveList.hooks';

const OnsiteIncentiveList = () => {
  const {
    amount,
    control,
    employeeSearchValue,
    endDate,
    handleSubmit,
    isEdit,
    isLoading,
    isSubmitting,
    onsiteIncetiveList,
    openForm,
    projectOption,
    projectSearchValue,
    setValue,
    startDate,
    tableColumns,
    totalDays,
    userOption,
    queryParams,
    handleCloseForm,
    handleDelete,
    handleEdit,
    handleEmployeeSearchChange,
    handleOpenForm,
    handleProjectSearchChange,
    handleSearch,
    onFilterChange,
    onPageChange,
    onPageSizeChange,
    onSortChange,
    onSubmit,
  } = useBudgetSetting();

  return (
    <>
      <Paper className="p-4">
        <DataTable
          columns={tableColumns}
          data={(onsiteIncetiveList && onsiteIncetiveList.items) || []}
          loading={isLoading}
          onFilterChange={onFilterChange}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
          onSortChange={onSortChange}
          onSearchChange={handleSearch}
          searchValue={String(queryParams.name || '')}
          page={queryParams.page}
          pageSize={queryParams.size}
          rowActions={[
            {
              color: 'success',
              icon: <IcEdit />,
              onClick: (row) => handleEdit(row),
              disabledFn: (row) => !!row.paymentScheduleDate,
              tooltip: 'Edit data',
            },
            {
              color: 'danger',
              icon: <IcTrash />,
              onClick: (row) => handleDelete(row),
            },
          ]}
          appendHeader={(
            <Button
              className="h-fit"
              color="primary"
              startIcon={<IcAdd />}
              onClick={handleOpenForm}
            >
              Create Data
            </Button>
          )}
          searchPlaceholder="Search by employee name"
          showPagination
          uniqueRowKey="onsiteExpenseId"
        />
      </Paper>

      <Modal
        open={openForm}
        title={`${!isEdit ? 'Create' : 'Edit'} Data`}
        onClose={handleCloseForm}
        width={960}
      >
        <Modal.Content>
          <form className="grid grid-cols-2 gap-5">
            <Controller
              control={control}
              name="type"
              render={({ field: { ref, onChange, value }, fieldState: { error } }) => (
                <Select
                  ref={ref}
                  label="Type"
                  labelLayout="vertical"
                  options={BUDGET_SETTING_TYPES}
                  value={value}
                  placeholder="Select Type"
                  block
                  onChange={onChange}
                  message={
                    error && error.message
                  }
                  error={!!error}
                  required
                />
              )}
            />
            <Controller
              control={control}
              name="employee"
              render={({
                field: {
                  ref,
                  onChange,
                  value,
                },
                fieldState: { error },
              }) => (
                <Autocomplete
                  ref={ref}
                  label="Employee"
                  placeholder="Select Employee"
                  options={userOption}
                  inputValue={employeeSearchValue}
                  onInputChange={
                    (_e, inputValue) => handleEmployeeSearchChange(inputValue)
                  }
                  onChange={(_e, selectedValue) => {
                    const changeValue = selectedValue as SelectItem;
                    if (!changeValue) {
                      onChange('');
                      return;
                    }
                    onChange(changeValue);
                    handleEmployeeSearchChange(changeValue.label);
                    setValue('employeeId', String(changeValue.value));
                  }}
                  value={value}
                  error={!!error}
                  message={error && error.message}
                  contentEditable={false}
                  block
                  required
                />
              )}
            />
            <Controller
              control={control}
              name="project"
              render={({
                field: {
                  ref,
                  onChange,
                  value,
                },
                fieldState: { error },
              }) => (
                <Autocomplete
                  ref={ref}
                  className="col-span-2"
                  label="Project Code"
                  placeholder="Select Project Code"
                  options={projectOption}
                  inputValue={projectSearchValue}
                  onInputChange={
                    (_e, inputValue) => handleProjectSearchChange(inputValue)
                  }
                  onChange={(_e, selectedValue) => {
                    const changeValue = selectedValue as SelectItem;
                    if (!changeValue) {
                      onChange('');
                      return;
                    }
                    onChange(changeValue);
                    handleProjectSearchChange(changeValue.label);
                    setValue('projectId', String(changeValue.value));
                  }}
                  value={value}
                  error={!!error}
                  message={error && error.message}
                  contentEditable={false}
                  block
                  required
                />
              )}
            />
            <Controller
              control={control}
              name="startDate"
              render={({ field: { ref, onChange, value }, fieldState: { error } }) => (
                <DatePicker
                  ref={ref}
                  onChange={(inputValue) => {
                    onChange(inputValue ? formatDateApi(inputValue) : null);
                  }}
                  label="Start Date"
                  placeholder="Select Date"
                  error={!!error}
                  message={error && error.message}
                  value={value ? new Date(value) : null}
                  maxDate={endDate ? new Date(endDate) : undefined}
                  required
                  block
                />
              )}
            />
            <Controller
              control={control}
              name="endDate"
              render={({ field: { ref, onChange, value }, fieldState: { error } }) => (
                <DatePicker
                  ref={ref}
                  onChange={(inputValue) => {
                    onChange(inputValue ? formatDateApi(inputValue) : null);
                  }}
                  label="End Date"
                  placeholder="Select Date"
                  error={!!error}
                  message={error && error.message}
                  value={value ? new Date(value) : null}
                  minDate={startDate ? new Date(startDate) : undefined}
                  required
                  block
                />
              )}
            />
            <Description
              label="Total Days"
              value={totalDays
                ? String(totalDays)
                : '-'}
              layout="vertical"
            />
            <Description
              label="Amount"
              value={amount ? toIDR(amount) : '-'}
              layout="vertical"
            />
          </form>
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
              {`${!isEdit ? 'Save' : 'Edit'} Data `}
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default OnsiteIncentiveList;
