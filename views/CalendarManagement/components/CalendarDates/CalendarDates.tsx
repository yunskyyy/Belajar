import {
  isAfter,
  isToday,
  isWeekend,
} from 'date-fns';
import { Controller } from 'react-hook-form';

import Button from '@/components/base/Button';
import Checkbox from '@/components/base/Checkbox';
import DatePicker from '@/components/base/DatePicker';
import Popover from '@/components/base/Popover';
import Select from '@/components/base/Select';
import TextField from '@/components/base/Textfield';
import Typography from '@/components/base/Typography';
import Description from '@/components/ui/Description';
import { formatDateApi } from '@/utils';

import { REPEAT_OPTION } from './CalendarDates.constants';
import { isExtraDays } from './CalendarDates.helpers';
import useCalendarDates from './CalendarDates.hooks';
import type { CalendarDatesProps } from './CalendarDates.types';

const CalendarDates = (props: CalendarDatesProps) => {
  const {
    month,
    year,
  } = props;

  const {
    anchorEl,
    calendar,
    calendarId,
    control,
    detailAnchorEl,
    detailOpen,
    endDt,
    eventDetail,
    handleSubmit,
    isRepeat,
    isRepeatForever,
    isSubmitting,
    open,
    setValue,
    startDt,
    dayHasEvent,
    handleCloseDetail,
    handleCloseForm,
    handleDayEnter,
    handleDeleteEvent,
    handleOpenForm,
    onSubmit,
  } = useCalendarDates(props);

  const {
    eventName = '',
    startDate = '',
    endDate = '',
    isRepeat: detailIsRepeat = false,
    isRepeatForever: detailIsRepeatForever = false,
    repeatEvery = '',
    repeatDtUntil = '',
  } = eventDetail || {};
  return (
    <>
      {calendar.map((week, index) => (
        <tr key={week[0] + (month - (isExtraDays(index, Number(week[0])) ? 1 : 0))}>
          {week.map((weekday) => (
            <td
              key={weekday + week[0]}
              className={`${isWeekend(new Date(year, month, Number(weekday))) && !isExtraDays(index, Number(weekday))
                ? '[&>*]:text-primary-500' : ''} 
              ${isExtraDays(index, Number(weekday)) ? '[&>*]:text-n-6' : 'hover:bg-n-5'}`}
            >
              <Button
                variant="text"
                className={`aspect-square p-1 flex justify-center items-center font-normal text-base w-full rounded-none \
                  ${isToday(new Date(year, month, Number(weekday))) && !isExtraDays(index, Number(weekday))
                  ? 'border !border-solid border-primary-500 !rounded-full' : ''}
                  ${dayHasEvent(year, month, Number(weekday), index) ? '!bg-danger-500 text-n-1' : ''}`}
                onClick={(e) => {
                  if (!isExtraDays(index, Number(weekday))) {
                    handleOpenForm(
                      e,
                      new Date(year, month, Number(weekday)),
                    );
                  }
                }}
                onMouseEnter={(e) => handleDayEnter(e, year, month, Number(weekday), index)}
                onMouseLeave={handleCloseDetail}
              >
                {weekday}
              </Button>
            </td>
          ))}
        </tr>
      ))}
      <Popover
        anchorEl={anchorEl}
        className="[&>*]:w-128"
        open={open}
        onClose={handleCloseForm}
        closable
      >
        <form className="flex flex-col gap-4 w-full">
          <Controller
            control={control}
            name="nameEvent"
            render={({
              field: {
                ref,
                onChange,
                value,
              },
              fieldState: { error },
            }) => (
              <TextField
                label="Title"
                placeholder="Enter Title"
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
          <div className="grid grid-cols-2 gap-x-4">
            <Controller
              control={control}
              name="startDt"
              render={({
                field: {
                  ref,
                  onChange,
                  value,
                },
                fieldState: { error },
              }) => (
                <DatePicker
                  label="Start Date"
                  placeholder="Choose Start Date"
                  ref={ref}
                  value={new Date(value)}
                  onChange={
                    (inputValue) => {
                      onChange(inputValue ? formatDateApi(inputValue) : '');
                      if (inputValue && (
                        isAfter(inputValue, new Date(endDt || '')) || endDt === '')
                      ) {
                        setValue('endDt', formatDateApi(inputValue));
                      }
                    }
                  }
                  error={!!error}
                  message={error && error.message}
                  required
                  block
                />
              )}
            />
            <Controller
              control={control}
              name="endDt"
              render={({
                field: {
                  ref,
                  onChange,
                  value,
                },
                fieldState: { error },
              }) => (
                <DatePicker
                  label="End Date"
                  placeholder="Choose End Date"
                  ref={ref}
                  value={new Date(value)}
                  onChange={
                    (inputValue) => {
                      onChange(inputValue ? formatDateApi(inputValue) : '');
                    }
                  }
                  minDate={startDt ? new Date(startDt) : undefined}
                  error={!!error}
                  message={error && error.message}
                  required
                  block
                />
              )}
            />
          </div>
          <Controller
            control={control}
            name="isRepeat"
            render={({ field: { ref, onChange, value }, fieldState: { error } }) => (
              <Checkbox
                ref={ref}
                checked={value}
                onChange={onChange}
                label="Repeat"
                message={error && error.message}
                error={!!error}
              />
            )}
          />
          {isRepeat && (
            <>
              <hr className="w-full" />
              <div className="flex justify-between items-center">
                <Typography variant="body">Repeat Every</Typography>
                <Controller
                  control={control}
                  name="repeatEvery"
                  render={({
                    field: {
                      ref,
                      onChange,
                      value,
                    },
                    fieldState: { error },
                  }) => (
                    <Select
                      className="w-1/2"
                      ref={ref}
                      labelLayout="vertical"
                      options={REPEAT_OPTION}
                      value={value}
                      placeholder="Select Type"
                      block
                      onChange={onChange}
                      message={
                        error && error.message
                      }
                      error={!!error}
                      required
                    />
                  )}
                />
              </div>
              <Controller
                control={control}
                name="isRepeatForever"
                render={({ field: { ref, onChange, value }, fieldState: { error } }) => (
                  <Checkbox
                    ref={ref}
                    checked={value}
                    onChange={onChange}
                    label="Repeat Forever"
                    message={error && error.message}
                    error={!!error}
                  />
                )}
              />
              {!isRepeatForever && (
                <>
                  <hr className="w-full" />
                  <div className="flex justify-between items-center">
                    <Typography variant="body">Repeat Until</Typography>
                    <Controller
                      control={control}
                      name="repeatUntilDt"
                      render={({
                        field: {
                          ref,
                          onChange,
                          value,
                        },
                        fieldState: { error },
                      }) => (
                        <DatePicker
                          placeholder="Choose Date"
                          ref={ref}
                          value={new Date(value)}
                          onChange={
                            (inputValue) => onChange(inputValue ? formatDateApi(inputValue) : '')
                          }
                          minDate={endDt ? new Date(endDt) : undefined}
                          error={!!error}
                          message={error && error.message}
                          required
                          block
                        />
                      )}
                    />
                  </div>
                </>
              )}
            </>
          )}
          <div className="flex justify-end gap-2">
            <Button
              variant={calendarId ? 'outline' : 'text'}
              color={calendarId ? 'danger' : 'default'}
              onClick={calendarId ? handleDeleteEvent : handleCloseForm}
            >
              {`${calendarId ? 'Delete' : 'Cancel'}`}
            </Button>
            <Button
              variant="default"
              color="primary"
              onClick={handleSubmit(onSubmit)}
              loading={isSubmitting}
            >
              Save
            </Button>
          </div>
        </form>
      </Popover>
      <Popover
        anchorEl={detailAnchorEl}
        open={detailOpen}
        onClose={handleCloseDetail}
        disableRestoreFocus
      >
        <div className="flex flex-col gap-1 w-full">
          <Typography variant="title">{eventName}</Typography>
          <Typography className="text-n-8">
            {`${startDate} ${endDate ? ` - ${endDate}` : ''}`}
          </Typography>
          {detailIsRepeat && (
            <>
              <hr className="w-full" />
              <Description
                layout="vertical"
                label="Repeat"
                value={`Every ${repeatEvery} ${!detailIsRepeatForever ? `until ${repeatDtUntil}` : ''}`}
              />
            </>
          )}
        </div>
      </Popover>
    </>
  );
};

export default CalendarDates;
