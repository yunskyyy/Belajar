import type { EmployeeDataQueryParams } from './ModalSelectEmployee.types';

// eslint-disable-next-line import/prefer-default-export
export const INIT_QUERY_PARAMS: EmployeeDataQueryParams = {
  s: '',
  divisionId: '',
  structuralId: '',
  positionId: '',
  excludeIds: [],
  startPeriodDt: '',
  endPeriodDt: '',
};
