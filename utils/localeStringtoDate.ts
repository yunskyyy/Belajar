const localeStringToDate = (localeString: string) => {
  const endDateParts = localeString.split('/');
  return new Date(
    +endDateParts[2],
    Number(endDateParts[1]) - 1,
    +endDateParts[0],
  );
};

export default localeStringToDate;
