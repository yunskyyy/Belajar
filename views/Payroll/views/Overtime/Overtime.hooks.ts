import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { endOfMonth, startOfMonth } from 'date-fns';
import { useForm } from 'react-hook-form';
import { utils, writeFile } from 'xlsx';

import { ENDPOINT } from '@/constants/apiURL';
import { FIELD_MESSAGE } from '@/constants/errorMessages';
import { useModalContext } from '@/contexts/ModalContext';
import { autofitColumns } from '@/helpers';
import useGetData from '@/hooks/useGetData';
import { useDeleteData } from '@/hooks/useMutateData';
import useQueryParams from '@/hooks/useQueryParams';
import { filterOptionNormalizer } from '@/normalizers';
import type { SelectItem } from '@/types/inputs';
import type { SearchOptions } from '@/types/responses';
import { createQueryParams, formatDateApi } from '@/utils';

import overtimeListNormalizer from './normalizers/overtimeListNormalizer';
import overtimeFormSchemas from './schemas/overtimeFormSchema';
import type { OvertimeFormSchemas } from './types/overtimeForm';
import {
  INIT_FORM,
  OVERTIME_TEMPLATE_COLUMNS,
  TABLE_COLUMNS,
} from './Overtime.constants';
import type {
  OvertimeData,
  OvertimeList,
  OvertimeSheetData,
} from './Overtime.types';

