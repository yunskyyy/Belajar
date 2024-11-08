import { Controller } from 'react-hook-form';

import Paper from '@/components/base/Paper';
import Select from '@/components/base/Select';
import TextField from '@/components/base/Textfield';
import { numbersOnly } from '@/helpers';

import { PTKP_OPTION } from './PayrollInformationForm.constants';
import { npwpFormat } from './PayrollInformationForm.helpers';
import usePayrollInformationForm from './PayrollInformationForm.hooks';

const PayrollInformationForm = () => {
  const {
    bankOption,
    control,
  } = usePayrollInformationForm();

  return (
    <Paper title="Payroll Information" className="p-4">
      <div className="grid grid-cols-2 gap-5">
        <Controller
          control={control}
          name="npwp"
          render={({
            field: {
              onChange,
              value,
              name,
            },
            fieldState: { error },
          }) => (
            <TextField
              name={name}
              label="NPWP"
              placeholder="Enter NPWP"
              value={npwpFormat(value)}
              labelLayout="vertical"
              onChange={onChange}
              maxLength={20}
              message={error && error.message}
              error={!!error}
              required
              block
            />
          )}
        />
        <Controller
          control={control}
          name="latestNpwp"
          render={({
            field: {
              onChange,
              value,
              name,
            },
            fieldState: { error },
          }) => (
            <TextField
              name={name}
              label="NPWP (16 Digit)"
              placeholder="Enter NPWP (16 Digit)"
              value={value || ''}
              labelLayout="vertical"
              onChange={onChange}
              maxLength={16}
              message={error && error.message}
              error={!!error}
              block
            />
          )}
        />
        <Controller
          control={control}
          name="ptkpStatus"
          render={({
            field: {
              onChange,
              value,
              name,
            },
            fieldState: { error },
          }) => (
            <Select
              name={name}
              label="PTKP Status"
              placeholder="Select PTKP Status"
              options={PTKP_OPTION}
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
          name="bankCode"
          render={({
            field: {
              onChange,
              value,
              name,
            },
            fieldState: { error },
          }) => (
            <Select
              name={name}
              label="Bank Name"
              placeholder="Enter Bank Name"
              options={bankOption}
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
          name="bankAccountNumber"
          render={({
            field: {
              onChange,
              value,
              name,
            },
            fieldState: { error },
          }) => (
            <TextField
              name={name}
              label="Bank Account"
              placeholder="Enter Bank Account"
              value={value}
              labelLayout="vertical"
              onChange={(event) => onChange(numbersOnly(event.target.value))}
              message={error && error.message}
              error={!!error}
              required
              block
            />
          )}
        />

        <Controller
          control={control}
          name="bankAccountHolderName"
          render={({
            field: {
              onChange,
              value,
              name,
            },
            fieldState: { error },
          }) => (

            <TextField
              name={name}
              label="Bank Account Holder"
              placeholder="Enter Bank Account Holder"
              error={!!error}
              message={error && error.message}
              value={value}
              onChange={({ target: { value: inputValue = '' } }) => onChange(inputValue.toUpperCase())}
              block
              required
            />
          )}
        />
        <Controller
          control={control}
          name="bpjsTkId"
          render={({
            field: {
              onChange,
              value,
              name,
            },
            fieldState: { error },
          }) => (
            <TextField
              name={name}
              label="ID BPJS Ketenagakerjaan"
              placeholder="Enter ID BPJS Ketenagakerjaan"
              value={value}
              labelLayout="vertical"
              onChange={(event) => onChange(numbersOnly(event.target.value))}
              maxLength={11}
              message={error && error.message}
              error={!!error}
              required
              block
            />
          )}
        />
        <Controller
          control={control}
          name="bpjsKesId"
          render={({
            field: {
              onChange,
              value,
              name,
            },
            fieldState: { error },
          }) => (
            <TextField
              name={name}
              label="ID BPJS Kesehatan"
              placeholder="Enter ID BPJS Kesehatan"
              value={value}
              labelLayout="vertical"
              onChange={(event) => onChange(numbersOnly(event.target.value))}
              maxLength={13}
              message={error && error.message}
              error={!!error}
              required
              block
            />
          )}
        />
      </div>
    </Paper>
  );
};

export default PayrollInformationForm;
