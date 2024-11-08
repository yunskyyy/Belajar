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

import type { ComponentModalEmployeeProps } from '../../types/componentModal';

import useComponentAllowance from './ComponentAllowance.hooks';

const ComponentAllowance = (props: ComponentModalEmployeeProps) => {
  const { previousData = [] } = props;

  const {
    componentsAllowance = [],
    control,
    fields,
    mutatingRestore,
    handleDelete,
    handleRestoreComponent,
  } = useComponentAllowance(props);
  return (
    <div className="mt-6 flex flex-col gap-6">
      {!!previousData.length && (
        <Accordion label="Previous Payroll Data" defaultExpanded>
          <div className="grid grid-cols-2">
            {previousData.map((data) => (
              <Description layout="vertical" label={data.name} value={`${toIDR(Number(data.amount))},-`} />
            ))}
          </div>
        </Accordion>
      )}
      <div className="flex justify-end">
        <Button
          variant="outline"
          color="primary"
          startIcon={<IcReplay />}
          onClick={handleRestoreComponent}
          loading={mutatingRestore}
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
                  name={`componentsAllowance.${i}.name`}
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
                  name={`componentsAllowance.${i}.amount`}
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
          {`${toIDR(componentsAllowance.reduce((acc, val) => acc + Number(val.amount || 0), 0))},-`}
        </Typography>
      </div>
    </div>
  );
};

export default ComponentAllowance;
