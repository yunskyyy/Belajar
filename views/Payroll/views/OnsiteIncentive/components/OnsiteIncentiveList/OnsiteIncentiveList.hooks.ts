import { useMemo, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { differenceInDays } from 'date-fns';
import { useForm, useWatch } from 'react-hook-form';

import { ENDPOINT } from '@/constants/apiURL';
import HTTP_CODE from '@/constants/httpCode';
import { useModalContext } from '@/contexts/ModalContext';
import useGetData from '@/hooks/useGetData';
import { useDeleteData, useMutateData } from '@/hooks/useMutateData';
import useQueryParams from '@/hooks/useQueryParams';
import useToaster from '@/hooks/useToaster';
import { filterOptionNormalizer, selectOptionNormalizer } from '@/normalizers';
import type { SelectItem } from '@/types/inputs';
import type { SearchOptions } from '@/types/responses';
import type { TableColumn } from '@/types/tables';
import { createQueryParams, formatDateApi } from '@/utils';

import incentiveAmountNormalizer from './normalizers/incentiveAmountNormalizer';
import onsiteIncentiveListNormalizer from './normalizers/onsiteIncentiveListNormalizer';
import { INIT_FORM, TABLE_COLUMNS } from './OnsiteIncentiveList.constants';
import onsiteIncentiveSchema from './OnsiteIncentiveList.schemas';
import type {
  IncentiveAmount,
  OnsiteIncentiveData,
  OnsiteIncentives,
  OnsiteIncentiveSchema,
} from './OnsiteIncentiveList.types';

const useBudgetSetting = () => {
  const modal = useModalContext();
  const toaster = useToaster();
  const {
    queryParams,
    onFilterChange,
    onPageChange,
    onPageSizeChange,
    onSortChange,
  } = useQueryParams();

  const {
    ONSITE_MGMT: {
      CHECK_AMOUNT,
      ONSITE,
      ONSITE_BY_ID,
      PROJECT_SEARCH,
    },
    OVERTIME_EXPENSES: {
      EMPLOYEE_SEARCH,
    },
  } = ENDPOINT;

  const [openForm, setOpenForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [projectSearchValue, setProjectSearchValue] = useState('');
  const [employeeSearchValue, setEmployeeSearchValue] = useState('');

  const {
    control,
    getValues,
    handleSubmit,
    setError,
    setValue,
    reset,
  } = useForm<OnsiteIncentiveSchema>({
    resolver: zodResolver(onsiteIncentiveSchema),
    defaultValues: INIT_FORM,
  });

  const handleCloseForm = () => {
    setOpenForm(false);
    setIsEdit(false);
  };

  const handleOpenForm = () => {
    reset(INIT_FORM);
    setOpenForm(true);
  };

  const handleEdit = (editData: OnsiteIncentiveData) => {
    const {
      onsiteExpenseId,
      type,
      employeeId,
      employeeName,
      employeeIdNumber,
      projectId,
      projectCode,
      projectName,
      startDate,
      endDate,
    } = editData;
    handleOpenForm();
    reset({
      id: onsiteExpenseId,
      type: String(type),
      employeeId,
      projectId,
      startDate: formatDateApi(new Date(startDate)),
      endDate: formatDateApi(new Date(endDate)),
      employee: {
        label: `${employeeIdNumber} - ${employeeName}`,
        value: employeeId,
      },
      project: {
        label: `${projectCode} - ${projectName}`,
        value: projectId,
      },
    });
    setIsEdit(true);
  };

  const {
    startDate,
    endDate,
    projectId,
    type,
  } = useWatch({ control });

  const totalDays = useMemo(() => {
    if (startDate && endDate) {
      return differenceInDays(new Date(endDate), new Date(startDate)) + 1;
    }
    return 0;
  }, [endDate, startDate]);

  const enableCheckAmount = useMemo(() => (
    !!(projectId && type)
  ), [projectId, type]);

  const {
    data: onsiteIncetiveList,
    isLoading,
    refetch,
  } = useGetData<OnsiteIncentives>(
    ['onsiteIncentiveList', createQueryParams(queryParams)],
    ONSITE,
    {
      params: queryParams,
      normalizer: onsiteIncentiveListNormalizer,
    },
  );

  const {
    data: incentiveAmount = 0,
  } = useGetData<number, IncentiveAmount>(
    ['incentiveAmount', String(projectId), String(type)],
    CHECK_AMOUNT,
    {
      params: {
        projectId,
        type,
      },
      normalizer: incentiveAmountNormalizer,
      options: {
        enabled: enableCheckAmount,
      },
    },
  );

  const amount = useMemo(() => totalDays * incentiveAmount, [incentiveAmount, totalDays]);

  const { data: projectFilterOption = [] } = useGetData<SelectItem[], SearchOptions>(
    ['projectFilterOption'],
    PROJECT_SEARCH,
    {
      normalizer: filterOptionNormalizer,
    },
  );

  const tableColumns: TableColumn[] = TABLE_COLUMNS({ projectFilterOption });

  const { data: projectOption } = useGetData<SelectItem[], SearchOptions>(
    ['projectSearch', !!projectSearchValue && projectSearchValue.length > 2 ? projectSearchValue : ''],
    PROJECT_SEARCH,
    {
      normalizer: selectOptionNormalizer,
      params: {
        s: projectSearchValue,
      },
      options: {
        enabled: (!!projectSearchValue && projectSearchValue.length > 2) || !projectSearchValue,
      },
    },
  );

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

  const handleProjectSearchChange = (value: string) => {
    setProjectSearchValue(value);
  };

  const handleEmployeeSearchChange = (value: string) => {
    setEmployeeSearchValue(value);
  };

  const { mutate: mutateSubmit, isLoading: isSubmitting } = useMutateData(
    ['budgetSettingPost'],
    !isEdit ? ONSITE : ONSITE_BY_ID(String(getValues('id'))),
    !isEdit ? 'post' : 'put',
    {
      options: {
        onSuccess: () => {
          handleCloseForm();
          modal.success({
            title: 'Successfully',
            content: 'Your data has been successfully saved',
            onConfirm: () => modal.closeConfirm(),
          });
          refetch();
        },
        onError: (error) => {
          const { response } = error || {};
          const { data: errorData } = response || {};
          const { message, code, payload } = errorData || {};
          if (code === HTTP_CODE.badRequest) {
            (payload || []).forEach((el) => {
              const { propertyName, message: payloadMessage } = el;
              setError(
                propertyName as 'root',
                {
                  type: 'custom',
                  message: payloadMessage,
                },
              );
            });
          }
          toaster.error(message || 'Terjadi kesalahan pada server');
        },
      },
    },
  );

  const { mutate: mutateDelete } = useDeleteData(
    ['budgetSettingDelete'],
    ONSITE_BY_ID(String(getValues('id'))),
    {
      options: {
        onSuccess: () => {
          modal.closeConfirm();
          refetch();
          modal.success({
            title: 'Successfully',
            content: 'Selected data successfully deleted',
            onConfirm: () => modal.closeConfirm(),
          });
        },
        onError: (error) => {
          const { response } = error || {};
          const { data } = response || {};
          const { message } = data || {};
          modal.confirm({
            title: 'Data cannot be deleted',
            content: message || 'Terjadi kesalahan pada server',
            showCancel: false,
            onConfirm: () => modal.closeConfirm(),
            onCancel: () => modal.closeConfirm(),
          });
        },
      },
    },
  );

  const handleDelete = async (deleteData: OnsiteIncentiveData) => {
    setValue('id', deleteData.onsiteExpenseId, { shouldValidate: true });
    modal.confirm({
      title: 'Delete selected data?',
      content: `Are you sure you want to delete ${deleteData.employeeName}'s ${deleteData.typeName} data?`,
      buttonProps: {
        confirm: {
          label: 'Delete',
        },
      },
      onConfirm: () => {
        modal.setConfirmLoading(true);
        mutateDelete({});
      },
      onCancel: () => modal.closeConfirm(),
      danger: true,
    });
  };

  const handleSearch = (value: string) => {
    onFilterChange({ name: value });
  };

  const onSubmit = (formData: OnsiteIncentiveSchema) => {
    mutateSubmit({
      ...formData,
      type: Number(formData.type),
    });
  };

  return {
    amount,
    control,
    employeeSearchValue,
    endDate,
    handleSubmit,
    isEdit,
    isLoading,
    isSubmitting,
    onsiteIncetiveList,
    openForm,
    projectOption,
    projectSearchValue,
    setValue,
    startDate,
    tableColumns,
    totalDays,
    userOption,
    queryParams,
    handleCloseForm,
    handleDelete,
    handleEdit,
    handleEmployeeSearchChange,
    handleOpenForm,
    handleProjectSearchChange,
    handleSearch,
    onFilterChange,
    onPageChange,
    onPageSizeChange,
    onSortChange,
    onSubmit,
  };
};

export default useBudgetSetting;
