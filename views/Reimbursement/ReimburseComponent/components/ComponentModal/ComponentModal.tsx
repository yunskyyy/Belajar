import React from 'react';

import { Controller } from 'react-hook-form';

import Button from '@/components/base/Button';
import Label from '@/components/base/Label';
import TextField from '@/components/base/Textfield';
import { IcAdd, IcTrash } from '@/components/icons';
import ActionButton from '@/components/ui/ActionButton';
import Modal from '@/components/ui/Modal';

import useComponentModal
  from './ComponentModal.hooks';
import type {
  ComponentModalProps,
} from './ComponentModal.types';

const ComponentModal = (props: ComponentModalProps) => {
  const {
    open = false,
    onClose,
    isEdit = false,
  } = props;

  const {
    control,
    handleSubmit,
    register,
    errors,
    fields,
    isLoading,
    addType,
    onSubmit,
    resetForm,
    removeType,
  } = useComponentModal(props);

  return (
    <Modal
      open={open}
      title={`${isEdit ? 'Edit' : 'Create'} Component`}
      onClose={() => {
        resetForm();
        onClose();
      }}
      width={520}
    >
      <Modal.Content>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register('name')}
            message={errors.name && errors.name.message}
            error={!!errors.name}
            label="Category"
            placeholder="Enter Category"
            classes={{ label: 'w-fit text-left' }}
            block
            labelLayout="vertical"
            required
          />
          {fields && fields.map((field, i) => (
            <div key={`types-${field.id}`}>
              <Controller
                control={control}
                name={`types.${i}.name`}
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
                      value="Type"
                      id={name}
                    />
                    <div className="flex items-center gap-2">
                      <TextField
                        ref={ref}
                        error={!!error}
                        message={
                          error
                          && error.message
                        }
                        onChange={onChange}
                        value={value}
                        placeholder="Enter Type"
                        classes={{ label: 'w-fit text-left' }}
                        className="flex-grow"
                        block
                        required
                      />
                      {i > 0 && (
                        <ActionButton
                          color="danger"
                          onClick={() => removeType(i)}
                          className="w-fit"
                        >
                          <IcTrash />
                        </ActionButton>
                      )}
                    </div>
                  </div>
                )}
              />
            </div>
          ))}
          <Button
            onClick={addType}
            color="primary"
            className="mt-4"
            startIcon={<IcAdd className="fill-n-1" />}
          >
            Add Type
          </Button>
        </form>
      </Modal.Content>
      <Modal.Footer>
        <Button
          onClick={() => {
            resetForm();
            onClose();
          }}
          className="mb-4"
          variant="outline"
          color="danger"
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit(onSubmit)}
          color="primary"
          className="mb-4"
          type="submit"
          loading={isLoading}
        >
          {`${isEdit ? 'Edit ' : 'Create'} Component`}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ComponentModal;