const useOvertime = () => {
  const initQuery = useSearchParams();
  const modal = useModalContext();
  const {
    queryParams,
    onFilterChange,
    onPageChange,
    onPageSizeChange,
    onSearchChange,
    onSortChange,
  } = useQueryParams();

  const {
    OVERTIME_EXPENSES: {
      OVERTIME,
      OVERTIME_BY_ID,
      PROJECTS_SEARCH,
      TEAMS_SEARCH,
    },
  } = ENDPOINT;
  const { REQUIRED } = FIELD_MESSAGE;

  const [openForm, setOpenForm] = useState(false);
  const [dateFilter, setDateFilter] = useState<Record<string, Date | null>>({
    startDt: null,
    endDt: null,
  });
  const [dateFilterError, setDateFilterError] = useState({
    startDt: '',
    endDt: '',
  });
  const [openImportModal, setOpenImportModal] = useState(false);

  const methods = useForm<OvertimeFormSchemas>({
    resolver: zodResolver(overtimeFormSchemas),
    defaultValues: INIT_FORM,
  });
  const { getValues, reset, setValue } = methods;

  const { data: projectCodeFilterOption = [] } = useGetData<SelectItem[], SearchOptions>(
    ['projectCodeFilterOption'],
    PROJECTS_SEARCH,
    {
      normalizer: filterOptionNormalizer,
    },
  );

  const { data: teamNameFilterOption = [] } = useGetData<SelectItem[], SearchOptions>(
    ['teamNameFilterOption'],
    TEAMS_SEARCH,
    {
      normalizer: filterOptionNormalizer,
    },
  );

  const tableColumns = TABLE_COLUMNS({
    projectCodeFilterOption,
    teamNameFilterOption,
  });

  const {
    data: overtimeData,
    isLoading,
    refetch: refetchOvertimeData,
  } = useGetData<OvertimeList>(
    ['overtimeList', createQueryParams(queryParams)],
    OVERTIME,
    {
      normalizer: overtimeListNormalizer,
      params: queryParams,
    },
  );

  const handleOpenForm = () => {
    reset(INIT_FORM, { keepValues: false });
    setOpenForm(true);
  };

  const handleCloseForm = (option?: { invalidate: boolean }) => {
    const { invalidate } = option || {};
    setOpenForm(false);
    if (invalidate) {
      refetchOvertimeData();
    }
  };

  const handleEdit = (data: OvertimeData) => {
    handleOpenForm();
    const {
      overtimeExpenseId,
      date,
      employeeId,
      employeeIdNumber,
      employeeName,
      teamId,
      projectCode,
      projectId,
      projectName,
      amount,
      hours,
    } = data;
    reset({
      overtimeExpenseId,
      date: formatDateApi(new Date(date)),
      employeeId,
      teamId,
      projectId,
      amount,
      employee: {
        label: `${employeeIdNumber} - ${employeeName}`,
        value: employeeId,
      },
      project: {
        label: `${projectCode} - ${projectName}`,
        value: projectId,
      },
    });

    setValue('totalHours', hours);
  };

  const { mutate: mutateDelete } = useDeleteData(
    ['positionDelete'],
    OVERTIME_BY_ID(String(getValues('overtimeExpenseId'))),
    {
      options: {
        onSuccess: () => {
          modal.closeConfirm();
          refetchOvertimeData();
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

  const handleDelete = (data: OvertimeData) => {
    setValue('overtimeExpenseId', data.overtimeExpenseId, { shouldValidate: true });
    modal.confirm({
      title: 'Delete selected data?',
      content: 'Are you sure you want to delete this overtime data?',
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

  const handleDateFilterChange = (value: Record<string, Date | null>) => {
    setDateFilter((prevState) => ({ ...prevState, ...value }));
  };

  const onDateFilterChange = () => {
    setDateFilterError({
      startDt: '',
      endDt: '',
    });
    if (!dateFilter.startDt && dateFilter.endDt) {
      setDateFilterError((prevState) => ({ ...prevState, startDt: `${REQUIRED('Start Date')} if End Date is filled` }));
      return;
    }
    if (!dateFilter.endDt && dateFilter.startDt) {
      setDateFilterError((prevState) => ({ ...prevState, endDt: `${REQUIRED('End Date')} if Start Date is filled` }));
      return;
    }
    onFilterChange({
      startDt: dateFilter.startDt ? formatDateApi(startOfMonth(dateFilter.startDt)) : '',
      endDt: dateFilter.endDt ? formatDateApi(endOfMonth(dateFilter.endDt)) : '',
    });
  };

  useEffect(() => {
    if (initQuery) {
      const objectQuery = Object.fromEntries(initQuery.entries());
      const {
        startDt,
        endDt,
      } = objectQuery || {};
      setDateFilter({
        startDt: startDt ? new Date(String(startDt)) : null,
        endDt: endDt ? new Date(String(endDt)) : null,
      });
    }
  }, [initQuery]);

  const handleDownloadTemplate = () => {
    const worksheet = utils.json_to_sheet([]);
    const workbook = utils.book_new();
    utils.sheet_add_aoa(worksheet, [
      OVERTIME_TEMPLATE_COLUMNS,
    ], { origin: 'A1' });
    worksheet['!cols'] = autofitColumns<OvertimeSheetData>([], OVERTIME_TEMPLATE_COLUMNS);
    utils.book_append_sheet(workbook, worksheet, 'Overtime Data');
    writeFile(workbook, 'Template Overtime.xlsx', { compression: true });
  };

  const handleOpenImportModal = () => {
    setOpenImportModal(true);
  };

  const handleCloseImportModal = (revalidate?: boolean) => {
    setOpenImportModal(false);
    if (revalidate) {
      refetchOvertimeData();
    }
  };

  const handleSearchChange = (value: string) => {
    onFilterChange({ name: value });
  };

  return {
    tableColumns,
    dateFilter,
    dateFilterError,
    isLoading,
    methods,
    openForm,
    openImportModal,
    overtimeData,
    queryParams,
    handleCloseForm,
    handleCloseImportModal,
    handleDateFilterChange,
    handleDelete,
    handleDownloadTemplate,
    handleEdit,
    handleOpenForm,
    handleOpenImportModal,
    handleSearchChange,
    onDateFilterChange,
    onFilterChange,
    onPageChange,
    onPageSizeChange,
    onSearchChange,
    onSortChange,
  };
};

export default useOvertime;
