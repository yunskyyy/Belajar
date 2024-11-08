import { Controller } from 'react-hook-form';

import Button from '@/components/base/Button';
import DatePicker from '@/components/base/DatePicker';
import Select from '@/components/base/Select';
import Textarea from '@/components/base/Textarea';
import TextSkeleton from '@/components/base/TextSkeleton';
import Typography from '@/components/base/Typography';
import Description from '@/components/ui/Description';
import { formatDateApi } from '@/utils';

import type { RunThrComponentProps } from '../../types/runThrType';

import { monthOption, yearOption } from './ThrPeriod.constants';
import useThrPeriod from './ThrPeriod.hooks';

const ThrPeriod = (props: RunThrComponentProps) => {
  const { id = '' } = props;
  const {
    errors,
    register,
    control,
    isSubmitting,
    onSubmit,
    handleSubmit,
    isEdit,
    month,
    year,
    isLoadingDetail,
  } = useThrPeriod(props);
  return (
    <>
      <Typography variant="body" className="mb-3">THR Period</Typography>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-5 mb-3">
        {(!isLoadingDetail || !isEdit) ? (
          <>
            {isEdit ? (
              <>
                <Description
                  layout="vertical"
                  label="Month"
                  value={String(monthOption.find((el) => el.value === month)?.label)}
                />
                <Description
                  layout="vertical"
                  label="Year"
                  value={String(year)}
                />
              </>
            ) : (
              <>
                <Controller
                  control={control}
                  name="month"
                  render={(
                    {
                      field: {
                        ref,
                        onChange,
                        value,
                        name,
                      },
                      fieldState: { error },
                    },
                  ) => (
                    <Select
                      ref={ref}
                      name={name}
                      label="Month"
                      placeholder="Select Month"
                      options={monthOption}
                      value={value}
                      labelLayout="vertical"
                      onChange={onChange}
                      message={error && error.message}
                      error={!!error}
                      required
                      block
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="year"
                  render={(
                    {
                      field: {
                        ref,
                        onChange,
                        value,
                        name,
                      },
                      fieldState: { error },
                    },
                  ) => (
                    <Select
                      ref={ref}
                      name={name}
                      label="Year"
                      placeholder="Select Year"
                      options={yearOption}
                      value={value}
                      labelLayout="vertical"
                      onChange={onChange}
                      message={error && error.message}
                      error={!!error}
                      required
                      block
                    />
                  )}
                />
              </>
            )}
            <Controller
              control={control}
              name="paymentScheduleDate"
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
                  className="col-start-1"
                  ref={ref}
                  name={name}
                  label="Payment Schedule"
                  placeholder="Select Date"
                  error={!!error}
                  message={error && error.message}
                  onChange={
                    (inputValue) => onChange(inputValue ? formatDateApi(inputValue) : '')
                  }
                  value={id ? new Date(value) : null}
                  block
                  required
                />
              )}
            />
            <Textarea
              {...register('description')}
              label="Description"
              className="col-start-1"
              error={!!errors.description}
              message={errors.description && errors.description.message}
              placeholder="Enter Description"
              maxLength={500}
              block
            />
          </>
        ) : (
          Array(5).fill(null).map((_, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <div className="flex flex-col gap-3 w-1/2 mb-2" key={i}>
              <TextSkeleton width="lg" />
              <TextSkeleton width="xl" className="h-6" />
            </div>
          ))
        )}
      </div>
      <div className="flex justify-end">
        <div className="flex mt-5 gap-3 justify-between">
          <Button
            color="primary"
            onClick={handleSubmit(onSubmit)}
            loading={isSubmitting}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
};

export default ThrPeriod;
