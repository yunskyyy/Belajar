import { addDays } from 'date-fns';
import { Controller } from 'react-hook-form';

import Autocomplete from '@/components/base/Autocomplete';
import DatePicker from '@/components/base/DatePicker';
import Select from '@/components/base/Select';
import TextField from '@/components/base/Textfield';
import PayrollDataType from '@/enums/payrollDataType';
import { numbersOnly } from '@/helpers';
import type { SelectItem } from '@/types/inputs';
import { formatDateApi, toIDR } from '@/utils';

import { PAYROLL_TYPE_OPTION } from '../../EmployeeDataForm.constants';

import useEmployeeDataFields from './EmployeeDataFields.hooks';
import type { EmployeeDataFieldsProps } from './EmployeeDataFields.types';

const EmployeeDataFields = (props: EmployeeDataFieldsProps) => {
  const {
    componentItems = [],
  } = props;
  const {
    componentId,
    componentNameOption,
    componentSearchValue,
    componentTypeId,
    componentTypeOption,
    control,
    setValue,
    handleComponentSearchChange,
  } = useEmployeeDataFields();

  return (
    <div className="grid grid-cols-2 gap-8 my-8">
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
            options={PAYROLL_TYPE_OPTION}
            value={value}
            onChange={onChange}
            error={!!error}
            message={error && error.message}
            label="Type"
            disabled
            required
            block
          />
        )}
      />
      <Controller
        control={control}
        name="componentTypeId"
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
            options={componentTypeOption}
            value={value}
            onChange={
              (inputValue) => {
                onChange(inputValue);
                setValue('componentId', '');
              }
            }
            label="Component Type"
            placeholder="Choose..."
            error={!!error}
            message={error && error.message}
            required
            block
          />
        )}
      />
      <Controller
        control={control}
        name="componentNameObject"
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
            label="Component Name"
            placeholder={!componentTypeId ? 'Choose component type first' : 'Type to search...'}
            options={!componentTypeId ? [] : componentNameOption}
            inputValue={componentSearchValue}
            onInputChange={
              (_e, inputValue) => handleComponentSearchChange(inputValue)
            }
            onChange={(_e, selectedValue) => {
              const changeValue = selectedValue as SelectItem;
              if (!changeValue) {
                onChange({
                  value: '',
                  label: '',
                });
                setValue('amount', String(0));
                return;
              }
              onChange(changeValue);
              handleComponentSearchChange(changeValue.label);
              setValue('componentId', String(changeValue.value));

              const foundComponent = componentItems.findLast((el) => (
                el.employeeComponentId
                && el.componentId === String(changeValue.value)
              ));

              if (foundComponent) {
                setValue('amount', String(foundComponent.amountNumber));
              } else {
                setValue('amount', String(0));
              }
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
        name="effectiveDate"
        render={(
          {
            field: {
              ref,
              onChange,
              value,
            },
            fieldState: { error },
          },
        ) => (
          <DatePicker
            ref={ref}
            onChange={
              (inputValue) => onChange(inputValue ? formatDateApi(inputValue) : '')
            }
            value={value ? new Date(value) : null}
            error={!!error}
            message={error && error.message}
            minDate={(() => {
              const foundComponent = componentItems.findLast((el) => (
                el.employeeComponentId
                && el.componentId === componentId
                && el.status
              ));
              if (foundComponent) {
                const daysAddition = foundComponent.type === PayrollDataType.Adjustment ? 7 : 1;
                return addDays(
                  new Date(foundComponent.effectiveDateOrigin).setHours(0),
                  daysAddition,
                );
              }
              return undefined;
            })()}
            label="Effective Date"
            placeholder="Choose Date"
            required
            block
          />
        )}
      />
      <Controller
        control={control}
        name="amount"
        render={({
          field: {
            ref,
            value,
          },
          fieldState: { error },
        }) => (
          <TextField
            ref={ref}
            value={toIDR(Number(value))}
            error={!!error}
            message={error && error.message}
            label="Current Amount"
            disabled
            block
          />
        )}
      />
      <Controller
        control={control}
        name="newAmount"
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
            value={toIDR(Number(value))}
            onChange={(event) => {
              onChange(numbersOnly(event.target.value));
            }}
            label="New Amount"
            error={!!error}
            message={error && error.message}
            required
            block
          />
        )}
      />
    </div>
  );
};

export default EmployeeDataFields;
