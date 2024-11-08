import { useMemo, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { ENDPOINT } from '@/constants/apiURL';
import HTTP_CODE from '@/constants/httpCode';
import { useModalContext } from '@/contexts/ModalContext';
import useGetData from '@/hooks/useGetData';
import { useDeleteData, useMutateData } from '@/hooks/useMutateData';
import useQueryParams from '@/hooks/useQueryParams';
import useToaster from '@/hooks/useToaster';
import { selectOptionNormalizer } from '@/normalizers';
import type { SelectItem } from '@/types/inputs';
import type { SearchOptions } from '@/types/responses';
import type { TableColumn } from '@/types/tables';
import { createQueryParams } from '@/utils';

import payrollComponentListNormalizer from '../../normalizers/payrollComponentListNormalizer';
import type { PayrollComponentData, PayrollComponentList } from '../../types/payrollComponent';

import { TABLE_COLUMNS } from './PayrollComponent.constants';
import payrollComponentFormSchema from './PayrollComponent.schemas';
import type {
  PayrollComponentFormSchema,
} from './PayrollComponent.types';

const usePayrollComponent = () => {
  const modal = useModalContext();
  const toaster = useToaster();
  const {
    queryParams,
    onFilterChange,
    onPageChange,
    onPageSizeChange,
    onSearchChange,
    onSortChange,
  } = useQueryParams();

  const { PAYROLL_MGMT } = ENDPOINT;
  const { COMPONENTS, COMPONENT_TYPE_SEARCH, COMPONENTS_BY_ID } = PAYROLL_MGMT;
  const [openForm, setOpenForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const {
    control,
    formState: { errors },
    getValues,
    handleSubmit,
    register,
    setError,
    setValue,
    reset,
  } = useForm<PayrollComponentFormSchema>({
    resolver: zodResolver(payrollComponentFormSchema),
  });

  const {
    data: componentListData,
    isLoading,
    refetch,
  } = useGetData<PayrollComponentList>(
    ['componentList', createQueryParams(queryParams)],
    COMPONENTS,
    {
      params: queryParams,
      normalizer: payrollComponentListNormalizer,
    },
  );

  const { data: componentOption = [] } = useGetData<SelectItem[], SearchOptions>(
    ['componentOption'],
    COMPONENT_TYPE_SEARCH,
    {
      normalizer: selectOptionNormalizer,
    },
  );

  const componentTypeFilterOption = useMemo(() => {
    const filterOptions = [...componentOption];
    filterOptions.unshift({ label: 'All', value: '' });
    return filterOptions;
  }, [componentOption]);

  const tableColumns: TableColumn[] = TABLE_COLUMNS({ componentTypeFilterOption });

  const handleCloseForm = () => {
    setOpenForm(false);
    setIsEdit(false);
  };

  const { mutate: mutateSubmit, isLoading: isSubmitting } = useMutateData(
    ['levelPost'],
    !isEdit ? COMPONENTS : COMPONENTS_BY_ID(String(getValues('id'))),
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
                `${propertyName.charAt(0).toLowerCase()}${propertyName.slice(
                  1,
                )}` as 'root',
                {
                  type: 'custom',
                  message: payloadMessage,
                },
              );
            });
            if (!payload) {
              setError('name', {
                type: 'custom',
                message,
              });
            }
            return;
          }
          toaster.error(message || 'Terjadi kesalahan pada server');
        },
      },
    },
  );

  const { mutate: mutateDelete } = useDeleteData(
    ['payrollComponentDelete'],
    COMPONENTS_BY_ID(String(getValues('id'))),
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

  const handleDelete = (data: PayrollComponentData) => {
    setValue('id', data.componentId, { shouldValidate: true });
    modal.confirm({
      title: 'Delete selected data?',
      content: `Are you sure you want to delete ${data.name} component?`,
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

  const handleOpenForm = () => {
    reset();
    setOpenForm(true);
  };

  const handleEdit = (editData: PayrollComponentData) => {
    handleOpenForm();
    setValue('id', editData.componentId);
    setValue('name', editData.name);
    setValue('componentTypeId', editData.typeId);
    setValue('asTakeHomePay', editData.asTakeHomePay);
    setValue('asOverTime', editData.asOvertime);
    setValue('asHolidayAllowance', editData.asHolidayAllowance);
    setIsEdit(true);
  };

  const onSubmit = (formData: PayrollComponentFormSchema) => {
    mutateSubmit(formData);
  };

  return {
    componentOption,
    control,
    componentListData,
    errors,
    handleSubmit,
    isEdit,
    isLoading,
    isSubmitting,
    openForm,
    register,
    tableColumns,
    queryParams,
    handleCloseForm,
    handleDelete,
    handleEdit,
    handleOpenForm,
    onFilterChange,
    onPageChange,
    onPageSizeChange,
    onSearchChange,
    onSortChange,
    onSubmit,
  };
};

export default usePayrollComponent;
