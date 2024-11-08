import { Controller } from 'react-hook-form';

import DatePicker from '@/components/base/DatePicker';
import Paper from '@/components/base/Paper';
import Select from '@/components/base/Select';
import { formatDateApi } from '@/utils';
import useSettingsForm
  from '@/views/Reimbursement/ReimburseSettings/ReimburseSettingsForm/components/SettingsForm/SettingsForm.hooks';

const SettingsForm = () => {
  const {
    categoryOption,
    typeOption,
    control,
  } = useSettingsForm();

  return (
    <Paper className="p-4">
      <div className="grid grid-cols-2 gap-5">
        <Controller
          control={control}
          name="reimbursementCategoryId"
          render={(
            {
              field: {
                ref,
                onChange,
                name,
                value,
              },
              fieldState: { error },
            },
          ) => (
            <Select
              ref={ref}
              name={name}
              label="Category"
              placeholder="Select Category"
              options={categoryOption}
              value={value}
              labelLayout="vertical"
              onChange={onChange}
              message={error && error.message}
              error={!!error}
              required
              block
            />
          )}
        />
        <Controller
          control={control}
          name="reimbursementTypeId"
          render={(
            {
              field: {
                ref,
                onChange,
                name,
                value,
              },
              fieldState: { error },
            },
          ) => (
            <Select
              ref={ref}
              name={name}
              label="Type"
              placeholder="Select Type"
              options={typeOption}
              value={value}
              labelLayout="vertical"
              onChange={onChange}
              message={error && error.message}
              error={!!error}
              required
              block
            />
          )}
        />
        <Controller
          control={control}
          name="effectiveDate"
          render={(
            {
              field: {
                ref,
                onChange,
                name,
                value,
              },
              fieldState: { error },
            },
          ) => (
            <DatePicker
              ref={ref}
              name={name}
              label="Effective Date"
              placeholder="Enter Effective Date"
              error={!!error}
              message={error && error.message}
              onChange={
                (inputValue) => onChange(inputValue ? formatDateApi(inputValue) : '')
              }
              value={new Date(value)}
              block
              required
            />
          )}

        />

      </div>
    </Paper>
  );
};

export default SettingsForm;
