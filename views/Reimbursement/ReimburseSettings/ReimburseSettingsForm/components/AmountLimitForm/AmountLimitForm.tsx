import { Controller } from 'react-hook-form';

import Autocomplete from '@/components/base/Autocomplete';
import Button from '@/components/base/Button';
import Label from '@/components/base/Label';
import Paper from '@/components/base/Paper';
import Switch from '@/components/base/Switch';
import TextField from '@/components/base/Textfield';
import { IcAdd, IcX } from '@/components/icons';
import { numbersOnly } from '@/helpers';
import type { SelectItem } from '@/types/inputs';
import { toIDR } from '@/utils';

import useAmountLimitForm
  from './AmountLimitForm.hooks';

const AmountLimitForm = () => {
  const {
    projectOption,
    control,
    projects,
    projectValue,
    projectSearchValue,
    handleProjectSearchChange,
    deleteProject,
    addProject,
    onFocusSelect,
    onHandleChangeProject,
  } = useAmountLimitForm();

  return (
    <Paper title="Amount Line" className="p-4">
      {projects && projects.map((__, i) => (
        <div className="grid grid-cols-8 gap-2 mb-4">
          <div className="col-span-3">
            <Label required value="Project" id={`projects.${i}.projectId`} />
          </div>
          <div className="col-span-2">
            <Label required value="Amount Limit" id={`projects.${i}.budgetLimit`} />
          </div>
          <div className="col-span-2">
            <Label required value="Calculate to Person" id={`projects.${i}.budgetLimit`} />
          </div>
          <div className="col-span-1 w-auto" />
          <div className="col-span-3">
            <Controller
              name={`projects.${i}.project`}
              render={({
                field: {
                  ref,
                  onChange,
                  name,
                  value,
                },
                fieldState: { error },
              }) => (
                <Autocomplete
                  ref={ref}
                  name={name}
                  value={
                    (projectValue[i] && projectValue[i].label)
                      ? projectValue[i] : value
                  }
                  placeholder="Select Project Code"
                  options={projectOption}
                  className="w-full flex"
                  inputValue={projectSearchValue[i]}
                  onInputChange={
                    (_e, inputValue) => {
                      handleProjectSearchChange(inputValue, i);
                    }
                  }
                  onChange={(_e, selectedValue) => {
                    const changeValue = selectedValue as SelectItem;
                    onHandleChangeProject(i, changeValue);
                    if (!changeValue) {
                      onChange({
                        value: '',
                        label: '',
                      });
                      return;
                    }
                    onChange(changeValue);
                  }}
                  onFocus={onFocusSelect}
                  error={!!error}
                  message={
                    error
                    && error.message
                  }
                  contentEditable={false}
                  block
                />
              )}
            />
          </div>
          <div className="col-span-2">
            <Controller
              control={control}
              name={`projects.${i}.budgetLimit`}
              render={({
                field: {
                  ref,
                  onChange,
                  value,
                },
                fieldState: { error },
              }) => (
                <div>
                  <TextField
                    ref={ref}
                    value={toIDR(Number(value))}
                    onChange={(event) => {
                      onChange(Number(numbersOnly(event.target.value)));
                    }}
                    error={!!error}
                    message={error && error.message}
                    required
                    block
                    className="w-full"
                  />
                </div>
              )}
            />
          </div>
          <div className="col-span-2">
            <Controller
              control={control}
              name={`projects.${i}.countToPerson`}
              render={({
                field: {
                  ref,
                  onChange,
                  value,
                },
                fieldState: { error },
              }) => (
                <Switch
                  ref={ref}
                  checked={value}
                  onChange={onChange}
                  error={!!error}
                  message={error && error.message}
                />
              )}
            />
          </div>
          <div className="col-span-1 flex">
            {i > 0
              && (
                <Button
                  className="p-1 bg-transparent hover:bg-n-4"
                  rounded
                  onClick={() => deleteProject(i, projectValue[i].value)}
                >
                  <IcX className="[&>*]:fill-n-8 w-5 h-5" />
                </Button>
              )}
          </div>
        </div>
      ))}
      <Button
        onClick={() => addProject()}
        color="primary"
        className="mb-4"
        startIcon={<IcAdd className="fill-n-1" />}
      >
        Add Project
      </Button>
    </Paper>
  );
};

export default AmountLimitForm;
