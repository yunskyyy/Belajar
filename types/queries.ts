import type { AxiosError } from 'axios';

import type { BaseError } from '@/types/responses';

export interface QueryOptions<T> {
  onError?: (error: AxiosError<BaseError>, variables: unknown) => void;
  onSuccess?: (data: T) => void;
  retry?: boolean | number;
  suspense?: boolean;
}

export interface QueryExtras<TData, TParam = TData> {
  normalizer?: (data: TParam) => TData,
}

export interface FetchOptions<T> extends QueryOptions<T> {
  enabled?: boolean;
  initialData?: T | undefined;
}

export interface MutateOptions<T> extends QueryOptions<T> {
  onSettled?: (
    data: T | undefined,
    error: AxiosError<BaseError> | null,
    variables: unknown,
    context?: unknown
  ) => void;
  onMutate?: (variables: unknown) => void;
}

export interface FetchQueryExtras<TData, TParam = TData> extends QueryExtras<TData, TParam> {
  params?: Record<string, unknown>;
  options?: FetchOptions<TData>;
}

export interface MutateQueryExtras<T> extends QueryExtras<T> {
  params?: Record<string, unknown>;
  options?: MutateOptions<T>;
}
