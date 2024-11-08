import { useMemo, useState } from 'react';

import { useFormContext, useWatch } from 'react-hook-form';

import { ENDPOINT } from '@/constants/apiURL';
import HTTP_CODE from '@/constants/httpCode';
import { useModalContext } from '@/contexts/ModalContext';
import useGetData from '@/hooks/useGetData';
import { useMutateData } from '@/hooks/useMutateData';
import useToaster from '@/hooks/useToaster';
import { selectOptionNormalizer } from '@/normalizers';
import type { SelectItem } from '@/types/inputs';
import type { SearchOptions } from '@/types/responses';
import { formatDateApi, noop, toIDR } from '@/utils';

import type { OvertimeFormSchemas } from '../../types/overtimeForm';

import type { OvertimeFormModalProps } from './OvertimeFormModal.types';

const useOvertimeFormModal = (props: OvertimeFormModalProps) => {
  const {
    onClose = noop,
  } = props;

  const modal = useModalContext();
  const toaster = useToaster();
  const {
    OVERTIME_EXPENSES: {
      OVERTIME,
      OVERTIME_BY_ID,
      EMPLOYEE_SEARCH,
      PROJECTS_SEARCH,
      TEAMS_SEARCH,
      CHECK_AMOUNT,
    },
  } = ENDPOINT;

  const [projectSearchValue, setProjectSearchValue] = useState('');
  const [employeeSearchValue, setEmployeeSearchValue] = useState('');

  const {
    clearErrors,
    control,
    formState: { errors },
    handleSubmit,
    reset,
    trigger,
    setError,
    setValue,
  } = useFormContext<OvertimeFormSchemas>();

  const {
    overtimeExpenseId = '',
    amount,
    date = formatDateApi(new Date()),
    projectId = '',
    totalHours,
    employeeId = '',
  } = useWatch({ control });

  const handleCloseForm = () => {
    reset();
    onClose();
  };

  const displayAmount: string = useMemo(() => {
    if (amount && amount < 0) {
      return 'Invalid Amount';
    }
    if (amount && amount > 0) {
      return toIDR(amount);
    }
    return '-';
  }, [amount]);

  const { data: userOption = [] } = useGetData<SelectItem[], SearchOptions>(
    ['userSearch', employeeSearchValue],
    EMPLOYEE_SEARCH,
    {
      normalizer: selectOptionNormalizer,
      params: {
        s: employeeSearchValue,
      },
    },
  );

  const { data: projectOption } = useGetData<SelectItem[], SearchOptions>(
    ['projectSearch', projectSearchValue.length > 2 ? projectSearchValue : ''],
    PROJECTS_SEARCH,
    {
      normalizer: selectOptionNormalizer,
      params: {
        s: projectSearchValue,
      },
      options: {
        enabled: projectSearchValue.length > 2 || !projectSearchValue,
      },
    },
  );

  const { data: teamOption = [] } = useGetData<SelectItem[], SearchOptions>(
    ['teamSearch'],
    TEAMS_SEARCH,
    {
      normalizer: selectOptionNormalizer,
    },
  );

  const handleProjectSearchChange = (value: string) => {
    setProjectSearchValue(value);
  };

  const handleEmployeeSearchChange = (value: string) => {
    setEmployeeSearchValue(value);
  };

  const {
    refetch: refetchAmount, isFetching: isFetchingAmount,
  } = useGetData<number>(
    ['checkAmount'],
    CHECK_AMOUNT,
    {
      params: {
        date,
        employeeId,
        projectId,
        totalHours,
      },
      options: {
        enabled: false,
        retry: false,
      },
    },
  );

  const {
    mutate: mutateSubmit,
    isLoading: isSubmitting,
  } = useMutateData(
    ['submitOvertime'],
    !overtimeExpenseId ? OVERTIME : OVERTIME_BY_ID(overtimeExpenseId),
    !overtimeExpenseId ? 'post' : 'put',
    {
      options: {
        onSuccess: () => {
          modal.success({
            title: 'Successfully',
            content: 'Your data has been successfully saved',
            onConfirm: () => {
              modal.closeConfirm();
              reset();
              onClose({ invalidate: true });
            },
          });
        },
        onError: (error) => {
          const { response } = error || {};
          const { data: { message = '', code = 0, payload = [] } = {} } = response || {};
          if (code === HTTP_CODE.badRequest && payload) {
            (payload || []).forEach((el) => {
              const { propertyName, message: payloadMessage } = el;
              setError(
                propertyName as 'root',
                { type: 'custom', message: payloadMessage },
              );
            });
            return;
          }
          toaster.error(message || 'Terjadi kesalahan pada server');
        },
      },
    },
  );

  const handleCheckAmount = async () => {
    clearErrors();
    const valid = await trigger('totalHours');
    if (valid) {
      refetchAmount().then((response) => {
        const { isError, error } = response || {};
        if (isError) {
          const { response: errorRes } = error || {};
          const { status } = errorRes || {};
          const { data: { payload = [], message = '' } = {} } = errorRes || {};
          if (status === HTTP_CODE.badRequest && payload) {
            (payload || []).forEach((el) => {
              const { propertyName, message: payloadMessage } = el;
              setError(
                propertyName as 'root',
                { type: 'custom', message: payloadMessage },
              );
            });
            return;
          }
          toaster.error(message || 'Terjadi kesalahan pada server');
          setValue('amount', -1);
          return;
        }
        setValue('amount', Number(response.data));
        clearErrors();
      });
    }
  };

  const onSubmit = (data: OvertimeFormSchemas) => {
    mutateSubmit(data);
  };

  return {
    control,
    displayAmount,
    employeeSearchValue,
    errors,
    handleSubmit,
    isFetchingAmount,
    isSubmitting,
    overtimeExpenseId,
    projectOption,
    projectSearchValue,
    setValue,
    teamOption,
    userOption,
    handleCheckAmount,
    handleCloseForm,
    handleEmployeeSearchChange,
    handleProjectSearchChange,
    onSubmit,
  };
};

export default useOvertimeFormModal;
