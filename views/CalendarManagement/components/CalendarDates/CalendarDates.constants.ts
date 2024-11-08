import RepeatEventType from '@/enums/RepeatEventType';

const repeatEventTypeValue = Object.keys(RepeatEventType).filter((v) => !Number.isNaN(Number(v)));

// eslint-disable-next-line import/prefer-default-export
export const REPEAT_OPTION = repeatEventTypeValue.map((val) => ({
  label: RepeatEventType[Number(val)],
  value: val,
})).filter((el) => Number(el.value) > 0);
