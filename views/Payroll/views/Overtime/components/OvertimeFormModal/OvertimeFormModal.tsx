import { Controller } from 'react-hook-form';

import Autocomplete from '@/components/base/Autocomplete';
import Button from '@/components/base/Button';
import DatePicker from '@/components/base/DatePicker';
import Select from '@/components/base/Select';
import TextField from '@/components/base/Textfield';
import Typography from '@/components/base/Typography';
import Description from '@/components/ui/Description';
import Modal from '@/components/ui/Modal';
import type { SelectItem } from '@/types/inputs';
import { formatDateApi } from '@/utils';

import useOvertimeFormModal from './OvertimeFormModal.hooks';
import type { OvertimeFormModalProps } from './OvertimeFormModal.types';

import styles from './OvertimeFormModal.module.scss';

const OvertimeFormModal = (props: OvertimeFormModalProps) => {
  const {
    open = false,
  } = props;

  const {
    control,
    displayAmount,
    employeeSearchValue,
    errors,
    handleSubmit,
    isFetchingAmount,
    isSubmitting,
    overtimeExpenseId,
    projectOption,
    projectSearchValue,
    setValue,
    teamOption,
    userOption,
    handleCheckAmount,
    handleCloseForm,
    handleEmployeeSearchChange,
    handleProjectSearchChange,
    onSubmit,
  } = useOvertimeFormModal(props);
  return (
    <Modal
      open={open}
      onClose={handleCloseForm}
      title={`${!overtimeExpenseId ? 'Create' : 'Edit'} Overtime Data`}
      width={960}
    >
      <Modal.Content className={styles.overtimeForm}>
        <form className="grid grid-cols-2 gap-5">
          <Controller
            control={control}
            name="date"
            render={({ field: { ref, onChange, value }, fieldState: { error } }) => (
              <DatePicker
                ref={ref}
                onChange={(inputValue) => {
                  onChange(inputValue ? formatDateApi(inputValue) : undefined);
                  setValue('amount', 0);
                }}
                label="Overtime Date"
                placeholder="Select Date"
                error={!!error}
                message={error && error.message}
                value={new Date(value)}
                required
                block
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
                    onChange(null);
                    setValue('employeeId', '');
                    return;
                  }
                  onChange(changeValue);
                  handleEmployeeSearchChange(changeValue.label);
                  setValue('amount', 0);
                  setValue('employeeId', String(changeValue.value || ''));
                }}
                value={value}
                error={!!errors.employeeId}
                message={errors.employeeId && errors.employeeId.message}
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
                    onChange(null);
                    setValue('projectId', '');
                    return;
                  }
                  onChange(changeValue);
                  handleProjectSearchChange(changeValue.label);
                  setValue('amount', 0);
                  setValue('projectId', String(changeValue.value));
                }}
                value={value}
                error={!!errors.projectId}
                message={errors.projectId && errors.projectId.message}
                contentEditable={false}
                block
                required
              />
            )}
          />
          <Controller
            control={control}
            name="teamId"
            render={({ field: { ref, onChange, value }, fieldState: { error } }) => (
              <Select
                ref={ref}
                options={teamOption}
                value={value}
                onChange={(e) => {
                  onChange(e.target.value);
                  setValue('amount', 0);
                }}
                error={!!error}
                message={error && error.message}
                label="Team Name"
                placeholder="Select Team"
                required
                block
              />
            )}
          />
          <Description
            label="Overtime Type"
            value="Weekday"
            layout="vertical"
          />
          <div>
            <div className="flex gap-2 items-end">
              <Controller
                control={control}
                name="totalHours"
                render={({ field: { ref, onChange, value }, fieldState: { error } }) => (
                  <TextField
                    className={`${styles.overtimeForm} max-w-20`}
                    classes={{ input: `${styles.overtimeForm}` }}
                    ref={ref}
                    onChange={(e) => {
                      const { target: { value: inputValue } } = e;
                      onChange(inputValue !== '' ? Number(inputValue) : '');
                      setValue('amount', 0);
                    }}
                    label="Hours"
                    placeholder="0"
                    error={!!error}
                    type="number"
                    value={value !== undefined ? value : ''}
                    required
                  />
                )}
              />
              <Button
                className="h-fit"
                color="primary"
                variant="outline"
                onClick={handleCheckAmount}
                loading={isFetchingAmount}
              >
                Check Amount
              </Button>
            </div>
            {errors.totalHours && (
              <Typography
                variant="label"
                className="text-danger-500"
              >
                {errors.totalHours.message}
              </Typography>
            )}
          </div>
          <div>
            <Description
              label="Amount"
              value={displayAmount}
              layout="vertical"
            />
            {errors.amount && (
              <Typography
                variant="label"
                className="text-danger-500"
              >
                {errors.amount.message}
              </Typography>
            )}
          </div>
        </form>
      </Modal.Content>
      <Modal.Footer>
        <div className="flex justify-center gap-4">
          <Button
            color="danger"
            variant="outline"
            onClick={handleCloseForm}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            loading={isSubmitting}
            onClick={handleSubmit(onSubmit)}
          >
            {`${!overtimeExpenseId ? 'Save' : 'Edit'} Overtime Data`}
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default OvertimeFormModal;
