import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
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
import { createQueryParams } from '@/utils';

import budgeSettingListNormalizer from './normalizers/budgeSettingListNormalizer';
import { TABLE_COLUMNS } from './AmountSetting.constants';
import { budgetSettingSchema, editBudgetSettingSchema } from './AmountSetting.schemas';
import type {
  BudgetSettingData,
  BudgetSettingList,
  BudgetSettingSchema,
} from './AmountSetting.types';

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
    BUDGET_SETTING_MGMT: {
      BUDGET_SETTING,
      BUDGET_SETTING_BY_ID,
      PROJECT_SEARCH,
    },
  } = ENDPOINT;

  const [openForm, setOpenForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [projectSearchValue, setProjectSearchValue] = useState('');

  const {
    control,
    getValues,
    handleSubmit,
    setError,
    setValue,
    reset,
  } = useForm<BudgetSettingSchema>({
    resolver: zodResolver(!isEdit ? budgetSettingSchema : editBudgetSettingSchema),
    defaultValues: {
      projectIds: [],
      projectId: '',
      amount: '',
    },
  });

  const { id = '' } = useWatch({ control });

  const {
    data: budgetSettings,
    isLoading,
    refetch,
  } = useGetData<BudgetSettingList>(
    ['budgetSettings', createQueryParams(queryParams)],
    BUDGET_SETTING,
    {
      params: queryParams,
      normalizer: budgeSettingListNormalizer,
    },
  );

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

  const handleProjectSearchChange = (value: string) => {
    setProjectSearchValue(value);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setIsEdit(false);
  };

  const handleOpenForm = () => {
    reset({
      amount: '',
      type: '',
      projects: [],
    });
    setOpenForm(true);
  };

  const handleEdit = (editData: BudgetSettingData) => {
    const {
      budgetSettingId,
      type,
      amount,
      projectId,
      projectCode,
      projectName,
    } = editData;
    handleOpenForm();
    reset({
      id: budgetSettingId,
      type: String(type),
      amount: String(amount),
      projectId,
      project: {
        label: `${projectCode} - ${projectName}`,
        value: projectId,
      },
    });
    setIsEdit(true);
  };

  const { mutate: mutateSubmit, isLoading: isSubmitting } = useMutateData(
    ['budgetSettingPost'],
    !isEdit ? BUDGET_SETTING : BUDGET_SETTING_BY_ID(String(getValues('id'))),
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
    BUDGET_SETTING_BY_ID(id),
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

  const handleDelete = async (deleteData: BudgetSettingData) => {
    setValue('id', deleteData.budgetSettingId, { shouldValidate: true });
    modal.confirm({
      title: 'Delete selected data?',
      content: 'Are you sure you want to delete this amount setting?',
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

  const onSubmit = (formData: BudgetSettingSchema) => {
    mutateSubmit({
      ...formData,
      type: Number(formData.type),
    });
  };

  return {
    budgetSettings,
    control,
    handleSubmit,
    isEdit,
    isLoading,
    isSubmitting,
    openForm,
    projectOption,
    projectSearchValue,
    setValue,
    tableColumns,
    queryParams,
    handleCloseForm,
    handleDelete,
    handleEdit,
    handleOpenForm,
    handleProjectSearchChange,
    onFilterChange,
    onPageChange,
    onPageSizeChange,
    onSortChange,
    onSubmit,
  };
};

export default useBudgetSetting;
