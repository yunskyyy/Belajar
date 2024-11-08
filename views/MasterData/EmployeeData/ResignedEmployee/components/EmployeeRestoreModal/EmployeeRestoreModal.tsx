import { Controller } from 'react-hook-form';

import Button from '@/components/base/Button';
import DatePicker from '@/components/base/DatePicker';
import Typography from '@/components/base/Typography';
import Modal from '@/components/ui/Modal';
import { formatDateApi } from '@/utils';

import useEmployeeRestoreModal from './EmployeeRestoreModal.hooks';
import type { EmployeeRestoreModalProps } from './EmployeeRestoreModal.types';

const EmployeeRestoreModal = (props: EmployeeRestoreModalProps) => {
  const {
    open = false,
    onClose,
    employeeName,
  } = props;

  const {
    control,
    handleSubmit,
    onSubmit,
    isLoading,
    reset,
  } = useEmployeeRestoreModal(props);

  return (
    <Modal
      open={open}
      title="Restore Data Employee?"
      onClose={() => {
        reset();
        onClose();
      }}
      width={420}
    >
      <Modal.Content>
        <Typography variant="body">
          {`Are you sure want to restore "${employeeName}"?`}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name="date"
            render={({
              field: {
                ref,
                onChange,
                name,
                value,
              },
              fieldState: { error },
            }) => (
              <DatePicker
                ref={ref}
                name={name}
                value={value ? new Date(value) : null}
                placeholder="Select Date"
                onChange={
                  (inputValue) => onChange(inputValue ? formatDateApi(inputValue) : '')
                }
                error={!!error}
                message={error && error.message}
                minDate={new Date()}
                block
                required
              />
            )}
          />
          <div className="my-5 flex justify-end gap-2">
            <Button
              variant="text"
              className="w-36"
              onClick={() => {
                reset();
                onClose();
              }}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              onClick={handleSubmit(onSubmit)}
              loading={isLoading}
            >
              Restore Data
            </Button>
          </div>
        </form>

      </Modal.Content>
    </Modal>

  );
};

export default EmployeeRestoreModal;
