import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { defaultFetcherFn } from '@/helpers';
import type { MutateQueryExtras } from '@/types/queries';
import type { BaseError } from '@/types/responses';
import { noop } from '@/utils';

export const useMutateData = <T = void>(
  key: string[],
  url: string,
  method = 'post',
  extras?: MutateQueryExtras<T>,
) => {
  const { normalizer, params, options } = extras || {};
  const {
    retry,
    onError,
    onMutate,
    onSettled = noop,
    onSuccess,
  } = options || {};
  const {
    mutate,
    data,
    isPending: isLoading,
  } = useMutation<T, AxiosError<BaseError>, unknown>({
    mutationKey: key,
    mutationFn: (body) => defaultFetcherFn<T>({
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      params,
      data: body,
      method,
      normalizer,
      url,
    }),
    onSuccess,
    onError,
    onMutate,
    onSettled,
    retry,
  });

  return {
    data,
    mutate,
    isLoading,
  };
};

export const usePostData = <T = void>(
  key: string[],
  url: string,
  extras?: MutateQueryExtras<T>,
) => useMutateData(key, url, 'post', extras);

export const usePutData = <T = void>(
  key: string[],
  url: string,
  extras?: MutateQueryExtras<T>,
) => useMutateData(key, url, 'put', extras);

export const usePatchData = <T = void>(
  key: string[],
  url: string,
  extras?: MutateQueryExtras<T>,
) => useMutateData(key, url, 'patch', extras);

export const useDeleteData = <T = void>(
  key: string[],
  url: string,
  extras?: MutateQueryExtras<T>,
) => useMutateData(key, url, 'delete', extras);
