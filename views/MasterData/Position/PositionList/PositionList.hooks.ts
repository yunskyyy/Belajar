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

import positionListNormalizer from './normalizers/positionListNormalizer';
import { TABLE_COLUMNS } from './PositionList.constants';
import positionFormSchema from './PositionList.schemas';
import type {
  Position,
  PositionFormSchema,
  PositionList,
} from './PositionList.types';

const usePositionList = () => {
  const modal = useModalContext();
  const toaster = useToaster();
  const {
    queryParams,
    onFilterChange,
    onPageChange,
    onPageSizeChange,
    onSearchChange: handleSearch,
    onSortChange,
  } = useQueryParams();

  const { MASTER_DATA } = ENDPOINT;
  const {
    POSITION,
    POSITION_BY_ID,
    DIVISION_SEARCH,
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
  } = useForm<PositionFormSchema>({
    resolver: zodResolver(positionFormSchema),
    defaultValues: {
      id: '',
      divisionId: '',
      name: '',
    },
  });

  const {
    data: positionData,
    isLoading,
    refetch,
  } = useGetData<PositionList>(
    ['positionList', createQueryParams(queryParams)],
    POSITION,
    {
      params: queryParams,
      normalizer: positionListNormalizer,
    },
  );

  const { data: divisionFilterOption = [] } = useGetData<SelectItem[], SearchOptions>(
    ['divisionFilterOption'],
    DIVISION_SEARCH,
    {
      normalizer: filterOptionNormalizer,
    },
  );

  const { data: divisionOption = [] } = useGetData<SelectItem[], SearchOptions>(
    ['divisionOption'],
    DIVISION_SEARCH,
    {
      normalizer: selectOptionNormalizer,
    },
  );

  // updating form division options based on divisionFilterOption
  // useEffect(() => {
  //   setDivisionOption(divisionFilterOption.filter((item) => item.label !== 'All'));
  // }, [divisionFilterOption]);

  const tableColumns: TableColumn[] = TABLE_COLUMNS({ divisionFilterOption });

  const handleCloseForm = () => {
    setOpenForm(false);
    setIsEdit(false);
  };

  const { mutate: mutateSubmit, isLoading: isSubmitting } = useMutateData(
    ['levelPost'],
    !isEdit ? POSITION : POSITION_BY_ID(getValues('id')),
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
    ['positionDelete'],
    POSITION_BY_ID(getValues('id')),
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

  const onSubmit = (formData: PositionFormSchema) => {
    mutateSubmit(formData);
  };

  const handleOpenForm = () => {
    reset();
    setOpenForm(true);
  };

  const handleDelete = async (deleteData: Position) => {
    setValue('id', deleteData.positionId, { shouldValidate: true });
    modal.confirm({
      title: 'Delete selected data?',
      content: `Are you sure you want to delete ${deleteData.name} position?`,
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

  const handleEdit = (editData: Position) => {
    handleOpenForm();
    setValue('id', editData.positionId);
    setValue('name', editData.name);
    setValue('divisionId', editData.divisionId);
    setIsEdit(true);
  };

  return {
    control,
    divisionOption,
    errors,
    handleSubmit,
    isEdit,
    isLoading,
    isSubmitting,
    openForm,
    positionData,
    register,
    tableColumns,
    queryParams,
    handleCloseForm,
    handleDelete,
    handleEdit,
    handleOpenForm,
    handleSearch,
    onFilterChange,
    onPageChange,
    onPageSizeChange,
    onSortChange,
    onSubmit,
  };
};

export default usePositionList;
