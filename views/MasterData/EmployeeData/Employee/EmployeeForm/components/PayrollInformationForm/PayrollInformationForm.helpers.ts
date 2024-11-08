// eslint-disable-next-line import/prefer-default-export
export const npwpFormat = (nStr: string) => {
  try {
    const cleaned = (`${nStr}`).replace(/\D/g, '');
    const match = cleaned.match(/(\d{0,2})?(\d{0,3})?(\d{0,3})?(\d{0,1})?(\d{0,3})?(\d{0,3})$/);
    if (match) {
      return [
        match[1],
        match[2] ? '.' : '',
        match[2],
        match[3] ? '.' : '',
        match[3],
        match[4] ? '.' : '',
        match[4],
        match[5] ? '-' : '',
        match[5],
        match[6] ? '.' : '',
        match[6]].join('');
    }
    return '';
  } catch (err) {
    return '';
  }
};
