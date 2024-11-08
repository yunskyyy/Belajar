'use client';

import { setMonth, setYear } from 'date-fns';
import { Controller } from 'react-hook-form';

import Button from '@/components/base/Button';
import DatePicker from '@/components/base/DatePicker';
import Paper from '@/components/base/Paper';
import Select from '@/components/base/Select';
import Textarea from '@/components/base/Textarea';
import TextSkeleton from '@/components/base/TextSkeleton';
import Typography from '@/components/base/Typography';
import Description from '@/components/ui/Description';
import { formatDate, formatDateApi, localeStringToDate } from '@/utils';
import type { RunPayrollComponentProps } from '@/views/Payroll/types/runPayrollFormComponents';

import { monthOption, yearOption } from './PayrollPeriod.constants';
import usePayrollPeriod from './PayrollPeriod.hooks';

const PayrollPeriod = (props: RunPayrollComponentProps) => {
  const {
    control,
    cutOffPeriod,
    cutOffPeriodLoading,
    dataRunPayrollLoading,
    cutOffPeriodStartDt,
    cutOffPeriodEndDt,
    errors,
    handleSubmit,
    isEdit,
    isSubmitting,
    month,
    paymentScheduleDate,
    register,
    setValue,
    year,
    onSubmit,
    setDateCutOff,
  } = usePayrollPeriod(props);

  return (
    <>
      <Paper className="p-4">
        <Typography variant="title" className="mb-3 font-normal">Payroll Period</Typography>
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-5 mb-3">
          {(!cutOffPeriodLoading && !dataRunPayrollLoading) ? (
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
                        onChange={(e) => {
                          onChange(e);
                          const monthIndex = Number(e.target.value);
                          setDateCutOff(`${monthIndex}-${year || new Date().getFullYear()}`);
                          if (cutOffPeriod) {
                            setValue(
                              'cutOffPeriodEndDt',
                              formatDate(
                                String(setMonth(
                                  localeStringToDate(cutOffPeriod.endDt),
                                  monthIndex,
                                )),
                              ),
                            );
                            setValue(
                              'cutOffPeriodStartDt',
                              formatDate(
                                String(setMonth(
                                  localeStringToDate(cutOffPeriod.startDt),
                                  monthIndex - 1,
                                )),
                              ),
                            );
                          }
                          if (paymentScheduleDate) {
                            setValue(
                              'paymentScheduleDate',
                              String(setMonth(new Date(paymentScheduleDate), monthIndex)),
                            );
                          }
                        }}
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
                        onChange={(e) => {
                          onChange(e);
                          const yearNew = Number(e.target.value);
                          setDateCutOff(`${month || new Date().getMonth() + 1}-${yearNew}`);
                          if (cutOffPeriodEndDt && cutOffPeriodStartDt) {
                            setValue(
                              'cutOffPeriodEndDt',
                              formatDate(
                                String(setYear(localeStringToDate(cutOffPeriodEndDt), yearNew)),
                              ),
                            );
                            setValue(
                              'cutOffPeriodStartDt',
                              formatDate(
                                String(setYear(localeStringToDate(cutOffPeriodStartDt), yearNew)),
                              ),
                            );
                          }
                          if (paymentScheduleDate) {
                            setValue(
                              'paymentScheduleDate',
                              String(setYear(new Date(paymentScheduleDate), yearNew)),
                            );
                          }
                        }}
                        message={error && error.message}
                        error={!!error}
                        required
                        block
                      />
                    )}
                  />
                </>
              )}
              <Description
                label="Cut off Period"
                value={`${cutOffPeriodStartDt} - ${cutOffPeriodEndDt}`}
                layout="vertical"
              />
              <Controller
                control={control}
                name="paymentScheduleDate"
                render={({
                  field: {
                    ref,
                    onChange,
                    value,
                    name,
                  },
                  fieldState: { error },
                }) => (
                  <DatePicker
                    ref={ref}
                    name={name}
                    label="Payment Schedule"
                    placeholder="Select date Payment Schedule"
                    error={!!error}
                    message={error && error.message}
                    onChange={
                      (inputValue) => {
                        onChange(inputValue ? formatDateApi(inputValue) : '');
                      }
                    }
                    value={new Date(value)}
                    minDate={cutOffPeriodStartDt
                      ? localeStringToDate(cutOffPeriodStartDt)
                      : undefined}
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
      </Paper>
      <div className="flex mt-5 gap-3 justify-end">
        <Button
          color="primary"
          onClick={handleSubmit(onSubmit)}
          loading={isSubmitting}
        >
          Next
        </Button>
      </div>
    </>
  );
};

export default PayrollPeriod;
