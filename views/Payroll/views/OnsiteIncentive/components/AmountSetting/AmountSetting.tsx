'use client';

import { Controller } from 'react-hook-form';

import Autocomplete from '@/components/base/Autocomplete';
import Button from '@/components/base/Button';
import Paper from '@/components/base/Paper';
import Select from '@/components/base/Select';
import TextField from '@/components/base/Textfield';
import { IcAdd, IcEdit, IcTrash } from '@/components/icons';
import DataTable from '@/components/ui/DataTable';
import Modal from '@/components/ui/Modal';
import { numbersOnly } from '@/helpers';
import type { SelectItem } from '@/types/inputs';
import { toIDR } from '@/utils';
import { BUDGET_SETTING_TYPES } from '@/views/Payroll/constants/budgetSettingType';

import useAmountSetting from './AmountSetting.hooks';

const AmountSetting = () => {
  const {
    budgetSettings,
    control,
    handleSubmit,
    isEdit,
    isLoading,
    isSubmitting,
    openForm,
    projectOption,
    projectSearchValue,
    setValue,
    tableColumns,
    queryParams,
    handleCloseForm,
    handleDelete,
    handleEdit,
    handleOpenForm,
    handleProjectSearchChange,
    onFilterChange,
    onPageChange,
    onPageSizeChange,
    onSortChange,
    onSubmit,
  } = useAmountSetting();

  return (
    <>
      <Paper className="p-4">
        <DataTable
          columns={tableColumns}
          data={(budgetSettings && budgetSettings.items) || []}
          loading={isLoading}
          onFilterChange={onFilterChange}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
          onSortChange={onSortChange}
          page={queryParams.page}
          pageSize={queryParams.size}
          rowActions={[
            {
              color: 'success',
              icon: <IcEdit />,
              onClick: (row) => handleEdit(row),
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
              Create Amount Setting
            </Button>
          )}
          showPagination
          showSearch={false}
          uniqueRowKey="budgetSettingId"
        />
      </Paper>

      {openForm && (
        <Modal
          open={openForm}
          title={`${!isEdit ? 'Create' : 'Edit'} Amount Setting`}
          onClose={handleCloseForm}
          width={960}
        >
          <Modal.Content>
            <div className="grid grid-cols-2 gap-6">
              <Controller
                control={control}
                name="type"
                render={({
                  field: {
                    ref,
                    onChange,
                    value,
                  },
                  fieldState: { error },
                }) => (
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
              {!isEdit ? (
                <Controller
                  control={control}
                  name="projects"
                  render={({
                    field: {
                      ref,
                      onChange,
                      value = [],
                    },
                    fieldState: { error },
                  }) => (
                    <Autocomplete
                      ref={ref}
                      label="Project Code"
                      placeholder="Select Project Code"
                      options={projectOption}
                      inputValue={projectSearchValue}
                      onInputChange={
                        (_e, inputValue) => handleProjectSearchChange(inputValue)
                      }
                      onChange={(_e, selectedValue) => {
                        const changeValue = selectedValue as SelectItem[];
                        if (!changeValue) {
                          onChange(null);
                          return;
                        }
                        onChange(changeValue);
                        handleProjectSearchChange('');
                        setValue(
                          'projectIds',
                          (changeValue || []).map((el) => String(el.value)),
                        );
                      }}
                      value={value}
                      error={!!error}
                      message={error && error.message}
                      contentEditable={false}
                      block
                      multiple
                      required
                    />
                  )}
                />
              ) : (
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
                          onChange(null);
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
              )}
              <Controller
                control={control}
                name="amount"
                render={({
                  field: {
                    ref,
                    onChange,
                    value,
                  },
                  fieldState: { error },
                }) => (
                  <TextField
                    ref={ref}
                    label="Amount"
                    value={value ? toIDR(Number(value)) : ''}
                    onChange={(event) => {
                      onChange(numbersOnly(event.target.value));
                    }}
                    error={!!error}
                    message={error && error.message}
                    placeholder="Enter Amount"
                    required
                    block
                  />
                )}
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
                {`${!isEdit ? 'Save' : 'Edit'} Amount Data `}
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default AmountSetting;
