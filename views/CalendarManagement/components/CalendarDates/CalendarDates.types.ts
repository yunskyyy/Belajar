import type { z } from 'zod';

import type eventSchema from './CalendarDates.schemas';

export interface CalendarDatesProps {
  month: number;
  year: number;
}

export interface CalendarEvent {
  calendarDetailId: string;
  calendarId: string;
  eventCalendarDt: string;
  endDateEvent: string;
  isRepeat: boolean;
  isRepeatForever: boolean;
  nameEvent: string;
  repeatDtUntil: string;
  repeatEvery: number;
  startDateEvent: string;
  yearEvent: string;
}

export interface EventDetail {
  endDate?: string;
  eventName: string;
  isRepeat: boolean;
  isRepeatForever: boolean;
  repeatDtUntil?: string;
  repeatEvery?: string;
  startDate: string;
}

export type EventSchema = z.infer<typeof eventSchema>;
