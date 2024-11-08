import { Controller } from 'react-hook-form';

import Autocomplete from '@/components/base/Autocomplete';
import Button from '@/components/base/Button';
import Label from '@/components/base/Label';
import Paper from '@/components/base/Paper';
import { IcAdd, IcX } from '@/components/icons';
import type { SelectItem } from '@/types/inputs';

import useApprovalLineForm from './ApprovalLineForm.hooks';

const ApprovalLineForm = () => {
  const {
    control,
    approvalLines,
    approvalLinesOptional,
    employeeApproverOption,
    employeeSearchValue1,
    employeeSearchValue2,
    employeeValueLine1,
    employeeValueLine2,
    handleEmployeeSearchChange,
    addApprover,
    onFocusSelect,
    onHandleChangeApprover,
    deleteApprover,
  } = useApprovalLineForm();

  return (
    <Paper title="Approval Line" className="p-4">
      {approvalLines && (
        <div className="flex flex-col gap-4 *:p-4 *:shadow-md">
          <Paper title="Line 1">
            {approvalLines
              && approvalLines.map((__, i) => (
                <div className="mb-4" key={`${approvalLines[0].id}`}>
                  <Controller
                    control={control}
                    name={`approvalLines.${i}.approvals`}
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
                              (employeeValueLine1[i] && employeeValueLine1[i].label)
                                ? employeeValueLine1[i] : value
                            }
                            placeholder={`Select Approver ${i + 1}`}
                            options={employeeApproverOption}
                            inputValue={employeeSearchValue1[i]}
                            onInputChange={
                              (_e, inputValue) => handleEmployeeSearchChange(inputValue, i, 1)
                            }
                            onChange={(_e, selectedValue) => {
                              const changeValue = selectedValue as SelectItem;
                              onHandleChangeApprover(i, changeValue, 1);
                              if (!changeValue) {
                                onChange({
                                  value: '',
                                  label: '',
                                });
                                return;
                              }
                              onChange(changeValue);
                            }}
                            onFocus={() => {
                              onFocusSelect();
                            }}
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
                                onClick={() => deleteApprover(i, value, 1)}
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
              onClick={() => addApprover(1)}
              color="primary"
              className="mb-4"
              startIcon={<IcAdd className="fill-n-1" />}
            >
              Add Approver
            </Button>
          </Paper>
          <Paper title="Line 2">
            {approvalLinesOptional
              && approvalLinesOptional.map((__, i) => (
                <div className="mb-4" key={`${approvalLinesOptional[0].id}`}>
                  <Controller
                    control={control}
                    name={`approvalLinesOptional.${i}.approvals`}
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
                          value={`Approver ${i + 1}`}
                          id={name}
                        />
                        <div className="flex items-center gap-2 ">
                          <Autocomplete
                            ref={ref}
                            value={
                              (employeeValueLine2[i] && employeeValueLine2[i].label)
                                ? employeeValueLine2[i] : value
                            }
                            placeholder={`Select Approver ${i + 1}`}
                            options={employeeApproverOption}
                            inputValue={employeeSearchValue2[i]}
                            onInputChange={
                              (_e, inputValue) => handleEmployeeSearchChange(inputValue, i, 2)
                            }
                            onChange={(_e, selectedValue) => {
                              const changeValue = selectedValue as SelectItem;
                              onHandleChangeApprover(i, changeValue, 2);
                              if (!changeValue) {
                                onChange({
                                  value: '',
                                  label: '',
                                });
                                return;
                              }
                              onChange(changeValue);
                            }}
                            onFocus={() => {
                              onFocusSelect();
                            }}
                            error={!!error}
                            message={
                              error
                              && error.message
                            }
                            contentEditable={false}
                            block
                            className="w-1/2"
                          />
                          {i > 0
                            && (
                              <Button
                                className="p-1 bg-transparent hover:bg-n-4"
                                rounded
                                onClick={() => deleteApprover(i, value, 2)}
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
              onClick={() => addApprover(2)}
              color="primary"
              className="mb-4"
              startIcon={<IcAdd className="fill-n-1" />}
            >
              Add Approver
            </Button>
          </Paper>
        </div>
      )}
    </Paper>
  );
};

export default ApprovalLineForm;
