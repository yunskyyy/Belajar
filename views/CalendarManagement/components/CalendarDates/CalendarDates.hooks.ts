import { type MouseEvent, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  addDays,
  endOfMonth,
  format,
  isBefore,
  startOfMonth,
  startOfWeek,
  subDays,
} from 'date-fns';
import { useForm, useWatch } from 'react-hook-form';

import { ENDPOINT } from '@/constants/apiURL';
import HTTP_CODE from '@/constants/httpCode';
import { useModalContext } from '@/contexts/ModalContext';
import RepeatEventType from '@/enums/RepeatEventType';
import useGetData from '@/hooks/useGetData';
import { useDeleteData, useMutateData } from '@/hooks/useMutateData';
import useToaster from '@/hooks/useToaster';
import { createQueryParams, formatDateApi, formatDateFull } from '@/utils';

import eventListNormalizers from './normalizers/eventListNormalizers';
import { REPEAT_OPTION } from './CalendarDates.constants';
import { convertToDate, isExtraDays } from './CalendarDates.helpers';
import eventSchema from './CalendarDates.schemas';
import type {
  CalendarDatesProps,
  CalendarEvent,
  EventDetail,
  EventSchema,
} from './CalendarDates.types';

const useCalendarDates = (props: CalendarDatesProps) => {
  const {
    month,
    year,
  } = props;

  const modal = useModalContext();
  const toaster = useToaster();

  const calendar: string[][] = [];
  const { CALENDAR_MGMT: { CALENDAR, CALENDAR_BY_ID } } = ENDPOINT;

  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const open = Boolean(anchorEl);
  const [detailAnchorEl, setDetailAnchorEl] = useState<Element | null>(null);
  const detailOpen = Boolean(detailAnchorEl);

  const startDate = startOfWeek(startOfMonth(new Date(year, month)), { weekStartsOn: 1 });
  const endDate = endOfMonth(new Date(year, month));

  const {
    control,
    handleSubmit,
    reset,
    setError,
    setValue,
  } = useForm<EventSchema>({
    resolver: zodResolver(eventSchema),
  });

  const {
    calendarId,
    calendarEventId,
    endDt,
    startDt,
    isRepeat,
    isRepeatForever,
  } = useWatch({ control });

  let day = subDays(startDate, 2);

  // looping a month by a week
  while (isBefore(day, endDate)) {
    calendar.push(
      Array(7)
        .fill(0)
        // eslint-disable-next-line @typescript-eslint/no-loop-func
        .map(() => {
          day = addDays(day, 1);
          return format(addDays(day, 1), 'd');
        }),
    );
  }

  const [eventDetail, setEventDetail] = useState<EventDetail | undefined>();

  const { data: eventList = [], refetch } = useGetData<CalendarEvent[]>(
    ['eventList', String(year)],
    CALENDAR,
    {
      normalizer: eventListNormalizers,
      params: { eventYear: year },
    },
  );

  const findDayInEventList = (
    eventYear: number,
    eventMonth: number,
    eventDay: number,
  ) => (
    eventList.find((el) => (
      el.eventCalendarDt === convertToDate(eventYear, eventMonth, eventDay)))
  );

  const dayHasEvent = (
    eventYear: number,
    eventMonth: number,
    eventDay: number,
    weekNumber: number,
  ) => (
    !!findDayInEventList(eventYear, eventMonth, eventDay)
    && !isExtraDays(weekNumber, eventDay)
  );

  const handleOpenForm = (event: MouseEvent<Element>, date: Date) => {
    const formattedDate = formatDateApi(date);
    const yearNumber = Number(formattedDate.split('-')[0]);
    const monthNumber = Number(formattedDate.split('-')[1]);
    const dayNumber = Number(formattedDate.split('-')[2]);
    const foundEvent = findDayInEventList(yearNumber, monthNumber - 1, dayNumber);

    const {
      calendarId: foundCalendarId = '',
      calendarDetailId = '',
      isRepeat: foundIsRepeat = false,
      isRepeatForever: foundIsRepeatForever = false,
      repeatEvery = 1,
      nameEvent = '',
      repeatDtUntil = '',
      yearEvent = '',
      endDateEvent = '',
      startDateEvent = '',
    } = foundEvent || {};

    setAnchorEl(event.currentTarget);
    reset({
      calendarId: foundCalendarId || '',
      calendarEventId: calendarDetailId || '',
      startDt: formatDateApi(new Date(startDateEvent || `${yearNumber}-${monthNumber}-${dayNumber}`)),
      endDt: formatDateApi(new Date(endDateEvent || `${yearNumber}-${monthNumber}-${dayNumber}`)),
      nameEvent: nameEvent || '',
      isRepeatForever: foundEvent ? foundIsRepeatForever : false,
      isRepeat: foundEvent ? foundIsRepeat : false,
      repeatEvery: String(repeatEvery) || REPEAT_OPTION[0].value,
      yearEvent: yearEvent || String(year),
      repeatUntilDt: foundEvent ? formatDateApi(new Date(repeatDtUntil)) : formatDateApi(date),
    });
  };

  const handleCloseForm = () => {
    setAnchorEl(null);
  };

  const { mutate: mutateSubmit, isLoading: isSubmitting } = useMutateData(
    ['levelPost'],
    !calendarId ? CALENDAR : CALENDAR_BY_ID(calendarId),
    !calendarId ? 'post' : 'put',
    {
      options: {
        onSuccess: () => {
          handleCloseForm();
          modal.success({
            title: 'Successfully',
            content: 'Your data has been successfully saved',
            onConfirm: () => modal.closeConfirm(),
          });
          refetch();
        },
        onError: (error) => {
          const { response } = error || {};
          const { data: errorData } = response || {};
          const { message, code, payload } = errorData || {};
          if (code === HTTP_CODE.badRequest) {
            (payload || []).forEach((el) => {
              const { propertyName, message: payloadMessage } = el;
              setError(
                propertyName as 'root',
                {
                  type: 'custom',
                  message: payloadMessage,
                },
              );
            });
            return;
          }
          toaster.error(message || 'Terjadi kesalahan pada server');
        },
      },
    },
  );

  const handleDayEnter = (
    e: MouseEvent<Element>,
    eventYear: number,
    eventMonth: number,
    eventDay: number,
    weekNumber: number,
  ) => {
    const foundEvent = findDayInEventList(eventYear, eventMonth, eventDay);
    if (foundEvent && !isExtraDays(weekNumber, eventDay)) {
      const {
        nameEvent,
        startDateEvent,
        endDateEvent,
        isRepeat: foundIsRepeat,
        isRepeatForever: foundIsRepeatForever,
        repeatEvery,
        repeatDtUntil,
      } = foundEvent;

      setEventDetail({
        eventName: nameEvent,
        startDate: formatDateFull(startDateEvent),
        endDate: startDateEvent !== endDateEvent ? formatDateFull(endDateEvent) : '',
        isRepeat: foundIsRepeat,
        isRepeatForever: foundIsRepeatForever,
        repeatEvery: RepeatEventType[repeatEvery],
        repeatDtUntil: formatDateFull(repeatDtUntil),
      });
      setDetailAnchorEl(e.currentTarget);
    }
  };

  const handleCloseDetail = () => {
    setDetailAnchorEl(null);
    setEventDetail(undefined);
  };

  const { mutate: mutateDelete } = useDeleteData(
    ['levelDelete'],
    `${CALENDAR}?${createQueryParams({
      calendarId,
      calendarEventDate: eventList.find(
        (el) => el.calendarDetailId === calendarEventId,
      )?.eventCalendarDt,
    })}`,
    {
      options: {
        onSuccess: () => {
          modal.closeConfirm();
          handleCloseForm();
          refetch();
          modal.success({
            title: 'Successfully',
            content: 'Selected data successfully deleted',
            onConfirm: () => modal.closeConfirm(),
          });
        },
        onError: (error) => {
          const { response } = error || {};
          const { data } = response || {};
          const { message } = data || {};
          modal.confirm({
            title: 'Data cannot be deleted',
            content: message || 'Terjadi kesalahan pada server',
            showCancel: false,
            onConfirm: () => modal.closeConfirm(),
            onCancel: () => modal.closeConfirm(),
          });
        },
      },
    },
  );

  const handleDeleteEvent = () => {
    modal.confirm({
      title: 'Delete selected event?',
      content: 'Are you sure you want to delete this and following event?',
      buttonProps: {
        confirm: {
          label: 'Delete',
        },
      },
      onConfirm: () => {
        modal.setConfirmLoading(true);
        mutateDelete({});
      },
      onCancel: () => modal.closeConfirm(),
      danger: true,
    });
  };

  const onSubmit = (data: EventSchema) => {
    mutateSubmit({ ...data, repeatEvery: Number(data.repeatEvery) });
  };

  return {
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
  };
};

export default useCalendarDates;
