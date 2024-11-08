import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

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

import levelListNormalizer from './normalizers/levelListNormalizer';
import { TABLE_COLUMNS } from './LevelList.constants';
import levelFormSchema from './LevelList.schemas';
import type {
  Level, LevelFormSchema, LevelList,
} from './LevelList.types';

const useLevelList = () => {
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

  const { MASTER_DATA } = ENDPOINT;
  const {
    LEVEL,
    LEVEL_BY_ID,
    LEVEL_TYPE_SEARCH,
  } = MASTER_DATA;

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
  } = useForm<LevelFormSchema>({
    resolver: zodResolver(levelFormSchema),
    defaultValues: {
      id: '',
      levelTypeId: '',
      name: '',
    },
  });

  const {
    data: levelData,
    isLoading,
    refetch,
  } = useGetData<LevelList>(
    ['levelList', createQueryParams(queryParams)],
    LEVEL,
    {
      params: queryParams,
      normalizer: levelListNormalizer,
    },
  );

  const { data: levelTypeFilterOption = [] } = useGetData<SelectItem[], SearchOptions>(
    ['levelTypeFilterOption'],
    LEVEL_TYPE_SEARCH,
    {
      normalizer: filterOptionNormalizer,
    },
  );

  const { data: levelTypeOption = [] } = useGetData<SelectItem[], SearchOptions>(
    ['levelTypeOption'],
    LEVEL_TYPE_SEARCH,
    {
      normalizer: selectOptionNormalizer,
    },
  );

  const tableColumns: TableColumn[] = TABLE_COLUMNS({ levelTypeFilterOption });

  const handleCloseForm = () => {
    setOpenForm(false);
    setIsEdit(false);
  };

  const handleOpenForm = () => {
    reset();
    setOpenForm(true);
  };

  const handleEdit = (editData: Level) => {
    handleOpenForm();
    reset({
      id: editData.levelId,
      name: editData.name,
      levelTypeId: editData.levelTypeId,
      type: editData.levelType,
    });
    setIsEdit(true);
  };

  const { mutate: mutateSubmit, isLoading: isSubmitting } = useMutateData(
    ['levelPost'],
    !isEdit ? LEVEL : LEVEL_BY_ID(getValues('id')),
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
    ['levelDelete'],
    LEVEL_BY_ID(getValues('id')),
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

  const handleDelete = async (deleteData: Level) => {
    setValue('id', deleteData.levelId, { shouldValidate: true });
    modal.confirm({
      title: 'Delete selected data?',
      content: `Are you sure you want to delete "${deleteData.name}"?`,
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

  const onSubmit = (formData: LevelFormSchema) => {
    mutateSubmit(formData);
  };

  return {
    control,
    errors,
    handleSubmit,
    isEdit,
    isLoading,
    isSubmitting,
    levelData,
    levelTypeOption,
    openForm,
    setValue,
    tableColumns,
    queryParams,
    register,
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

export default useLevelList;
