import { Controller } from 'react-hook-form';

import Button from '@/components/base/Button';
import Table from '@/components/base/Table';
import TextField from '@/components/base/Textfield';
import Typography from '@/components/base/Typography';
import { IcAdd, IcTrash } from '@/components/icons';
import ActionButton from '@/components/ui/ActionButton';
import { numbersOnly } from '@/helpers';
import { toIDR } from '@/utils';

import useDeduction from './Deduction.hooks';

const Deduction = () => {
  const {
    control,
    deductions = [],
    fields,
    handleAddComponent,
    handleDelete,
  } = useDeduction();

  const filteredDeductions = deductions.filter((el) => !el.isDeleted);
  return (
    <div className="mt-6 flex flex-col gap-6">
      <Table className="table-fixed border-solid border border-neutral-300
                rounded-xl border-separate border-tools-table-outline py-4 mb-2"
      >
        <Table.TableHead>
          <Table.TableRow>
            <Table.TableCell>
              Deduction Name
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
          {filteredDeductions.length ? fields.map((field, i) => (
            !field.isDeleted && (
              <Table.TableRow key={field.id}>
                <Table.TableCell>
                  <Controller
                    control={control}
                    name={`deductions.${i}.name`}
                    render={({
                      field: { ref, onChange, value },
                      fieldState: { error },
                    }) => (
                      <TextField
                        ref={ref}
                        value={value}
                        onChange={(event) => {
                          onChange(event.target.value);
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
                    name={`deductions.${i}.amount`}
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
              <Table.TableCell colSpan={3}>
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
          Add Deduction
        </Button>
        <Typography variant="body" align="right" className="text-n-6">Total Amount</Typography>
        <Typography variant="body">
          {`${toIDR(filteredDeductions.reduce((acc, val) => acc + (Number(val.amount || 0)), 0))},-`}
        </Typography>
      </div>
    </div>
  );
};

export default Deduction;
