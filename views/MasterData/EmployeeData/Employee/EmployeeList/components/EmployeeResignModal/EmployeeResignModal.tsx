import { Controller } from 'react-hook-form';

import Button from '@/components/base/Button';
import DatePicker from '@/components/base/DatePicker';
import Typography from '@/components/base/Typography';
import Modal from '@/components/ui/Modal';
import { formatDateApi } from '@/utils';

import useEmployeeResignModal from './EmployeeResignModal.hooks';
import type { EmployeeResignModalProps } from './EmployeeResignModal.types';

const EmployeeResignModal = (props: EmployeeResignModalProps) => {
  const {
    open = false,
    onClose,
    employee,
  } = props;

  const {
    control,
    handleSubmit,
    onSubmit,
    isLoading,
    reset,
  } = useEmployeeResignModal(props);

  const { firstName } = employee || {};

  return (
    <Modal
      open={open}
      title="Resign Employee?"
      onClose={() => {
        reset();
        onClose();
      }}
      width={420}
    >
      <Modal.Content>
        <Typography variant="body">
          {`Are you sure "${firstName}" will resign ? Enter the Resign date`}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name="resignDate"
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
              color="danger"
              onClick={handleSubmit(onSubmit)}
              loading={isLoading}
            >
              Resign
            </Button>
          </div>
        </form>

      </Modal.Content>
    </Modal>

  );
};

export default EmployeeResignModal;
