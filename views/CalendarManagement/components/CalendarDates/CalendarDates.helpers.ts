export const isExtraDays = (week: number, date: number) => {
  if (week === 0 && date > 10) {
    return true;
  } if (week === 5 && date < 10) {
    return true;
  }
  return week === 4 && date < 10;
};

export const convertToDate = (year: number, month: number, date: number) => (
  `${year}-${String(month + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`
);
