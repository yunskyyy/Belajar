import type { CalendarEvent } from '../CalendarDates.types';

const eventListNormalizers = (data: CalendarEvent[]) => (
  (data || []).map((el): CalendarEvent => ({
    calendarId: el.calendarId || '',
    calendarDetailId: el.calendarDetailId || '',
    endDateEvent: el.endDateEvent || '',
    eventCalendarDt: el.eventCalendarDt || '',
    nameEvent: el.nameEvent || '',
    isRepeat: el.isRepeat || false,
    isRepeatForever: el.isRepeatForever || false,
    yearEvent: el.yearEvent || '',
    repeatDtUntil: el.repeatDtUntil || '',
    repeatEvery: el.repeatEvery || 0,
    startDateEvent: el.startDateEvent || '',
  }))
);

export default eventListNormalizers;
