// eslint-disable-next-line import/prefer-default-export
export const formatAddress = (value: string): string => value.replaceAll(',', '').substring(0, 35);
