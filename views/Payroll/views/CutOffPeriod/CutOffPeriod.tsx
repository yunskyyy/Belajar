'use client';

import { Fragment } from 'react';

import { Controller } from 'react-hook-form';

import Button from '@/components/base/Button';
import DatePicker from '@/components/base/DatePicker';
import Paper from '@/components/base/Paper';
import TextField from '@/components/base/Textfield';
import TextSkeleton from '@/components/base/TextSkeleton';
import Ticker from '@/components/base/Ticker';
import Typography from '@/components/base/Typography';
import PageHeader from '@/components/ui/PageHeader';
import { formatDateApi } from '@/utils';

import useCutOffPeriod from './CutOffPeriod.hooks';

const CutOffPeriod = () => {
  const {
    control,
    cutOffData,
    errors,
    handleSubmit,
    isEdit,
    isLoading,
    mutatingSubmit,
    register,
    watch,
    submitForm,
    toggleEdit,
  } = useCutOffPeriod();

  const {
    nameDisplay = '',
    startDtDisplay = '',
    endDtDisplay = '',
    paymentScheduleDtDisplay = '',
  } = cutOffData || {};

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <Paper className="p-4 mb-6">
        <PageHeader
          title="Cut Off Period"
          crumbs={[{ label: 'Payroll' }, { label: 'Cut Off Period' }]}
        />
      </Paper>

      <Paper className="p-6 mb-6">
        <Ticker
          className="mb-10 text-start"
          text="This configuration is only done once and valid for
          every month or if there is a change in the cut off period range"
        />
        {!isLoading && (
          isEdit ? (
            <div className="[&>div>label>span]:!text-n-7 flex flex-col gap-2">
              <TextField
                {...register('name')}
                message={errors.name && errors.name.message}
                error={!!errors.name}
                placeholder="Enter Setting Name"
                label="Setting Name"
                labelLayout="horizontal"
                required
                block
              />
              <Controller
                control={control}
                name="startDt"
                render={({ field: { ref, onChange, value }, fieldState: { error } }) => (
                  <DatePicker
                    ref={ref}
                    placeholder="Enter Start Date"
                    error={!!error}
                    message={error && error.message}
                    onChange={
                      (inputValue) => onChange(inputValue ? formatDateApi(inputValue) : '')
                    }
                    value={new Date(value)}
                    maxDate={new Date(watch('endDt'))}
                    classes={{ label: 'w-1/4' }}
                    label="Start Date"
                    labelLayout="horizontal"
                    block
                    required
                  />
                )}
              />
              <Controller
                control={control}
                name="endDt"
                render={({ field: { ref, onChange, value }, fieldState: { error } }) => (
                  <DatePicker
                    ref={ref}
                    placeholder="Enter End Date"
                    error={!!error}
                    message={error && error.message}
                    onChange={
                      (inputValue) => onChange(inputValue ? formatDateApi(inputValue) : '')
                    }
                    value={new Date(value)}
                    minDate={new Date(watch('startDt'))}
                    classes={{ label: 'w-1/4' }}
                    label="End Date"
                    labelLayout="horizontal"
                    block
                    required
                  />
                )}
              />
              <Controller
                control={control}
                name="paymentScheduleDt"
                render={({ field: { ref, onChange, value }, fieldState: { error } }) => (
                  <DatePicker
                    ref={ref}
                    placeholder="Enter Payment Schedule"
                    error={!!error}
                    message={error && error.message}
                    onChange={
                      (inputValue) => onChange(inputValue ? formatDateApi(inputValue) : '')
                    }
                    value={new Date(value)}
                    classes={{ label: 'w-1/4' }}
                    label="Payment Schedule"
                    labelLayout="horizontal"
                    block
                    required
                  />
                )}
              />
            </div>
          ) : (
            <div className="grid grid-cols-[8rem_auto] gap-10 odd:[&>*]:text-n-7">
              <Typography>
                Setting Name
              </Typography>
              <Typography>
                {nameDisplay}
              </Typography>

              <Typography>
                Start Date
              </Typography>
              <Typography>
                {startDtDisplay}
              </Typography>

              <Typography>
                End Date
              </Typography>
              <Typography>
                {endDtDisplay}
              </Typography>

              <Typography>
                Payment Schedule
              </Typography>
              <Typography>
                {paymentScheduleDtDisplay}
              </Typography>
            </div>
          )
        )}
        {isLoading && (
          <div className="grid grid-cols-[8rem_auto] gap-10 odd:[&>*]:text-n-7">
            { new Array(4).fill(Math.random()).map((el) => (
              <Fragment key={el}>
                <TextSkeleton />
                <TextSkeleton width="lg" />
              </Fragment>
            ))}
          </div>
        )}
      </Paper>

      <div className="flex justify-end gap-2">
        {isEdit && (
          <Button
            className="h-fit"
            color="danger"
            onClick={toggleEdit}
            variant="outline"
          >
            Cancel
          </Button>
        )}
        <Button
          className="h-fit"
          color="primary"
          onClick={isEdit ? handleSubmit(submitForm) : toggleEdit}
          loading={mutatingSubmit}
        >
          {`${isEdit ? 'Save' : 'Edit'} Setting`}
        </Button>
      </div>
    </form>

  );
};

export default CutOffPeriod;
