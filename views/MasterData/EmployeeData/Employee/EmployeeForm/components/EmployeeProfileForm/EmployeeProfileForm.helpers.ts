// eslint-disable-next-line import/prefer-default-export
export const splitName = (name = '') => {
  const [firstName, ...lastName] = name.split(' ').filter(Boolean);
  return {
    firstName,
    lastName: lastName.join(' '),
  };
};
