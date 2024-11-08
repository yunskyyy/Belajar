import { Controller } from 'react-hook-form';

import Button from '@/components/base/Button';
import Select from '@/components/base/Select';
import Table from '@/components/base/Table';
import TextField from '@/components/base/Textfield';
import Typography from '@/components/base/Typography';
import { IcAdd, IcTrash } from '@/components/icons';
import ActionButton from '@/components/ui/ActionButton';
import { numbersOnly } from '@/helpers';
import { toIDR } from '@/utils';

import { RUN_PAYROLL_TYPE_OPTION } from '../../ModalEditEmployee.constants';

import useAdditionalEarning from './AdditionalEarning.hooks';
import type { AdditionalEarningsProps } from './AdditionalEarning.types';

const AdditionalEarning = (props: AdditionalEarningsProps) => {
  const {
    additionalEarnings = [],
    control,
    dateOptions,
    fields,
    projectOptions,
    setValue,
    getFilteredDateOptions,
    getFilteredProjectOptions,
    handleAddComponent,
    handleDelete,
    onchangeDate,
  } = useAdditionalEarning(props);

  const filteredAdditionalEarnings = additionalEarnings.filter((el) => !el.isDeleted);
  return (
    <div className="mt-6 flex flex-col gap-6">
      <Table className="table-fixed border-solid border border-neutral-300
            rounded-xl border-separate border-tools-table-outline py-4"
      >
        <Table.TableHead>
          <Table.TableRow>
            <Table.TableCell>
              Type
            </Table.TableCell>
            <Table.TableCell>
              Project Code
            </Table.TableCell>
            <Table.TableCell>
              Date
            </Table.TableCell>
            <Table.TableCell>
              Amount
            </Table.TableCell>
            <Table.TableCell width={50}>
              Action
            </Table.TableCell>
          </Table.TableRow>
        </Table.TableHead>
        <Table.TableBody>
          {filteredAdditionalEarnings.length ? fields.map((field, i) => (
            !field.isDeleted && (
              <Table.TableRow key={field.id}>
                <Table.TableCell>
                  <Controller
                    control={control}
                    name={`additionalEarnings.${i}.type`}
                    render={({
                      field: { ref, onChange, value },
                      fieldState: { error },
                    }) => (
                      <Select
                        ref={ref}
                        options={RUN_PAYROLL_TYPE_OPTION}
                        value={String(value)}
                        onChange={(event) => {
                          onChange(Number(event.target.value));
                          setValue(`additionalEarnings.${i}.projectId`, '');
                          setValue(`additionalEarnings.${i}.date`, '');
                          setValue(`additionalEarnings.${i}.amount`, 0);
                        }}
                        error={!!error}
                        message={error && error.message}
                        required
                        block
                      />
                    )}
                  />
                </Table.TableCell>
                <Table.TableCell>
                  <Controller
                    control={control}
                    name={`additionalEarnings.${i}.projectId`}
                    render={({
                      field: { ref, onChange, value },
                      fieldState: { error },
                    }) => (
                      <Select
                        ref={ref}
                        options={projectOptions}
                        value={value}
                        onChange={(e) => {
                          onChange(e);
                          setValue(`additionalEarnings.${i}.date`, '');
                          setValue(`additionalEarnings.${i}.amount`, 0);
                        }}
                        filteredOptions={getFilteredProjectOptions(i)}
                        error={!!error}
                        message={error && error.message}
                        required
                        block
                      />
                    )}
                  />
                </Table.TableCell>
                <Table.TableCell>
                  <Controller
                    control={control}
                    name={`additionalEarnings.${i}.date`}
                    render={({
                      field: { ref, onChange, value },
                      fieldState: { error },
                    }) => (
                      <Select
                        ref={ref}
                        options={dateOptions}
                        filteredOptions={getFilteredDateOptions(i)}
                        value={value}
                        onChange={(event) => {
                          onChange(event);
                          onchangeDate(i, String(event.target.value));
                        }}
                        error={!!error}
                        message={error && error.message}
                        required
                        block
                      />
                    )}
                  />
                </Table.TableCell>
                <Table.TableCell>
                  <Controller
                    control={control}
                    name={`additionalEarnings.${i}.amount`}
                    render={({
                      field: { ref, onChange, value },
                      fieldState: { error },
                    }) => (
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
                      />
                    )}
                  />
                </Table.TableCell>
                <Table.TableCell>
                  <ActionButton
                    color="danger"
                    onClick={() => handleDelete(i)}
                  >
                    <IcTrash />
                  </ActionButton>
                </Table.TableCell>
              </Table.TableRow>
            )
          )) : (
            <Table.TableRow>
              <Table.TableCell colSpan={5}>
                <Typography align="center" variant="title" className="py-4">No component added yet</Typography>
              </Table.TableCell>
            </Table.TableRow>
          )}
        </Table.TableBody>
      </Table>
      <div className="grid grid-cols-4 gap-8 items-baseline">
        <Button
          color="primary"
          variant="outline"
          startIcon={<IcAdd />}
          className="w-fit"
          onClick={handleAddComponent}
        >
          Add Additional Earning
        </Button>
        <Typography variant="body" align="right" className="text-n-6">Total Amount</Typography>
        <Typography variant="body">
          {`${toIDR(filteredAdditionalEarnings.reduce((acc, val) => acc + (val.amount || 0), 0))},-`}
        </Typography>
      </div>
    </div>
  );
};

export default AdditionalEarning;
