import type { ChangeEvent } from 'react';
import { Controller } from 'react-hook-form';

import Autocomplete from '@/components/base/Autocomplete';
import Button from '@/components/base/Button';
import Label from '@/components/base/Label';
import Paper from '@/components/base/Paper';
import Radio from '@/components/base/Radio';
import { IcAdd, IcX } from '@/components/icons';
import type { SelectItem } from '@/types/inputs';
import RULE_APPROVAL_OPTION from '@/views/MasterData/EmployeeData/EmployeeData.constants';

import useApprovalLineForm from './ApprovalLineForm.hooks';

const ApprovalLineForm = () => {
  const {
    control,
    employeeApproverOption,
    employeeSearchValueLine1,
    employeeSearchValueLine2,
    employeeSearchValueLine3,
    approvalLines,
    employeeValueLine1,
    addApprover,
    deleteApprover,
    handleEmployeeLine1SearchChange,
    handleEmployeeLine2SearchChange,
    handleEmployeeLine3SearchChange,
    setEmployeeValueLine1,
    setQuery,
    getNonEmptyEmployeeIds,
    getValues,
    setValue,
  } = useApprovalLineForm();
  return (
    <Paper title="Approval Line" className="p-4">
      {approvalLines && (
        <div className="flex flex-col gap-4 *:p-4 *:shadow-md">
          <Paper title="Line 1">
            {approvalLines[0] && approvalLines[0].employeeApprovals
              && approvalLines[0].employeeApprovals.map((__, i) => (
                <div className="mb-4" key={`${approvalLines[0].id}`}>
                  <Controller
                    control={control}
                    name={`approvalLines.${0}.approvals.${i}`}
                    render={({
                      field: {
                        ref,
                        onChange,
                        name,
                        value,
                      },
                      fieldState: { error },
                    }) => (
                      <div className="flex flex-col gap-2">
                        <Label
                          required
                          value={`Approver ${i + 1}`}
                          id={name}
                        />
                        <div className="flex items-center gap-2 ">
                          <Autocomplete
                            ref={ref}
                            value={
                              employeeValueLine1[i]
                              && employeeValueLine1[i].value.length !== 0
                                ? employeeValueLine1[i] : value
                            }
                            placeholder={`Select Approver ${i + 1}`}
                            options={employeeApproverOption}
                            inputValue={employeeSearchValueLine1[i]}
                            onInputChange={
                              (_e, inputValue) => handleEmployeeLine1SearchChange(inputValue, i)
                            }
                            onChange={(_e, selectedValue) => {
                              const changeValue = selectedValue as SelectItem;
                              const newForm = getValues('approvalLines');
                              if (!changeValue) {
                                onChange({
                                  value: '',
                                  label: '',
                                });
                                if (
                                  newForm
                                  && newForm[0].employeeApprovals) {
                                  newForm[0].employeeApprovals[i] = '';
                                  setValue('approvalLines', newForm);
                                }
                                setEmployeeValueLine1((prevState) => {
                                  const newArray = [...prevState];
                                  newArray[i] = {
                                    value: '',
                                    label: '',
                                  };
                                  return newArray;
                                });
                                return;
                              }
                              onChange(changeValue);
                              setEmployeeValueLine1((prevState) => {
                                const newArray = [...prevState];
                                newArray[i] = {
                                  value: String(changeValue.value),
                                  label: changeValue.label,
                                };
                                return newArray;
                              });
                              if (
                                newForm
                                && newForm[0].employeeApprovals) {
                                newForm[0].employeeApprovals[i] = String(changeValue.value);
                                setValue('approvalLines', newForm);
                              }
                            }}
                            onFocus={() => setQuery({
                              s: '',
                              employeeIds: [
                                ...getNonEmptyEmployeeIds()],
                            })}
                            error={!!error}
                            message={
                              error
                              && error.message
                            }
                            contentEditable={false}
                            block
                            required
                            className="w-1/2"
                          />
                          {i > 0
                            && (
                              <Button
                                className="p-1 bg-transparent hover:bg-n-4"
                                rounded
                                onClick={() => deleteApprover(i, value)}
                              >
                                <IcX className="[&>*]:fill-n-8 w-5 h-5" />
                              </Button>
                            )}
                        </div>
                      </div>
                    )}
                  />
                </div>
              ))}
            <Button
              onClick={() => addApprover()}
              color="primary"
              className="mb-4"
              startIcon={<IcAdd className="fill-n-1" />}
            >
              Add Approver
            </Button>
            <Controller
              control={control}
              name={`approvalLines.${0}.rule`}
              render={({
                field: {
                  ref,
                  onChange,
                  value,
                  name,
                },
                fieldState: { error },
              }) => (
                <Radio
                  name={name}
                  label="Rule Approval"
                  options={RULE_APPROVAL_OPTION}
                  error={!!error}
                  message={error && error.message}
                  classes={{ container: 'flex items-center h-16' }}
                  required
                  ref={ref}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    onChange(Number(e.target.value));
                  }}
                  checkedValue={String(value)}
                />
              )}
            />
          </Paper>
          <Paper title="Line 2">
            <Controller
              control={control}
              name={`approvalLines.${1}.approvals.${0}`}
              render={({
                field: {
                  onChange,
                  value,
                  ref,
                },
                fieldState: { error },
              }) => (
                <Autocomplete
                  ref={ref}
                  value={value}
                  label="Approver"
                  placeholder="Select Approver"
                  options={employeeApproverOption}
                  inputValue={employeeSearchValueLine2}
                  onInputChange={
                    (_e, inputValue) => handleEmployeeLine2SearchChange(inputValue)
                  }
                  onChange={(_e, selectedValue) => {
                    const changeValue = selectedValue as SelectItem;
                    if (!changeValue) {
                      onChange({
                        value: '',
                        label: '',
                      });
                      const newForm = getValues('approvalLines');
                      newForm[1].employeeApprovals[0] = '';
                      setValue('approvalLines', newForm);
                      return;
                    }
                    onChange(changeValue);
                    const newForm = getValues('approvalLines');
                    if (
                      newForm
                      && newForm[1].employeeApprovals) {
                      newForm[1].employeeApprovals[0] = String(changeValue.value);
                      setValue('approvalLines', newForm);
                    } else if (!newForm[1].employeeApprovals) {
                      newForm[1].employeeApprovals = newForm[1].employeeApprovals ?? [];
                      newForm[1].employeeApprovals.push(String(changeValue.value));
                      setValue('approvalLines', newForm);
                    }
                  }}
                  onFocus={() => setQuery({
                    s: '',
                    employeeIds: [
                      ...getNonEmptyEmployeeIds()],
                  })}
                  error={!!error}
                  message={
                    error
                    && error.message
                  }
                  contentEditable={false}
                  block
                  required
                  className="w-1/2"
                />
              )}
            />
          </Paper>
          <Paper title="Line 3">
            <Controller
              control={control}
              name={`approvalLinesOptional.approvals.${0}`}
              render={({
                field: {
                  onChange,
                  value,
                  ref,
                },
                fieldState: { error },
              }) => (
                <Autocomplete
                  ref={ref}
                  value={(value && value.label) || ''}
                  label="Approver"
                  placeholder="Select Approver"
                  options={employeeApproverOption}
                  inputValue={employeeSearchValueLine3}
                  onInputChange={
                    (_e, inputValue) => handleEmployeeLine3SearchChange(inputValue)
                  }
                  onChange={(_e, selectedValue) => {
                    const changeValue = selectedValue as SelectItem;
                    const newForm = getValues('approvalLinesOptional');
                    if (!changeValue) {
                      if (
                        newForm
                        && newForm.employeeApprovals) {
                        setQuery({
                          s: '',
                          employeeIds: [
                            ...getNonEmptyEmployeeIds()],
                        });
                        newForm.employeeApprovals[0] = '';
                        setValue('approvalLinesOptional', newForm);
                      }

                      onChange({
                        value: '',
                        label: '',
                      });
                      return;
                    }
                    onChange(changeValue);
                    if (
                      newForm
                      && newForm.employeeApprovals) {
                      newForm.employeeApprovals[0] = String(changeValue.value);
                      setValue('approvalLinesOptional', newForm);
                    }
                  }}
                  onFocus={() => setQuery({
                    s: '',
                    employeeIds: [
                      ...getNonEmptyEmployeeIds()],
                  })}
                  error={!!error}
                  message={error && error.message}
                  contentEditable={false}
                  block
                  className="w-1/2"
                />
              )}
            />
          </Paper>
        </div>
      )}
    </Paper>
  );
};

export default ApprovalLineForm;
