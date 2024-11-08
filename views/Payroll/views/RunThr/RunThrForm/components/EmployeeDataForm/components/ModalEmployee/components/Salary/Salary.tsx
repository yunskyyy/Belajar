import { Controller } from 'react-hook-form';

import Button from '@/components/base/Button';
import Table from '@/components/base/Table';
import TextField from '@/components/base/Textfield';
import Typography from '@/components/base/Typography';
import { IcReplay, IcTrash } from '@/components/icons';
import Accordion from '@/components/ui/Accordion';
import ActionButton from '@/components/ui/ActionButton';
import Description from '@/components/ui/Description';
import { numbersOnly } from '@/helpers';
import { toIDR } from '@/utils';

import type { ComponentProps } from '../../ModalEmployee.types';

import useSalary from './Salary.hooks';

const ComponentSalary = (props: ComponentProps) => {
  const { componentData } = props;
  const {
    componentsSalary = [],
    control,
    fields,
    handleDelete,
    handleRestore,
    isSubmitting,
  } = useSalary(props);

  const { previousAmountItems } = componentData;
  const { salary } = previousAmountItems;
  return (
    <div className="mt-6 flex flex-col gap-6">
      {!!salary.length && (
        <Accordion label="Previous THR Data">
          {salary.map((el) => (
            <Description key={el.name} className="mb-3" label={el.name} value={toIDR(Number(el.amount))} layout="vertical" />
          ))}
        </Accordion>
      )}
      <div className="flex justify-end">
        <Button
          color="primary"
          variant="outline"
          startIcon={<IcReplay />}
          onClick={handleRestore}
          loading={isSubmitting}
        >
          Restore Component
        </Button>
      </div>
      <Table className="table-fixed border-solid border border-neutral-300
              rounded-xl border-separate border-tools-table-outline py-4 mb-2"
      >
        <Table.TableHead>
          <Table.TableRow>
            <Table.TableCell>
              Component Name
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
          {fields.length ? fields.map((field, i) => (
            <Table.TableRow key={field.id}>
              <Table.TableCell>
                <Controller
                  control={control}
                  name={`componentsSalary.${i}.name`}
                  render={({
                    field: { value },
                  }) => (
                    <Typography>
                      {value}
                    </Typography>
                  )}
                />
              </Table.TableCell>
              <Table.TableCell>
                <Controller
                  control={control}
                  name={`componentsSalary.${i}.amount`}
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
                  // disabled={!!getValues(`payload.${i}.employeeComponentId`)}
                >
                  <IcTrash />
                </ActionButton>
              </Table.TableCell>
            </Table.TableRow>
          )) : (
            <Table.TableRow>
              <Table.TableCell colSpan={3}>
                <Typography align="center" variant="title" className="py-4">No component added yet</Typography>
              </Table.TableCell>
            </Table.TableRow>
          )}
        </Table.TableBody>
      </Table>
      <div className="grid grid-cols-2 p-5 border border-solid border-n-6 rounded-xl">
        <Typography variant="title">Total Amount</Typography>
        <Typography variant="body">
          {`${toIDR(componentsSalary.reduce((acc, val) => acc + Number(val.amount || 0), 0))},-`}
        </Typography>
      </div>
    </div>
  );
};

export default ComponentSalary;
