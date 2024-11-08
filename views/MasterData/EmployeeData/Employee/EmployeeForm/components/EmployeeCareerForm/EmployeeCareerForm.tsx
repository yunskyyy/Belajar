import { Controller } from 'react-hook-form';

import DatePicker from '@/components/base/DatePicker';
import Paper from '@/components/base/Paper';
import Select from '@/components/base/Select';
import { formatDateApi } from '@/utils';

import useEmployeeCareerForm from './EmployeeCareerForm.hooks';

const EmployeeCareerForm = () => {
  const {
    control,
    divisionOption,
    employmentStatusOption,
    levelOption,
    positionOption,
    refetchPosition,
    setValue,
    structuralOption,
  } = useEmployeeCareerForm();
  return (
    <Paper title="Employee Career" className="p-4">
      <div className="grid grid-cols-2 gap-5">
        <Controller
          control={control}
          name="divisionId"
          render={({
            field: {
              ref,
              onChange,
              value,
              name,
            },
            fieldState: { error },
          }) => (
            <Select
              ref={ref}
              name={name}
              label="Division"
              placeholder="Select Division"
              options={divisionOption}
              value={value}
              labelLayout="vertical"
              onChange={(event) => {
                onChange(event.target.value);
                setValue('positionId', '');
                refetchPosition();
              }}
              error={!!error}
              message={error && error.message}
              required
              block
            />
          )}
        />
        <Controller
          control={control}
          name="positionId"
          render={({
            field: {
              ref,
              onChange,
              value,
              name,
            },
            fieldState: { error },
          }) => (
            <Select
              ref={ref}
              name={name}
              label="Position"
              placeholder="Select Position"
              options={positionOption}
              value={value}
              labelLayout="vertical"
              onChange={onChange}
              error={!!error}
              message={error && error.message}
              required
              block
            />
          )}
        />
        <Controller
          control={control}
          name="structuralId"
          render={({
            field: {
              ref,
              onChange,
              value,
              name,
            },
            fieldState: { error },
          }) => (
            <Select
              ref={ref}
              name={name}
              label="Structural/Specialist Title"
              placeholder="Select Structural/Specialist Title"
              options={structuralOption}
              value={value}
              labelLayout="vertical"
              onChange={onChange}
              error={!!error}
              message={error && error.message}
              required
              block
            />
          )}
        />
        <Controller
          control={control}
          name="levelId"
          render={({
            field: {
              ref,
              onChange,
              value,
              name,
            },
            fieldState: { error },
          }) => (
            <Select
              ref={ref}
              name={name}
              label="Level"
              placeholder="Select Level"
              options={levelOption}
              value={value}
              labelLayout="vertical"
              onChange={onChange}
              error={!!error}
              message={error && error.message}
              required
              block
            />
          )}
        />
        <Controller
          control={control}
          name="employmentStatusId"
          render={({
            field: {
              ref,
              onChange,
              value,
              name,
            },
            fieldState: { error },
          }) => (
            <Select
              ref={ref}
              name={name}
              label="Employment Status"
              placeholder="Select Employment Status"
              options={employmentStatusOption}
              value={value}
              labelLayout="vertical"
              onChange={onChange}
              error={!!error}
              message={error && error.message}
              required
              block
            />
          )}
        />

        <Controller
          control={control}
          name="joinDate"
          render={({
            field: {
              ref,
              onChange,
              value,
              name,
            },
            fieldState: { error },
          }) => (
            <DatePicker
              ref={ref}
              name={name}
              label="Join Date"
              placeholder="Enter Join Date"
              error={!!error}
              message={error && error.message}
              onChange={
                (inputValue) => onChange(inputValue ? formatDateApi(inputValue) : '')
              }
              value={value ? new Date(value) : null}
              block
              required
            />
          )}
        />
        <Controller
          control={control}
          name="signDate"
          render={({
            field: {
              ref,
              onChange,
              value,
              name,
            },
            fieldState: { error },
          }) => (
            <DatePicker
              ref={ref}
              name={name}
              label="Sign Date"
              placeholder="Enter Sign Date"
              error={!!error}
              message={error && error.message}
              onChange={
                (inputValue) => onChange(inputValue ? formatDateApi(inputValue) : null)
              }
              value={value ? new Date(value) : null}
              block
            />
          )}
        />
        <Controller
          control={control}
          name="endDate"
          render={({
            field: {
              ref,
              onChange,
              value,
              name,
            },
            fieldState: { error },
          }) => (
            <DatePicker
              ref={ref}
              name={name}
              label="End Date"
              placeholder="Enter End Date"
              error={!!error}
              message={error && error.message}
              onChange={
                (inputValue) => onChange(inputValue ? formatDateApi(inputValue) : null)
              }
              value={value ? new Date(value) : null}
              block
            />
          )}
        />
      </div>
    </Paper>
  );
};

export default EmployeeCareerForm;
