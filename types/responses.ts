export interface PaginationData<T> {
  items: T[],
  hasNextPage: boolean,
  page: number
  pageSize: number
}

export interface BaseError {
  code: number;
  message: string;
  payload?: ErrorPayload[];
}

export interface ErrorPayload {
  attemptedValue: string;
  errorCode: string;
  message: string;
  propertyName: string;
}

export interface BaseQueryParams extends Record<string, unknown> {
  [key: string]: unknown;
  s?: string;
  page: number;
  size: number;
  orderType: string;
  orderBy: string;
}

export interface OptionItemResponse {
  key: string;
  value: string;
}

type AuditTrailKey = `${'created' | 'lastUpdated'}${'By' | 'ByFullName' | 'At'}`;

export type AuditTrail = Record<AuditTrailKey, string>;

export type SearchOptions = OptionItemResponse[];
