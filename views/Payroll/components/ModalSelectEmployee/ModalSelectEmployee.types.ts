export interface EmployeeDataQueryParams {
  [key: string]: unknown;
  s: string;
  divisionId: string;
  structuralId: string;
  positionId: string;
  excludeIds: string[];
  startPeriodDt: string;
  endPeriodDt: string;
}
