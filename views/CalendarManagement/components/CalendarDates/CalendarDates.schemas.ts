import { z } from 'zod';

import { FIELD_MESSAGE } from '@/constants/errorMessages';

const { REQUIRED } = FIELD_MESSAGE;

const eventSchema = z.object({
  calendarId: z.string().optional(),
  calendarEventId: z.string().optional(),
  nameEvent: z.string().trim().min(1, { message: REQUIRED('Title') }),
  yearEvent: z.string().min(1),
  startDt: z.string().trim().min(1, { message: REQUIRED('Start Date') }),
  endDt: z.string().trim().min(1, { message: REQUIRED('End Date') }),
  isRepeat: z.boolean(),
  isRepeatForever: z.boolean(),
  repeatEvery: z.string().min(1, { message: REQUIRED('Repeat Every') }),
  repeatUntilDt: z.string().trim().min(1, { message: REQUIRED('Repeat Until') }),
});

export default eventSchema;
