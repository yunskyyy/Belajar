const areArraysEqual = <T>(arr1: T[], arr2: T[]): boolean => {
  if (arr1.length !== arr2.length) return false;
  return arr1.every((obj, index) => JSON.stringify(obj) === JSON.stringify(arr2[index]));
};

export default areArraysEqual;
